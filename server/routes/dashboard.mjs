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

router.get('/dashboard/summary', authenticate, async (req, res) => {
  const { restaurantId } = req.auth
  const todayStart = startOfDay(new Date())
  const tomorrowStart = addDays(todayStart, 1)
  const weekAheadEnd = addDays(todayStart, 7)
  const weekPastStart = addDays(todayStart, -6)

  try {
    const [restaurantResult, todayResult, tomorrowResult, weekStatsResult, lastBookingResult] = await Promise.all([
      pool.query(
        `SELECT whatsapp_number, reminders_enabled, trial_ends_at
         FROM restaurants WHERE id = $1 LIMIT 1`,
        [restaurantId],
      ),
      pool.query(
        `SELECT id, customer_name, customer_phone, party_size, status, booking_time
         FROM bookings
         WHERE restaurant_id = $1
           AND booking_time >= $2
           AND booking_time < $3
         ORDER BY booking_time ASC`,
        [restaurantId, todayStart.toISOString(), tomorrowStart.toISOString()],
      ),
      pool.query(
        `SELECT id, customer_name, customer_phone, party_size, status, booking_time
         FROM bookings
         WHERE restaurant_id = $1
           AND booking_time >= $2
           AND booking_time < $3
         ORDER BY booking_time ASC`,
        [restaurantId, tomorrowStart.toISOString(), addDays(tomorrowStart, 1).toISOString()],
      ),
      pool.query(
        `SELECT
            COUNT(*)::int as bookings,
            SUM(CASE WHEN status = 'confirmed' THEN 1 ELSE 0 END)::int as confirmed,
            SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END)::int as cancelled
         FROM bookings
         WHERE restaurant_id = $1
           AND booking_time >= $2
           AND booking_time < $3`,
        [restaurantId, weekPastStart.toISOString(), weekAheadEnd.toISOString()],
      ),
      pool.query(
        `SELECT booking_time
         FROM bookings
         WHERE restaurant_id = $1
         ORDER BY booking_time DESC
         LIMIT 1`,
        [restaurantId],
      ),
    ])

    const restaurant = restaurantResult.rows[0]
    const weekStatsRow = weekStatsResult.rows[0] || { bookings: 0, confirmed: 0, cancelled: 0 }
    const bookingsCount = weekStatsRow.bookings || 0
    const noShowsPrevented = Math.max(0, Math.round((weekStatsRow.confirmed || 0) * 0.1))

    res.json({
      connection: {
        phoneNumber: restaurant?.whatsapp_number,
        lastBookingAt: lastBookingResult.rows[0]?.booking_time || null,
      },
      today: todayResult.rows,
      tomorrow: tomorrowResult.rows,
      stats: {
        bookings: bookingsCount,
        messages: bookingsCount * 4,
        noShowsPrevented,
        moneySaved: noShowsPrevented * 900,
      },
      quickActions: {
        remindersEnabled: restaurant?.reminders_enabled ?? true,
      },
      trial: {
        trialEndsAt: restaurant?.trial_ends_at,
      },
    })
  } catch (error) {
    console.error('Dashboard summary error', error)
    res.status(500).json({ message: 'Unable to load dashboard data' })
  }
})

export default router
