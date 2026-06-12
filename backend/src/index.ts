import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../.env') })

import * as Sentry from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    nodeProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
})

import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { redis } from './config/redis'
import sessionsRouter from './routes/sessions'
import usersRouter from './routes/users'
import pronunciationRouter from './routes/pronunciation'
import listeningRouter from './routes/listening.routes'
import grammarRouter from './routes/grammar.routes'
import handbookRouter from './routes/handbook.routes'
import errorRouter from './routes/error.routes'
import behavioralRouter from './routes/behavioral.routes'
import writingRouter from './routes/writing.routes'
import vocabularyRouter from './routes/vocabulary'
import scenarioRouter from './routes/scenario.routes'

const app = express()
app.set('trust proxy', 1)
const PORT = process.env.PORT || 3001

const parseCorsOrigins = (rawOrigins?: string): string[] => {
  if (!rawOrigins) return ['http://localhost:3000']
  return rawOrigins
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean)
}

const allowedOrigins = parseCorsOrigins(process.env.CORS_ORIGINS)

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser tools (health checks, server-to-server requests).
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error('Not allowed by CORS'))
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(helmet())
app.use(express.json({ limit: '1mb' }))

// Global rate limit: 100 requests per minute per IP
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
})
app.use(globalLimiter)

app.get('/health', async (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    service: 'fluenix-api',
    redis: 'removed',
    timestamp: new Date().toISOString(),
    debug_clerk_key: process.env.CLERK_JWT_PUBLIC_KEY ? process.env.CLERK_JWT_PUBLIC_KEY.substring(0, 30) : 'MISSING',
    debug_db: process.env.DATABASE_URL ? 'PRESENT' : 'MISSING'
  })
})

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app)

// Global Error Handler - Sunucunun "Network Error" vermesini engeller
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('🔥 Server Error:', err)
  res.status(500).json({ error: 'Internal Server Error' })
})

app.use('/api/sessions', sessionsRouter)
app.use('/api/users', usersRouter)
app.use('/api/pronunciation', pronunciationRouter)
app.use('/api/listening', listeningRouter)
app.use('/api/grammar', grammarRouter)
app.use('/api/handbook', handbookRouter)
app.use('/api/error-decoding', errorRouter)
app.use('/api/behavioral', behavioralRouter)
app.use('/api/writing', writingRouter)
app.use('/api/vocabulary', vocabularyRouter)
app.use('/api/scenario', scenarioRouter)

app.listen(PORT, async () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`)
})

export default app