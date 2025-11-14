import cron from 'node-cron'
import { pool } from '../db.mjs'
import { sendWhatsAppMessage } from '../lib/messaging.mjs'

const windowMinutes = Number(process.env.REMINDER_WINDOW_MINUTES || 60) // default 1 hour

async function processReminders() {
  const client = await pool.connect()
  try {
    const result = await client.query(
      `SELECT b.id, b.customer_name, b.customer_phone, b.booking_time, r.name as restaurant_name
       FROM bookings b
       JOIN restaurants r ON r.id = b.restaurant_id
       WHERE b.status = 'confirmed'
         AND b.customer_phone IS NOT NULL
         AND r.reminders_enabled = TRUE
         AND b.reminder_sent_at IS NULL
         AND b.booking_time BETWEEN NOW() AND NOW() + ($1::interval)`,
      [`${windowMinutes} minutes`],
    )

    for (const booking of result.rows) {
      const body = `Reminder: ${booking.restaurant_name} is expecting you at ${new Date(booking.booking_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. Reply CANCEL if you can't make it.`
      await sendWhatsAppMessage({ to: booking.customer_phone, body })
      await client.query('UPDATE bookings SET reminder_sent_at = NOW() WHERE id = $1', [booking.id])
    }
  } catch (error) {
    console.error('Reminder job failed', error)
  } finally {
    client.release()
  }
}

export function startReminderJob() {
  console.log('Reminder job scheduled')
  cron.schedule(process.env.REMINDER_CRON || '*/15 * * * *', () => {
    processReminders()
  })
}
