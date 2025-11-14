import jwt from 'jsonwebtoken'

export function authenticate(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = header.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.AUTH_SECRET)
    req.auth = payload
    next()
  } catch (error) {
    console.error('Auth error', error)
    return res.status(401).json({ message: 'Invalid token' })
  }
}
