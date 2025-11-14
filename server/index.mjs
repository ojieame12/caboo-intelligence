import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import authRouter from './routes/auth.mjs'
import dashboardRouter from './routes/dashboard.mjs'
import bookingsRouter from './routes/bookings.mjs'
import settingsRouter from './routes/settings.mjs'
import userRouter from './routes/user.mjs'

dotenv.config()

const app = express()

const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',').map((item) => item.trim())
  : ['http://localhost:5173']

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
)
app.use(express.json())
app.use(morgan('tiny'))

app.use('/api', authRouter)
app.use('/api', dashboardRouter)
app.use('/api', bookingsRouter)
app.use('/api', settingsRouter)
app.use('/api', userRouter)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
})
