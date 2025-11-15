import { Router } from 'express'
import { pool } from '../db.mjs'
import { sendWhatsAppMessage } from '../lib/messaging.mjs'

const router = Router()

const CONVERSATION_STAGES = {
  PARTY: 'collect_party',
  DATE: 'collect_date',
  TIME: 'collect_time',
  NAME: 'collect_name',
}

const STAFF_ALERT_STATE = 'staff_alert'

const STAGE_PROMPTS = {
  [CONVERSATION_STAGES.PARTY]:
    "Sure thing! How many people is the table for? (e.g. 4 people)",
  [CONVERSATION_STAGES.DATE]:
    "Great. What day would you like? You can say 'tonight', 'tomorrow' or 12 Dec.",
  [CONVERSATION_STAGES.TIME]:
    'What time should we book for? (e.g. 7pm or 19:30)',
  [CONVERSATION_STAGES.NAME]:
    'Perfect. What name should I put the booking under?',
}

const CANCEL_KEYWORDS = ['cancel', 'stop', 'never mind', 'nevermind', 'ignore']

router.post('/webhook/messages', async (req, res) => {
  const payload = normalizePayload(req.body)
  const normalizedPhone = normalizePhone(payload.customerPhone)

  if (!normalizedPhone || !payload.text) {
    return res.status(400).json({ message: 'Missing phone or text' })
  }

  // Ignore outbound echoes or delivery receipts
  if (payload.direction && payload.direction !== 'inbound') {
    return res.status(200).json({ message: 'Ignored non-inbound event' })
  }

  const client = await pool.connect()
  try {
    const restaurant = await findRestaurant(client, payload.channelId, payload.restaurantId)

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' })
    }

    if (isStaffPhone(restaurant, normalizedPhone)) {
      const staffResult = await handleStaffReply({
        client,
        restaurant,
        normalizedPhone,
        originalPhone: payload.customerPhone,
        text: payload.text,
      })
      return res.json(staffResult)
    }

    const normalizedText = payload.text.trim()
    if (!normalizedText) {
      return res.status(200).json({ message: 'Empty message' })
    }

    const lower = normalizedText.toLowerCase()
    if (CANCEL_KEYWORDS.some((keyword) => lower.includes(keyword))) {
      await clearConversation(client, restaurant.id, normalizedPhone)
      await safeSend(() =>
        sendWhatsAppMessage({
          to: payload.customerPhone,
          body: "All good! I've cancelled that request. Ask me again when you're ready to book.",
        }),
      )
      return res.json({ message: 'Conversation cleared' })
    }

    const existingState = await getConversationState(client, restaurant.id, normalizedPhone)
    const mergedData = mergeBookingData(existingState?.data, normalizedText)
    const nextStage = determineNextStage(mergedData)

    if (nextStage === 'ready') {
      const bookingTime = buildBookingDate(mergedData.date, mergedData.time, restaurant.timezone)
      if (!bookingTime) {
        await saveConversationState(client, restaurant.id, normalizedPhone, CONVERSATION_STAGES.DATE, mergedData)
        await safeSend(() =>
          sendWhatsAppMessage({
            to: payload.customerPhone,
            body: STAGE_PROMPTS[CONVERSATION_STAGES.DATE],
          }),
        )
        return res.json({ message: 'Requested clearer date' })
      }

      const booking = await createBooking(client, {
        restaurantId: restaurant.id,
        customerPhone: payload.customerPhone,
        customerName: mergedData.name || 'Guest',
        partySize: mergedData.partySize || 2,
        bookingTime,
      })

      await clearConversation(client, restaurant.id, normalizedPhone)

      const formattedTime = formatBookingTime(booking.booking_time, restaurant.timezone)
      await safeSend(() =>
        sendWhatsAppMessage({
          to: payload.customerPhone,
          body: `Got it! I've sent your request for ${formattedTime} for ${booking.party_size} people. The restaurant will confirm shortly.`,
        }),
      )

      const alertTarget = getNotificationTarget(restaurant)
      if (alertTarget) {
        await safeSend(() =>
          sendWhatsAppMessage({
            to: alertTarget,
            body: buildStaffAlertMessage(restaurant.name, booking),
          }),
        )
        await enqueueStaffBooking(client, restaurant.id, normalizePhone(alertTarget), booking.id)
      }

      return res.json({ message: 'Booking captured' })
    }

    await saveConversationState(client, restaurant.id, normalizedPhone, nextStage, mergedData)
    const prompt = STAGE_PROMPTS[nextStage] || STAGE_PROMPTS[CONVERSATION_STAGES.PARTY]
    await safeSend(() =>
      sendWhatsAppMessage({
        to: payload.customerPhone,
        body: prompt,
      }),
    )

    res.json({ message: 'Prompt sent' })
  } catch (error) {
    console.error('Webhook error', error)
    res.status(500).json({ message: 'Internal error' })
  } finally {
    client.release()
  }
})

