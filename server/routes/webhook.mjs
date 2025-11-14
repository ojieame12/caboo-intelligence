import { Router } from 'express'
import { pool } from '../db.mjs'

const router = Router()

function parseBookingFromText(text = '') {
  const parts = text.split('|').map((p) => p.trim())
  if (parts.length < 5) return null
  const [keyword, name, date, time, people] = parts
  if (keyword.toLowerCase() !== 'book') return null
  return {
    customer_name: name,
    booking_time: new Date(`${date}T${time}`),
    party_size: Number(people) || 2,
  }
}

router.post('/webhook/messages', async (req, res) => {
  const { restaurantId, customerPhone, text } = req.body || {}

  if (!restaurantId || !customerPhone || !text) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const bookingPayload = parseBookingFromText(text)
  if (!bookingPayload) {
    return res.status(200).json({ message: 'No booking detected' })
  }

  const client = await pool.connect()
  try {
    const restaurant = await client.query('SELECT id FROM restaurants WHERE id = $1 LIMIT 1', [restaurantId])
    if (restaurant.rowCount === 0) {
      return res.status(404).json({ message: 'Restaurant not found' })
    }

    await client.query(
      `INSERT INTO bookings (
        restaurant_id,
        customer_name,
        customer_phone,
        party_size,
        booking_time,
        status,
        source
      ) VALUES ($1,$2,$3,$4,$5,'pending','whatsapp')`,
      [
        restaurantId,
        bookingPayload.customer_name,
        customerPhone,
        bookingPayload.party_size,
        bookingPayload.booking_time,
      ],
    )

    res.json({ message: 'Booking created' })
  } catch (error) {
    console.error('Webhook error', error)
    res.status(500).json({ message: 'Internal error' })
  } finally {
    client.release()
  }
})

export default router
