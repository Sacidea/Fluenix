import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

import express, { Request, Response } from 'express'
import cors from 'cors'
import { redis } from './config/redis'
import sessionsRouter from './routes/sessions'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

app.get('/health', async (req: Request, res: Response) => {
  await redis.set('test', 'fluenix redis çalışıyor!')
  const value = await redis.get('test')
  res.json({
    status: 'ok',
    service: 'fluenix-api',
    redis: value,
    timestamp: new Date()
  })
})

app.use('/api/sessions', sessionsRouter)

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`)
})

export default app