export default router

function normalizePayload(body = {}) {
  const entry = Array.isArray(body.entry) ? body.entry[0] : null
  const change = entry?.changes?.[0]?.value
  const waMessage = change?.messages?.[0]

  const text =
    firstString(
      body.text,
      body.message?.content?.text,
      body.message?.text,
      body.message?.content?.caption,
      body.content?.text,
      waMessage?.text?.body,
      waMessage?.interactive?.reply?.id,
    ) || ''

  const customerPhone =
    firstString(
      body.customerPhone,
      body.contact?.msisdn,
      body.contact?.phone,
      body.contact?.number,
      body.from,
      body.sender,
      waMessage?.from,
      waMessage?.author,
    ) || null

  const channelId =
    firstString(body.channelId, body.channel_id, body.message?.channelId, body.message?.channel?.id, change?.metadata?.phone_number_id) ||
    null

  const directionRaw = firstString(body.direction, body.message?.direction, waMessage?.type ? 'inbound' : null)
  const direction = (directionRaw || 'inbound').toLowerCase()

  const restaurantId = firstString(body.restaurantId, body.metadata?.restaurantId, change?.metadata?.restaurantId)

  return {
    text,
    customerPhone,
    channelId,
    restaurantId,
    direction,
  }
}

function firstString(...values) {
  for (const value of values) {
    if (typeof value === 'string' && value.trim().length > 0) {
      return value.trim()
    }
    if (typeof value === 'number' && !Number.isNaN(value)) {
      return String(value)
    }
  }
  return null
}

async function findRestaurant(client, channelId, restaurantId) {
  if (channelId) {
    const byChannel = await client.query(
      `SELECT id, name, whatsapp_number, notification_destination, notification_number, timezone
       FROM restaurants
       WHERE messagebird_channel_id = $1
       LIMIT 1`,
      [channelId],
    )
    if (byChannel.rowCount > 0) {
      return byChannel.rows[0]
    }
  }

  if (restaurantId) {
    const byId = await client.query(
      `SELECT id, name, whatsapp_number, notification_destination, notification_number, timezone
       FROM restaurants
       WHERE id = $1
       LIMIT 1`,
      [restaurantId],
    )
    if (byId.rowCount > 0) {
      return byId.rows[0]
    }
  }

  return null
}

async function getConversationState(client, restaurantId, customerPhone) {
  const result = await client.query(
    `SELECT state, data
     FROM conversation_states
     WHERE restaurant_id = $1 AND customer_phone = $2
     LIMIT 1`,
    [restaurantId, customerPhone],
  )
  return result.rows[0] || null
}

async function saveConversationState(client, restaurantId, customerPhone, state, data) {
  await client.query(
    `INSERT INTO conversation_states (restaurant_id, customer_phone, state, data, updated_at)
     VALUES ($1, $2, $3, $4, NOW())
     ON CONFLICT (restaurant_id, customer_phone)
     DO UPDATE SET state = $3, data = $4, updated_at = NOW()`,
    [restaurantId, customerPhone, state, JSON.stringify(data)],
  )
}

async function clearConversation(client, restaurantId, customerPhone) {
  await client.query('DELETE FROM conversation_states WHERE restaurant_id = $1 AND customer_phone = $2', [
    restaurantId,
    customerPhone,
  ])
}

function mergeBookingData(existing = {}, text = '') {
  const data = {
    partySize: existing.partySize || null,
    date: existing.date || null,
    time: existing.time || null,
    name: existing.name || null,
  }

  const extracted = detectBookingDetails(text)

  if (!data.partySize && extracted.partySize) data.partySize = extracted.partySize
  if (!data.date && extracted.date) data.date = extracted.date
  if (!data.time && extracted.time) data.time = extracted.time
  if (!data.name && extracted.name) data.name = extracted.name

  return data
}

function detectBookingDetails(text) {
  return {
    partySize: parsePartySize(text),
    date: parseDateFromText(text),
    time: parseTimeFromText(text),
    name: parseName(text),
  }
}

function parsePartySize(text) {
  const match = text.match(/(\d{1,2})\s*(people|ppl|guests|persons|pax)?/i)
  if (!match) return null
  const size = Number(match[1])
  if (Number.isNaN(size) || size < 1) return null
  return Math.min(size, 20)
}

