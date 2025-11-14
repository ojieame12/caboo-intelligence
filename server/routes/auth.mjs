import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { randomUUID } from 'node:crypto'
import { pool } from '../db.mjs'
import { mapRestaurant } from './utils.mjs'

const router = Router()

const TOKEN_EXPIRY = process.env.AUTH_TOKEN_TTL || '7d'

function buildToken(payload) {
  const secret = process.env.AUTH_SECRET
  if (!secret) {
    throw new Error('Missing AUTH_SECRET environment variable')
  }
  return jwt.sign(payload, secret, { expiresIn: TOKEN_EXPIRY })
}

function sanitizeEmail(email = '') {
  return email.trim().toLowerCase()
}

async function insertSampleBookings(client, restaurantId) {
  const base = new Date()
  base.setMinutes(0, 0, 0)

  const samples = [
    {
      customer_name: 'Sarah Chen',
      customer_phone: '+27 82 123 4567',
      party_size: 4,
      booking_time: new Date(base.getTime() + 2 * 60 * 60 * 1000), // +2h today
      status: 'confirmed',
      source: 'whatsapp',
      notes: 'Birthday dinner, vegetarian option needed',
    },
    {
      customer_name: 'Marco Silva',
      customer_phone: '+27 83 456 7890',
      party_size: 2,
      booking_time: new Date(base.getTime() + 4 * 60 * 60 * 1000),
      status: 'pending',
      source: 'whatsapp',
      notes: '',
    },
    {
      customer_name: 'Nandi Dlamini',
      customer_phone: '+27 84 789 0123',
      party_size: 5,
      booking_time: new Date(base.getTime() + 28 * 60 * 60 * 1000), // tomorrow
      status: 'confirmed',
      source: 'whatsapp',
      notes: '',
    },
  ]

  for (const sample of samples) {
    await client.query(
      `INSERT INTO bookings (
        restaurant_id,
        customer_name,
        customer_phone,
        party_size,
        booking_time,
        status,
        source,
        notes
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [
        restaurantId,
        sample.customer_name,
        sample.customer_phone,
        sample.party_size,
        sample.booking_time.toISOString(),
        sample.status,
        sample.source,
        sample.notes,
      ],
    )
  }
}

router.post('/signup', async (req, res) => {
  const { restaurantName, ownerName, email, whatsappNumber, password } = req.body || {}

  if (!restaurantName || !ownerName || !email || !whatsappNumber || !password) {
    return res.status(400).json({ message: 'All fields are required.' })
  }

  const normalizedEmail = sanitizeEmail(email)

  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    const emailCheck = await client.query('SELECT id FROM users WHERE email = $1', [normalizedEmail])
    if (emailCheck.rowCount > 0) {
      await client.query('ROLLBACK')
      return res.status(409).json({ message: 'Email already registered.' })
    }

    const userId = randomUUID()
    const restaurantId = randomUUID()
    const passwordHash = await bcrypt.hash(password, 12)
    const trialEndsAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)

    await client.query(
      `INSERT INTO users (id, email, password_hash)
       VALUES ($1, $2, $3)`,
      [userId, normalizedEmail, passwordHash],
    )

    await client.query(
      `INSERT INTO restaurants (
        id,
        user_id,
        name,
        owner_name,
        whatsapp_number,
        status,
        trial_ends_at,
        notification_destination,
        notification_number,
        notification_email,
        reminders_enabled,
        reminder_timing,
        business_hours
      )
      VALUES (
        $1,$2,$3,$4,$5,'pending_whatsapp',$6,'same',NULL,NULL,TRUE,'3h',
        $7
      )`,
      [
        restaurantId,
        userId,
        restaurantName.trim(),
        ownerName.trim(),
        whatsappNumber.trim(),
        trialEndsAt,
        JSON.stringify({
          mon: { open: '17:00', close: '23:00', closed: false },
          tue: { open: '17:00', close: '23:00', closed: false },
          wed: { open: '17:00', close: '23:00', closed: false },
          thu: { open: '17:00', close: '23:00', closed: false },
          fri: { open: '17:00', close: '23:00', closed: false },
          sat: { open: '12:00', close: '23:00', closed: false },
          sun: { open: '12:00', close: '22:00', closed: false },
        }),
      ],
    )

    await insertSampleBookings(client, restaurantId)

    await client.query('COMMIT')

    const token = buildToken({ userId, restaurantId, email: normalizedEmail })

    res.json({
      token,
      user: {
        id: userId,
        email: normalizedEmail,
        name: ownerName.trim(),
      },
      restaurant: {
        id: restaurantId,
        name: restaurantName.trim(),
        ownerName: ownerName.trim(),
        whatsappNumber: whatsappNumber.trim(),
        status: 'pending_whatsapp',
        notificationDestination: 'same',
        remindersEnabled: true,
        reminderTiming: '3h',
        trialEndsAt,
      },
    })
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Signup error', error)
    res.status(500).json({ message: 'Unable to create account right now.' })
  } finally {
    client.release()
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {}

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' })
  }

  const normalizedEmail = sanitizeEmail(email)

  try {
    const result = await pool.query(
      `SELECT 
        u.id as user_id,
        u.password_hash,
        r.id as restaurant_id,
        r.name,
        r.owner_name,
        r.status,
        r.whatsapp_number,
        r.notification_destination,
        r.notification_number,
        r.notification_email,
        r.reminders_enabled,
        r.reminder_timing,
        r.business_hours,
        r.trial_ends_at
       FROM users u
       JOIN restaurants r ON r.user_id = u.id
       WHERE u.email = $1
       LIMIT 1`,
      [normalizedEmail],
    )

    if (result.rowCount === 0) {
      return res.status(401).json({ message: 'Invalid credentials.' })
    }

    const record = result.rows[0]
    const valid = await bcrypt.compare(password, record.password_hash)
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials.' })
    }

    const token = buildToken({
      userId: record.user_id,
      restaurantId: record.restaurant_id,
      email: normalizedEmail,
    })

    res.json({
      token,
      user: {
        id: record.user_id,
        email: normalizedEmail,
      },
      restaurant: mapRestaurant({
        id: record.restaurant_id,
        name: record.name,
        owner_name: record.owner_name,
        status: record.status,
        whatsapp_number: record.whatsapp_number,
        notification_destination: record.notification_destination,
        notification_number: record.notification_number,
        notification_email: record.notification_email,
        reminders_enabled: record.reminders_enabled,
        reminder_timing: record.reminder_timing,
        business_hours: record.business_hours,
        trial_ends_at: record.trial_ends_at,
      }),
    })
  } catch (error) {
    console.error('Login error', error)
    res.status(500).json({ message: 'Unable to sign in right now.' })
  }
})

router.get('/health', (_req, res) => {
  res.json({ ok: true })
})

export default router
