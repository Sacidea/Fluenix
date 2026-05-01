import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

type AuthContext = {
  userId: string
  sessionId?: string
}

const getBearerToken = (authorizationHeader?: string): string | null => {
  if (!authorizationHeader) return null
  const [scheme, token] = authorizationHeader.split(' ')
  if (scheme !== 'Bearer' || !token) return null
  return token
}

const readClerkJwtPublicKey = (): string | null => {
  const raw = process.env.CLERK_JWT_PUBLIC_KEY
  if (!raw) return null
  // Supports keys passed as single-line env values with escaped newlines.
  return raw.replace(/\\n/g, '\n')
}

const parseAuthPayload = (payload: string | JwtPayload): AuthContext | null => {
  if (typeof payload === 'string') return null
  const sub = payload.sub
  if (!sub || typeof sub !== 'string') return null
  const sid = typeof payload.sid === 'string' ? payload.sid : undefined
  return { userId: sub, sessionId: sid }
}

let hasWarnedMissingKey = false

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = getBearerToken(req.headers.authorization)
  if (!token) {
    return res.status(401).json({ error: 'Missing bearer token' })
  }

  const publicKey = readClerkJwtPublicKey()
  if (!publicKey) {
    if (process.env.NODE_ENV === 'production') {
      return res.status(500).json({ error: 'Server auth misconfiguration' })
    }

    if (!hasWarnedMissingKey) {
      hasWarnedMissingKey = true
      console.warn('CLERK_JWT_PUBLIC_KEY is missing. Falling back to unverified JWT decode in development.')
    }

    const decoded = jwt.decode(token)
    const auth = parseAuthPayload(decoded as string | JwtPayload)
    if (!auth) {
      return res.status(401).json({ error: 'Invalid auth token payload' })
    }
    req.auth = auth
    return next()
  }

  try {
    const payload = jwt.verify(token, publicKey, {
      algorithms: ['RS256']
    })
    const auth = parseAuthPayload(payload)
    if (!auth) {
      return res.status(401).json({ error: 'Invalid auth token payload' })
    }
    req.auth = auth
    return next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

export const requireUserParamMatch = (paramName = 'userId') =>
  (req: Request, res: Response, next: NextFunction) => {
    const requestedUserId = String(req.params[paramName] || '')
    if (!requestedUserId) {
      return res.status(400).json({ error: `Missing route parameter: ${paramName}` })
    }
    if (!req.auth || requestedUserId !== req.auth.userId) {
      return res.status(403).json({ error: 'Forbidden: user mismatch' })
    }
    return next()
  }

export const requireBodyUserMatch = (fieldName = 'userId') =>
  (req: Request, res: Response, next: NextFunction) => {
    const requestedUserId = String(req.body?.[fieldName] || '')
    if (!requestedUserId) {
      return res.status(400).json({ error: `Missing request field: ${fieldName}` })
    }
    if (!req.auth || requestedUserId !== req.auth.userId) {
      return res.status(403).json({ error: 'Forbidden: user mismatch' })
    }
    return next()
  }
