import { Router, Request, Response } from 'express'
import prisma from '../config/prisma'
import { requireAuth } from '../middleware/auth'

const router = Router()

// POST /api/writing/next
router.post('/next', requireAuth, async (req: any, res: any) => {
  try {
    const userId = req.auth.userId
    const { level = 'B2', category = 'pr_description' } = req.body

    // 1. Check if we have an available mission in the pool that this user HAS NOT seen
    const availableMissions = await prisma.writingMission.findMany({
      where: {
        level,
        category,
        seenBy: {
          none: {
            userId
          }
        }
      },
      take: 1
    })

    let missionRecord

    if (availableMissions.length > 0) {
      // Cache HIT
      missionRecord = availableMissions[0]
      console.log(`[WritingLab] Cache HIT for level=${level} category=${category} (0ms latency)`)
    } else {
      // 2. Not found or all seen. Generate a new one from Python AI Service.
      console.log(`[WritingLab] Cache MISS for level=${level} category=${category}. Calling AI...`)
      const aiUrl = `${process.env.AI_SERVICE_URL || 'http://localhost:8000'}/writing/generate`
      
      const aiResponse = await fetch(aiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.INTERNAL_API_SECRET}` },
        body: JSON.stringify({ level, category })
      })
      
      if (!aiResponse.ok) {
        throw new Error(`AI Service returned ${aiResponse.status}`)
      }
      
      const aiData = await aiResponse.json()
      const mData = aiData.mission // This is a JSON object from Claude

      // Save to pool
      missionRecord = await prisma.writingMission.create({
        data: {
          level,
          category,
          title: mData.title,
          context: mData.context,
          referenceData: mData.referenceData
        }
      })
      console.log(`[WritingLab] New mission generated and pooled!`)
    }

    // 3. Mark as seen for this user
    try {
      await prisma.userSeenWriting.create({
        data: {
          userId,
          missionId: missionRecord.id
        }
      })
    } catch (e: any) {
      if (e.code !== 'P2002') throw e; // Ignore concurrent strict-mode inserts
    }

    // Return the mission data to the frontend
    res.json({ success: true, data: missionRecord })

    // 4. Async Background Buffer Generator
    setImmediate(async () => {
      try {
        const poolCount = await prisma.writingMission.count({ where: { level, category } })
        const userSeenCount = await prisma.userSeenWriting.count({ where: { userId } }) // Approximation
        
        if (poolCount - userSeenCount < 5) {
          console.log(`[WritingLab] Buffer low (<5) for ${category}. Generating backup in background...`)
          const aiUrl = `${process.env.AI_SERVICE_URL || 'http://localhost:8000'}/writing/generate`
          const aiResponse = await fetch(aiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.INTERNAL_API_SECRET}` },
            body: JSON.stringify({ level, category })
          })
          if (aiResponse.ok) {
            const aiData = await aiResponse.json()
            const mData = aiData.mission
            await prisma.writingMission.create({
              data: {
                level,
                category,
                title: mData.title,
                context: mData.context,
                referenceData: mData.referenceData
              }
            })
            console.log(`[WritingLab] Background generation success for ${category}.`)
          }
        }
      } catch (e) {
        console.error('[WritingLab] Background generation failed', e)
      }
    })

  } catch (error) {
    console.error('Failed to get writing mission:', error)
    res.status(500).json({ error: 'Failed to fetch mission' })
  }
})

export default router
