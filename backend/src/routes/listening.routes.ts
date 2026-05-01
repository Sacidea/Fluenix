import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try {
    const { level } = req.query
    
    const whereClause = level && typeof level === 'string' 
      ? { level: level.toUpperCase() } 
      : {}

    const scenarios = await prisma.listeningScenario.findMany({
      where: whereClause,
      orderBy: { createdAt: 'asc' }
    })
    
    res.json({
      success: true,
      data: scenarios
    })
  } catch (error) {
    console.error('Error fetching listening scenarios:', error)
    res.status(500).json({ success: false, error: 'Internal Server Error' })
  }
})

export default router
