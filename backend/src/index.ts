import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../.env') })

import express, { Request, Response } from 'express'
import cors from 'cors'
import { redis } from './config/redis'
import sessionsRouter from './routes/sessions'
import usersRouter from './routes/users'
import pronunciationRouter from './routes/pronunciation'
import listeningRouter from './routes/listening.routes'

const app = express()
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
    if (allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error('Not allowed by CORS'))
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

app.get('/health', async (req: Request, res: Response) => {
  try {
    // Redis opsiyonel olsun, hata verirse sunucuyu çökertmesin
    let redisStatus = 'not_connected'
    try {
      await redis.set('test', 'fluenix redis çalışıyor!')
      redisStatus = (await redis.get('test')) || 'ok'
    } catch (e) {
      console.warn('⚠️ Redis connection failed, skipping...')
    }

    res.json({
      status: 'ok',
      service: 'fluenix-api',
      redis: redisStatus,
      timestamp: new Date()
    })
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Health check failed' })
  }
})

// Global Error Handler - Sunucunun "Network Error" vermesini engeller
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('🔥 Server Error:', err)
  res.status(500).json({ error: 'Internal Server Error' })
})

app.use('/api/sessions', sessionsRouter)
app.use('/api/users', usersRouter)
app.use('/api/pronunciation', pronunciationRouter)
app.use('/api/listening', listeningRouter)
import { PrismaClient } from '@prisma/client'
import { DEFAULT_PRONUNCIATION_WORDS } from './seeders/pronunciation.seeder'

const prisma = new PrismaClient()

app.listen(PORT, async () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`)
  
  // Auto-seed pronunciation words
  console.log('Seeding pronunciation words...')
  for (const word of DEFAULT_PRONUNCIATION_WORDS) {
    await prisma.pronunciationWord.upsert({
      where: { word: word.word },
      update: { category: word.category, phonetic: word.phonetic },
      create: word,
    })
  }
  console.log('Successfully seeded ' + DEFAULT_PRONUNCIATION_WORDS.length + ' words.')
})

export default app