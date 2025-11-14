import { Router } from 'express'
import { pool } from '../db.mjs'
import { authenticate } from '../middleware/auth.mjs'

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

export default router
