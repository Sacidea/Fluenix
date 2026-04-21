import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '../.env') })

import express, { Request, Response } from 'express'
import cors from 'cors'
import { redis } from './config/redis'
import sessionsRouter from './routes/sessions'
import usersRouter from './routes/users'
import pronunciationRouter from './routes/pronunciation'
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: '*',
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
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`)
})

export default app