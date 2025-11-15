import { Router } from 'express'
import { pool } from '../db.mjs'
import { authenticate } from '../middleware/auth.mjs'
import { sendWhatsAppMessage } from '../lib/messaging.mjs'

const router = Router()

function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

function addDays(date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

router.get('/bookings', authenticate, async (req, res) => {
  const { restaurantId } = req.auth
  const { filter = 'today', search } = req.query

  const todayStart = startOfDay(new Date())
  let start = todayStart
  let end = addDays(todayStart, 1)

  if (filter === 'tomorrow') {
    start = addDays(todayStart, 1)
    end = addDays(todayStart, 2)
  } else if (filter === 'week') {
    end = addDays(todayStart, 7)
  }

  try {
    const params = [restaurantId, start.toISOString(), end.toISOString()]
    let query = `
      SELECT id, customer_name, customer_phone, party_size, status, source, notes, booking_time, created_at
      FROM bookings
      WHERE restaurant_id = $1
        AND booking_time >= $2
        AND booking_time < $3
    `

    if (search) {
      params.push(`%${search}%`)
      query += ` AND (customer_name ILIKE $${params.length} OR customer_phone ILIKE $${params.length})`
    }

    query += ' ORDER BY booking_time ASC'

    const result = await pool.query(query, params)
    res.json({ bookings: result.rows })
  } catch (error) {
    console.error('Bookings fetch error', error)
    res.status(500).json({ message: 'Unable to load bookings' })
  }
})

router.post('/bookings', authenticate, async (req, res) => {
  const { restaurantId } = req.auth
  const { customerName, customerPhone, partySize, bookingTime, notes } = req.body || {}

  if (!customerName || !bookingTime || !partySize) {
    return res.status(400).json({ message: 'Missing booking details' })
  }

  try {
    const result = await pool.query(
      `INSERT INTO bookings (
        restaurant_id,
        customer_name,
        customer_phone,
        party_size,
        booking_time,
        status,
        source,
        notes
      ) VALUES ($1,$2,$3,$4,$5,'confirmed','manual',$6)
      RETURNING *`,
      [restaurantId, customerName, customerPhone || null, partySize, bookingTime, notes || null],
    )

    res.status(201).json({ booking: result.rows[0] })
  } catch (error) {
    console.error('Booking create error', error)
    res.status(500).json({ message: 'Unable to add booking' })
  }
})

router.put('/bookings/:id', authenticate, async (req, res) => {
  const { restaurantId } = req.auth
  const { id } = req.params
  const { status } = req.body || {}

  const allowed = ['pending', 'confirmed', 'cancelled']
  if (!allowed.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' })
  }

  try {
    const result = await pool.query(
      `UPDATE bookings
       SET status = $1
       WHERE id = $2 AND restaurant_id = $3
       RETURNING id, customer_name, customer_phone, party_size, status, source, notes, booking_time, created_at`,
      [status, id, restaurantId],
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Booking not found' })
    }

    res.json({ booking: result.rows[0] })
  } catch (error) {
    console.error('Booking update error', error)
    res.status(500).json({ message: 'Unable to update booking' })
  }
})

router.post('/bookings/:id/resend', authenticate, async (req, res) => {
  const { restaurantId } = req.auth
  const { id } = req.params

  try {
    const result = await pool.query(
      `SELECT b.id,
              b.customer_name,
              b.customer_phone,
              b.booking_time,
              r.name as restaurant_name,
              r.timezone
       FROM bookings b
       JOIN restaurants r ON r.id = b.restaurant_id
       WHERE b.id = $1 AND b.restaurant_id = $2
       LIMIT 1`,
      [id, restaurantId],
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Booking not found' })
    }

    const booking = result.rows[0]
    if (!booking.customer_phone) {
      return res.status(400).json({ message: 'No customer phone to send to' })
    }

    const formattedTime = new Intl.DateTimeFormat('en-ZA', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: booking.timezone || 'Africa/Johannesburg',
    }).format(new Date(booking.booking_time))

    await sendWhatsAppMessage({
      to: booking.customer_phone,
      body: `Reminder: ${booking.restaurant_name} has your booking for ${formattedTime}. Reply CANCEL if plans change.`,
    })

    res.json({ message: 'Confirmation resent' })
  } catch (error) {
    console.error('Booking resend error', error)
    res.status(500).json({ message: 'Unable to resend confirmation' })
  }
})

export default router
