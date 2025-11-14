import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool } = pg

const connectionString =
  process.env.NEON_PRODUCTION ||
  process.env.NEON_DATABASE_URL ||
  process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('Missing Neon connection string (NEON_PRODUCTION/NEON_DATABASE_URL)')
}

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
})

pool.on('error', (err) => {
  console.error('Unexpected database error', err)
  process.exit(1)
})
