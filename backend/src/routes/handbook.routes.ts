import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.get('/rules', async (req, res) => {
  try {
    const rules = await prisma.grammarRule.findMany({
      orderBy: { category: 'asc' }
    })
    
    // Group rules by category
    const groupedRules = rules.reduce((acc, rule) => {
      if (!acc[rule.category]) {
        acc[rule.category] = []
      }
      acc[rule.category].push(rule)
      return acc
    }, {} as Record<string, typeof rules>)

    res.json({
      success: true,
      data: groupedRules
    })
  } catch (error) {
    console.error('Error fetching grammar rules:', error)
    res.status(500).json({ success: false, error: 'Internal Server Error' })
  }
})

export default router
