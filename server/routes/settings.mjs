import { Router } from 'express'
import { pool } from '../db.mjs'
import { authenticate } from '../middleware/auth.mjs'
import { mapRestaurant } from './utils.mjs'

const router = Router()

router.put('/settings', authenticate, async (req, res) => {
  const { restaurantId } = req.auth
  const {
    notificationDestination,
    notificationNumber,
    emailNotifications,
    notificationEmail,
    remindersEnabled,
    reminderTiming,
    businessHours,
  } = req.body || {}

  try {
    await pool.query(
      `UPDATE restaurants
       SET notification_destination = COALESCE($1, notification_destination),
           notification_number = CASE
             WHEN $1 = 'different' THEN $2
             WHEN $1 = 'same' THEN NULL
             ELSE notification_number
           END,
           notification_email = CASE
             WHEN $3 = true THEN $4
             WHEN $3 = false THEN NULL
             ELSE notification_email
           END,
           reminders_enabled = COALESCE($5, reminders_enabled),
           reminder_timing = COALESCE($6, reminder_timing),
           business_hours = COALESCE($7, business_hours)
       WHERE id = $8`,
      [
        notificationDestination || null,
        notificationNumber || null,
        typeof emailNotifications === 'boolean' ? emailNotifications : null,
        notificationEmail || null,
        typeof remindersEnabled === 'boolean' ? remindersEnabled : null,
        reminderTiming || null,
        businessHours ? JSON.stringify(businessHours) : null,
        restaurantId,
      ],
    )

    const updated = await pool.query(
      `SELECT id, name, owner_name, whatsapp_number, status,
              notification_destination, notification_number, notification_email,
              reminders_enabled, reminder_timing, business_hours, trial_ends_at
       FROM restaurants WHERE id = $1 LIMIT 1`,
      [restaurantId],
    )

    res.json({ restaurant: mapRestaurant(updated.rows[0]) })
  } catch (error) {
    console.error('Settings update error', error)
    res.status(500).json({ message: 'Unable to update settings' })
  }
})

export default router
