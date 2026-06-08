import { Router } from 'express'
import prisma from '../config/prisma'
import { requireAuth } from '../middleware/auth'

const router = Router()

// POST /api/listening/next
router.post('/next', requireAuth, async (req: any, res: any) => {
  try {
    const userId = req.auth.userId
    const { level = 'B2' } = req.body

    // 1. Check if we have an available scenario in the pool that this user HAS NOT seen
    const availableScenarios = await prisma.listeningScenario.findMany({
      where: {
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
      // Cache HIT
      scenarioRecord = availableScenarios[0]
      console.log(`[ListeningLab] Cache HIT for level=${level} (0ms latency)`)
    } else {
      // 2. Not found or all seen. Generate a new one from Python AI Service.
      console.log(`[ListeningLab] Cache MISS for level=${level}. Calling AI...`)
      const aiUrl = `${process.env.AI_SERVICE_URL || 'http://localhost:8000'}/listening/generate`
      
      const aiResponse = await fetch(aiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.INTERNAL_API_SECRET}` },
        body: JSON.stringify({ level })
      })
      
      if (!aiResponse.ok) {
        throw new Error(`AI Service returned ${aiResponse.status}`)
      }
      
      const aiData = await aiResponse.json()
      const sData = aiData.scenario // JSON object from Claude

      // Save to pool
      scenarioRecord = await prisma.listeningScenario.create({
        data: {
          level,
          title: sData.title,
          context: sData.context,
          dialogue: sData.dialogue,
          questions: sData.questions,
          dictation: sData.dictation,
          shadowing: sData.shadowing
        }
      })
      console.log(`[ListeningLab] New scenario generated and pooled!`)
    }

    // 3. Mark as seen for this user
    try {
      await prisma.userSeenListening.create({
        data: {
          userId,
          scenarioId: scenarioRecord.id
        }
      })
    } catch (e: any) {
      if (e.code !== 'P2002') throw e; // Ignore concurrent strict-mode inserts
    }

    // Return the scenario data to the frontend
    res.json({ success: true, data: scenarioRecord })

    // 4. Async Background Buffer Generator
    setImmediate(async () => {
      try {
        const poolCount = await prisma.listeningScenario.count({ where: { level } })
        const userSeenCount = await prisma.userSeenListening.count({ where: { userId } }) // Approximation
        
        if (poolCount - userSeenCount < 5) {
          console.log(`[ListeningLab] Buffer low (<5). Generating backup in background...`)
          const aiUrl = `${process.env.AI_SERVICE_URL || 'http://localhost:8000'}/listening/generate`
          const aiResponse = await fetch(aiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.INTERNAL_API_SECRET}` },
            body: JSON.stringify({ level })
          })
          if (aiResponse.ok) {
            const aiData = await aiResponse.json()
            const sData = aiData.scenario
            await prisma.listeningScenario.create({
              data: {
                level,
                title: sData.title,
                context: sData.context,
                dialogue: sData.dialogue,
                questions: sData.questions,
                dictation: sData.dictation,
                shadowing: sData.shadowing
              }
            })
            console.log(`[ListeningLab] Background generation success.`)
          }
        }
      } catch (e) {
        console.error('[ListeningLab] Background generation failed', e)
      }
    })

  } catch (error) {
    console.error('Failed to get listening scenario:', error)
    res.status(500).json({ error: 'Failed to fetch listening scenario' })
  }
})

export default router