function parseDateFromText(text) {
  const lower = text.toLowerCase()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (lower.includes('today') || lower.includes('tonight')) {
    return today.toISOString()
  }
  if (lower.includes('tomorrow')) {
    const d = new Date(today)
    d.setDate(d.getDate() + 1)
    return d.toISOString()
  }

  const weekdayMatch = lower.match(/\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/)
  if (weekdayMatch) {
    const target = weekdayMatch[1]
    const weekdayIndex = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].indexOf(target)
    const d = new Date(today)
    const addDays = (weekdayIndex - d.getDay() + 7) % 7 || 7
    d.setDate(d.getDate() + addDays)
    return d.toISOString()
  }

  const isoMatch = text.match(/(\d{4})[/-](\d{1,2})[/-](\d{1,2})/)
  if (isoMatch) {
    const [_, year, month, day] = isoMatch
    const d = new Date(Number(year), Number(month) - 1, Number(day))
    if (!Number.isNaN(d.getTime())) return d.toISOString()
  }

  const dayMonthMatch = text.match(/(\d{1,2})\s*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i)
  if (dayMonthMatch) {
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
    const monthIdx = months.indexOf(dayMonthMatch[2].toLowerCase())
    if (monthIdx >= 0) {
      const year = today.getMonth() > monthIdx ? today.getFullYear() + 1 : today.getFullYear()
      const d = new Date(year, monthIdx, Number(dayMonthMatch[1]))
      if (!Number.isNaN(d.getTime())) return d.toISOString()
    }
  }

  const parsed = Date.parse(text)
  if (!Number.isNaN(parsed)) {
    const d = new Date(parsed)
    d.setHours(0, 0, 0, 0)
    return d.toISOString()
  }

  return null
}

function parseTimeFromText(text) {
  const lower = text.toLowerCase()
  const numericMatch = lower.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/)
  if (numericMatch) {
    let hours = Number(numericMatch[1])
    const minutes = Number(numericMatch[2] || '0')
    const suffix = numericMatch[3]

    if (suffix === 'pm' && hours < 12) hours += 12
    if (suffix === 'am' && hours === 12) hours = 0
    if (hours > 23 || minutes > 59) return null
    return { hours, minutes }
  }

  if (lower.includes('evening') || lower.includes('dinner') || lower.includes('tonight')) {
    return { hours: 19, minutes: 0 }
  }
  if (lower.includes('lunch')) {
    return { hours: 13, minutes: 0 }
  }
  if (lower.includes('morning')) {
    return { hours: 10, minutes: 0 }
  }

  return null
}

function parseName(text) {
  const match = text.match(/(?:my name is|i am|i'm|im|this is)\s+([A-Za-z]+)/i)
  if (match) {
    return capitalize(match[1])
  }
  return null
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

function determineNextStage(data) {
  if (!data.partySize) return CONVERSATION_STAGES.PARTY
  if (!data.date) return CONVERSATION_STAGES.DATE
  if (!data.time) return CONVERSATION_STAGES.TIME
  if (!data.name) return CONVERSATION_STAGES.NAME
  return 'ready'
}

function buildBookingDate(dateIso, time) {
  if (!dateIso || !time) return null
  const date = new Date(dateIso)
  if (Number.isNaN(date.getTime())) return null
  date.setHours(time.hours ?? 19, time.minutes ?? 0, 0, 0)
  return date
}

async function createBooking(client, { restaurantId, customerPhone, customerName, partySize, bookingTime }) {
  const result = await client.query(
    `INSERT INTO bookings (
      restaurant_id,
      customer_name,
      customer_phone,
      party_size,
      booking_time,
      status,
      source
    ) VALUES ($1,$2,$3,$4,$5,'pending','whatsapp')
    RETURNING *`,
    [restaurantId, customerName, customerPhone, partySize, bookingTime.toISOString()],
  )
  return result.rows[0]
}

function formatBookingTime(dateString, timezone = 'Africa/Johannesburg') {
  const date = new Date(dateString)
  const dateFormatter = new Intl.DateTimeFormat('en-ZA', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: timezone,
  })
  const timeFormatter = new Intl.DateTimeFormat('en-ZA', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: timezone,
  })
  return `${dateFormatter.format(date)} at ${timeFormatter.format(date)}`
}

function buildStaffAlertMessage(restaurantName, booking) {
  const date = new Date(booking.booking_time)
  const time = date.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })
  const day = date.toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short' })
  return [
    `🔔 New booking request · ${restaurantName}`,
    `Name: ${booking.customer_name}`,
    `Party: ${booking.party_size} guests`,
    `Date: ${day}`,
    `Time: ${time}`,
    `Ref: ${booking.id.slice(0, 6).toUpperCase()}`,
    '',
    'Reply 1 to confirm or 2 to decline. Use the dashboard for more options.',
  ].join('\n')
}

function getNotificationTarget(restaurant) {
  if (restaurant.notification_destination === 'different' && restaurant.notification_number) {
    return restaurant.notification_number
  }
  return restaurant.whatsapp_number
}

