import cron from 'node-cron'
import { pool } from '../db.mjs'
import { sendWhatsAppMessage } from '../lib/messaging.mjs'

const JOB_INTERVAL_MINUTES = Number(process.env.REMINDER_JOB_INTERVAL_MINUTES || 15)
const LOOKAHEAD_HOURS = Number(process.env.REMINDER_LOOKAHEAD_HOURS || 48)

async function processReminders() {
  const client = await pool.connect()
  try {
    const result = await client.query(
      `SELECT b.id,
              b.customer_name,
              b.customer_phone,
              b.booking_time,
              r.name as restaurant_name,
              r.reminder_timing,
              r.timezone
       FROM bookings b
       JOIN restaurants r ON r.id = b.restaurant_id
       WHERE b.status = 'confirmed'
         AND b.customer_phone IS NOT NULL
         AND r.reminders_enabled = TRUE
         AND b.reminder_sent_at IS NULL
         AND b.booking_time BETWEEN NOW() AND NOW() + ($1::interval)`,
      [`${LOOKAHEAD_HOURS} hours`],
    )

    const now = new Date()
    for (const booking of result.rows) {
      const targetMinutes = timingStringToMinutes(booking.reminder_timing)
      const diffMinutes = (new Date(booking.booking_time).getTime() - now.getTime()) / 60000

      if (diffMinutes <= targetMinutes && diffMinutes >= targetMinutes - JOB_INTERVAL_MINUTES) {
        const body = buildReminderMessage(booking)
        await safeSend(() => sendWhatsAppMessage({ to: booking.customer_phone, body }))
        await client.query('UPDATE bookings SET reminder_sent_at = NOW() WHERE id = $1', [booking.id])
      }
    }
  } catch (error) {
    console.error('Reminder job failed', error)
  } finally {
    client.release()
  }
}

export function startReminderJob() {
  console.log('Reminder job scheduled')
  const schedule = process.env.REMINDER_CRON || `*/${JOB_INTERVAL_MINUTES} * * * *`
  cron.schedule(schedule, () => {
    processReminders()
  })
}

function timingStringToMinutes(value) {
  if (!value) return 180
  if (value.endsWith('h')) {
    return Number(value.replace('h', '')) * 60
  }
  const minutes = Number(value.replace('m', ''))
  return Number.isNaN(minutes) ? 180 : minutes
}

function buildReminderMessage(booking) {
  const timezone = booking.timezone || 'Africa/Johannesburg'
  const bookingDate = new Date(booking.booking_time)
  const timeString = bookingDate.toLocaleTimeString('en-ZA', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timezone,
  })
  const dateString = bookingDate.toLocaleDateString('en-ZA', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: timezone,
  })
  return `Reminder: ${booking.restaurant_name} is expecting you ${dateString} at ${timeString}. Reply CANCEL if you can't make it.`
}

async function safeSend(fn) {
  try {
    await fn()
  } catch (error) {
    console.error('Reminder send failed', error)
  }
}
