
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'fluenix-api', timestamp: new Date() })
})

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`)
})

export default app