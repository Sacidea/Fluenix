import { Router } from 'express'
import prisma from '../config/prisma'
import { SessionRepository } from '../repositories/session.repository'
import { ISessionRepository } from '../interfaces/ISessionRepository'
import { SessionService } from '../services/session.service'
import { SessionController } from '../controllers/session.controller'
import { requireAuth, requireBodyUserMatch, requireUserParamMatch } from '../middleware/auth'

const router = Router()
const sessionRepo: ISessionRepository = new SessionRepository(prisma)
const sessionService = new SessionService(sessionRepo, prisma)
const sessionController = new SessionController(sessionService)

router.use(requireAuth)
router.post('/', requireBodyUserMatch(), sessionController.createSession)
router.get('/user/:userId', requireUserParamMatch(), sessionController.getUserSessions)
router.get('/stats/:userId', requireUserParamMatch(), sessionController.getUserStats)
router.delete('/:id', requireAuth, sessionController.deleteSession)

export default router