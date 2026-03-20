import { Router, Request, Response } from 'express'
import prisma from '../config/prisma'
import { SessionRepository } from '../repositories/session.repository'
import { SessionService } from '../services/session.service'
const router = Router()
const sessionRepo = new SessionRepository(prisma)
const sessionService = new SessionService(sessionRepo)
// Oturum kaydet
router.post('/', async (req: Request, res: Response) => {
  try {
    const session = await sessionService.createSession(req.body)
    res.json(session)
  } catch (err) {
    console.error('createSession error:', err)
    res.status(500).json({ error: 'Failed to create session', detail: String(err) })
  }
})

// Kullanıcı oturumları
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const userId = String(req.params.userId)
    const sessions = await sessionService.getUserSessions(userId)
    res.json(sessions)
  } catch (err) {
    console.error('getUserSessions error:', err)
    res.status(500).json({ error: 'Failed to get sessions', detail: String(err) })
  }
})

// Kullanıcı istatistikleri
router.get('/stats/:userId', async (req: Request, res: Response) => {
  try {
    const userId = String(req.params.userId)
    const stats = await sessionService.getUserStats(userId)
    res.json(stats)
  } catch (err) {
    console.error('getUserStats error:', err)
    res.status(500).json({ error: 'Failed to get stats', detail: String(err) })
  }

})

export default router