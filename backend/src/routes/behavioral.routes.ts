import { Router, Request, Response } from 'express'
import prisma from '../config/prisma'
import { requireAuth } from '../middleware/auth'

const router = Router()

// POST /api/behavioral/next
router.post('/next', requireAuth, async (req: any, res: any) => {
  try {
    const userId = req.auth.userId
    const { level = 'B2' } = req.body

    // 1. Check if we have an available question in the pool that this user HAS NOT seen
    const availableQuestions = await prisma.behavioralQuestion.findMany({
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

    let questionRecord

    if (availableQuestions.length > 0) {
      // Cache HIT
      questionRecord = availableQuestions[0]
      console.log(`[BehavioralLab] Cache HIT for level=${level} (0ms latency)`)
    } else {
      // 2. Not found or all seen. Generate a new one from Python AI Service.
      console.log(`[BehavioralLab] Cache MISS for level=${level}. Calling AI...`)
      const aiUrl = `${process.env.AI_SERVICE_URL || 'http://localhost:8000'}/behavioral/generate`
      
      const aiResponse = await fetch(aiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.INTERNAL_API_SECRET}` },
        body: JSON.stringify({ level })
      })
      
      if (!aiResponse.ok) {
        throw new Error(`AI Service returned ${aiResponse.status}`)
      }
      
      const aiData = await aiResponse.json()
      const questionData = aiData.question // This is a JSON object from Claude

      // Save to pool
      questionRecord = await prisma.behavioralQuestion.create({
        data: {
          level,
          category: questionData.category,
          context: questionData.context,
          question: questionData.question
        }
      })
      console.log(`[BehavioralLab] New question generated and pooled!`)
    }

    // 3. Mark as seen for this user
    try {
      await prisma.userSeenBehavioral.create({
        data: {
          userId,
          questionId: questionRecord.id
        }
      })
    } catch (e: any) {
      // Ignore P2002 (Unique constraint failed) due to React Strict Mode double-firing
      if (e.code !== 'P2002') throw e;
    }

    // Return the question data to the frontend
    res.json({ success: true, data: questionRecord })

    // 4. Async Background Buffer Generator
    setImmediate(async () => {
      try {
        const poolCount = await prisma.behavioralQuestion.count({ where: { level } })
        const userSeenCount = await prisma.userSeenBehavioral.count({ where: { userId } }) // Approximation
        
        if (poolCount - userSeenCount < 10) {
          console.log(`[BehavioralLab] Buffer low (<10). Generating backup in background...`)
          const aiUrl = `${process.env.AI_SERVICE_URL || 'http://localhost:8000'}/behavioral/generate`
          const aiResponse = await fetch(aiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.INTERNAL_API_SECRET}` },
            body: JSON.stringify({ level })
          })
          if (aiResponse.ok) {
            const aiData = await aiResponse.json()
            const qData = aiData.question
            await prisma.behavioralQuestion.create({
              data: {
                level,
                category: qData.category,
                context: qData.context,
                question: qData.question
              }
            })
            console.log(`[BehavioralLab] Background generation success.`)
          }
        }
      } catch (e) {
        console.error('[BehavioralLab] Background generation failed', e)
      }
    })

  } catch (error) {
    console.error('Failed to get behavioral question:', error)
    res.status(500).json({ error: 'Failed to fetch question' })
  }
})

export default router