async function safeSend(fn) {
  try {
    await fn()
  } catch (error) {
    console.error('Failed to send WhatsApp message', error)
  }
}

function normalizePhone(value = '') {
  if (!value) return null
  let phone = value.trim()
  if (!phone) return null
  phone = phone.replace(/[^\d+]/g, '')
  if (phone.startsWith('00')) phone = `+${phone.slice(2)}`
  if (!phone.startsWith('+') && phone.length >= 10) {
    phone = `+${phone}`
  }
  return phone
}

function isStaffPhone(restaurant, normalizedPhone) {
  if (!normalizedPhone) return false
  const numbers = [restaurant.whatsapp_number, restaurant.notification_number]
    .filter(Boolean)
    .map((value) => normalizePhone(value))
    .filter(Boolean)
  return numbers.includes(normalizedPhone)
}

async function enqueueStaffBooking(client, restaurantId, staffPhone, bookingId) {
  if (!staffPhone) return
  const existing = await getConversationState(client, restaurantId, staffPhone)
  const pending = Array.isArray(existing?.data?.pending) ? existing.data.pending : []
  pending.push(bookingId)
  await saveConversationState(client, restaurantId, staffPhone, STAFF_ALERT_STATE, { pending })
}

async function handleStaffReply({ client, restaurant, normalizedPhone, originalPhone, text }) {
  const command = parseStaffCommand(text)
  if (!command) {
    await safeSend(() =>
      sendWhatsAppMessage({
        to: originalPhone,
        body: 'Reply 1 to confirm or 2 to decline the newest booking request. You can also manage all bookings in your dashboard.',
      }),
    )
    return { message: 'Awaiting clearer staff command' }
  }

  const state = await getConversationState(client, restaurant.id, normalizedPhone)
  const pendingQueue = Array.isArray(state?.data?.pending) ? state.data.pending : []

  if (!pendingQueue.length) {
    await safeSend(() =>
      sendWhatsAppMessage({
        to: originalPhone,
        body: 'No pending WhatsApp bookings right now. Use the dashboard if you need to review earlier requests.',
      }),
    )
    return { message: 'No pending bookings' }
  }

  const targetBookingId = pendingQueue[0]
  const status = command === 'confirm' ? 'confirmed' : 'cancelled'

  const result = await client.query(
    `UPDATE bookings
     SET status = $2
     WHERE id = $1 AND restaurant_id = $3 AND status = 'pending'
     RETURNING *`,
    [targetBookingId, status, restaurant.id],
  )

  if (result.rowCount === 0) {
    pendingQueue.shift()
    await saveConversationState(client, restaurant.id, normalizedPhone, STAFF_ALERT_STATE, { pending: pendingQueue })
    await safeSend(() =>
      sendWhatsAppMessage({
        to: originalPhone,
        body: 'Looks like that booking was already handled. If you have another, reply again or check the dashboard.',
      }),
    )
    return { message: 'Booking already handled' }
  }

  const booking = result.rows[0]
  pendingQueue.shift()
  await saveConversationState(client, restaurant.id, normalizedPhone, STAFF_ALERT_STATE, { pending: pendingQueue })

  await notifyStaffOfUpdate(originalPhone, restaurant, booking, status)

  if (booking.customer_phone) {
    await notifyGuestOfStatus(restaurant, booking, status)
  }

  return { message: `Booking ${status}` }
}

function parseStaffCommand(text = '') {
  const trimmed = text.trim().toLowerCase()
  if (!trimmed) return null
  if (['1', 'confirm', 'yes', 'y', 'ok', '👍'].includes(trimmed)) return 'confirm'
  if (['2', 'decline', 'cancel', 'no', 'n', 'full'].includes(trimmed)) return 'decline'
  return null
}

async function notifyStaffOfUpdate(staffPhone, restaurant, booking, status) {
  const formattedTime = formatBookingTime(booking.booking_time, restaurant.timezone)
  const body =
    status === 'confirmed'
      ? `✅ Confirmed ${booking.customer_name} for ${formattedTime}. We'll remind them automatically.`
      : `❌ Declined ${booking.customer_name} for ${formattedTime}. We'll let them know.`

  await safeSend(() =>
    sendWhatsAppMessage({
      to: staffPhone,
      body,
    }),
  )
}

async function notifyGuestOfStatus(restaurant, booking, status) {
  const formattedTime = formatBookingTime(booking.booking_time, restaurant.timezone)
  const body =
    status === 'confirmed'
      ? `✅ ${restaurant.name}: Your table is confirmed for ${formattedTime}. Reply CANCEL if plans change.`
      : `Sorry, ${restaurant.name} is at capacity for ${formattedTime}. Reply if you'd like a different time.`

  await safeSend(() =>
    sendWhatsAppMessage({
      to: booking.customer_phone,
      body,
    }),
  )
}
