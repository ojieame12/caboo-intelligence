import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { randomUUID } from 'node:crypto'
import { pool } from '../db.mjs'

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
        id, user_id, name, owner_name, whatsapp_number, status, trial_ends_at
      )
      VALUES ($1, $2, $3, $4, $5, 'pending_whatsapp', $6)`,
      [restaurantId, userId, restaurantName.trim(), ownerName.trim(), whatsappNumber.trim(), trialEndsAt],
    )

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
        whatsappNumber: whatsappNumber.trim(),
        status: 'pending_whatsapp',
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
      `SELECT u.id as user_id, u.password_hash, r.id as restaurant_id, r.name as restaurant_name, r.status
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
      restaurant: {
        id: record.restaurant_id,
        name: record.restaurant_name,
        status: record.status,
      },
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
