import { Router } from 'express'
import { pool } from '../db.mjs'
import { authenticate } from '../middleware/auth.mjs'
import { mapRestaurant } from './utils.mjs'

const router = Router()

router.get('/me', authenticate, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, owner_name, whatsapp_number, status,
              notification_destination, notification_number, notification_email,
              reminders_enabled, reminder_timing, business_hours, trial_ends_at
       FROM restaurants
       WHERE id = $1
       LIMIT 1`,
      [req.auth.restaurantId],
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Restaurant not found' })
    }

    res.json({
      restaurant: mapRestaurant(result.rows[0]),
    })
  } catch (error) {
    console.error('Fetch /me error', error)
    res.status(500).json({ message: 'Unable to load profile' })
  }
})

export default router
