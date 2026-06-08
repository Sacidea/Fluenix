import { Router, Request, Response } from 'express'
import prisma from '../config/prisma'
import { requireAuth } from '../middleware/auth'

const router = Router()

// POST /api/error-decoding/scenario
router.post('/scenario', requireAuth, async (req: any, res: any) => {
  try {
    const userId = req.auth.userId
    const { role = 'Full Stack', level = 'B2' } = req.body

    // 1. Check if we have an available scenario in the pool that this user HAS NOT seen
    const availableScenarios = await prisma.errorScenario.findMany({
      where: {
        role,
        level,
        seenBy: {
          none: {
            userId
          }
        }
      },
      take: 1
    })

    let scenarioRecord

    if (availableScenarios.length > 0) {
      // We found a cached scenario in the pool!
      scenarioRecord = availableScenarios[0]
      console.log(`[ErrorDecoder] Cache HIT for role=${role}, level=${level} (0ms latency)`)
    } else {
      // 2. Not found or all seen. Generate a new one from Python AI Service.
      console.log(`[ErrorDecoder] Cache MISS for role=${role}, level=${level}. Calling AI...`)
      const aiUrl = `${process.env.AI_SERVICE_URL || 'http://localhost:8000'}/error-decoder/generate`
      
      const aiResponse = await fetch(aiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.INTERNAL_API_SECRET}` },
        body: JSON.stringify({ role, level })
      })
      
      if (!aiResponse.ok) {
        throw new Error(`AI Service returned ${aiResponse.status}`)
      }
      
      const aiData = await aiResponse.json()
      const scenarioJson = aiData.scenario

      // Save to pool
      scenarioRecord = await prisma.errorScenario.create({
        data: {
          role,
          level,
          scenario: scenarioJson
        }
      })
      console.log(`[ErrorDecoder] New scenario generated and pooled!`)
    }

    // 3. Mark as seen for this user
    try {
      await prisma.userSeenError.create({
        data: {
          userId,
          scenarioId: scenarioRecord.id
        }
      })
    } catch (e: any) {
      if (e.code !== 'P2002') throw e; // Ignore unique constraint from React Strict Mode double-fire
    }

    // Return the JSON string exactly as Python used to do, so frontend doesn't need to change parsing logic
    res.json({ scenario: scenarioRecord.scenario })

    // 4. Async Background Buffer Generator
    setImmediate(async () => {
      try {
        const poolCount = await prisma.errorScenario.count({ where: { role, level } })
        const userSeenCount = await prisma.userSeenError.count({ where: { userId } }) // Approximation
        
        if (poolCount - userSeenCount < 10) {
          console.log(`[ErrorDecoder] Buffer low (<10). Generating backup in background...`)
          const aiUrl = `${process.env.AI_SERVICE_URL || 'http://localhost:8000'}/error-decoder/generate`
          const aiResponse = await fetch(aiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.INTERNAL_API_SECRET}` },
            body: JSON.stringify({ role, level })
          })
          if (aiResponse.ok) {
            const aiData = await aiResponse.json()
            await prisma.errorScenario.create({
              data: {
                role,
                level,
                scenario: aiData.scenario
              }
            })
            console.log(`[ErrorDecoder] Background generation success.`)
          }
        }
      } catch (e) {
        console.error('[ErrorDecoder] Background generation failed', e)
      }
    })

  } catch (error) {
    console.error('Failed to get error scenario:', error)
    res.status(500).json({ error: 'Failed to generate scenario' })
  }
})

export default router
