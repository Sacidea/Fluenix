import { Router, Request, Response } from 'express'
import prisma from '../config/prisma'
import { requireAuth } from '../middleware/auth'

const router = Router()

// POST /api/grammar/next
router.post('/next', requireAuth, async (req: any, res: any) => {
  try {
    const userId = req.auth.userId
    const { level = 'B2' } = req.body
    const uLevel = level.toUpperCase()

    // 1. Check pool for unseen exercise
    const availableExercises = await prisma.grammarExercise.findMany({
      where: {
        level: uLevel,
        seenBy: {
          none: {
            userId
          }
        }
      },
      take: 1
    })

    let exerciseRecord

    if (availableExercises.length > 0) {
      exerciseRecord = availableExercises[0]
      console.log(`[GrammarLab] Cache HIT for level=${uLevel}`)
    } else {
      console.log(`[GrammarLab] Cache MISS for level=${uLevel}. Generating new...`)
      const aiUrl = `${process.env.AI_SERVICE_URL || 'http://localhost:8000'}/grammar/generate`
      const aiResponse = await fetch(aiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.INTERNAL_API_SECRET}` },
        body: JSON.stringify({ level: uLevel })
      })
      
      if (!aiResponse.ok) throw new Error(`AI returned ${aiResponse.status}`)
      const aiData = await aiResponse.json()
      
      exerciseRecord = await prisma.grammarExercise.create({
        data: {
          title: aiData.exercise.title,
          context: aiData.exercise.context,
          level: uLevel,
          segments: aiData.exercise.segments
        }
      })
    }

    // Mark-as-seen is deferred to /api/grammar/mark-seen (on correct answer)
    res.json({ success: true, data: exerciseRecord })

    // Async Background Buffer Generator
    setImmediate(async () => {
      try {
        const poolCount = await prisma.grammarExercise.count({ where: { level: uLevel } })
        const userSeenCount = await prisma.userSeenGrammar.count({ where: { userId } }) // Approximation
        // Just always generate 1 more if we fetched from cache, to slowly grow the pool over time
        // Wait, if we ALWAYS generate, the DB will explode.
        // Let's generate if (poolCount - userSeenCount) < 10
        if (poolCount - userSeenCount < 10) {
          console.log(`[GrammarLab] Buffer low (<10). Generating backup in background...`)
          const aiUrl = `${process.env.AI_SERVICE_URL || 'http://localhost:8000'}/grammar/generate`
          const aiResponse = await fetch(aiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.INTERNAL_API_SECRET}` },
            body: JSON.stringify({ level: uLevel })
          })
          if (aiResponse.ok) {
            const aiData = await aiResponse.json()
            await prisma.grammarExercise.create({
              data: {
                title: aiData.exercise.title,
                context: aiData.exercise.context,
                level: uLevel,
                segments: aiData.exercise.segments
              }
            })
            console.log(`[GrammarLab] Background generation success.`)
          }
        }
      } catch (e) {
        console.error('[GrammarLab] Background generation failed', e)
      }
    })

  } catch (error) {
    console.error('Failed to fetch next grammar:', error)
    res.status(500).json({ success: false, error: 'Internal error' })
  }
})

// POST /api/grammar/mark-seen
router.post('/mark-seen', requireAuth, async (req: any, res: any) => {
  try {
    const userId = req.auth.userId
    const { exerciseId } = req.body

    await prisma.userSeenGrammar.upsert({
      where: {
        userId_exerciseId: { userId, exerciseId }
      },
      update: {},
      create: { userId, exerciseId }
    })

    res.json({ success: true })
  } catch (error) {
    console.error('Failed to mark seen:', error)
    res.status(500).json({ success: false })
  }
})

export default router
