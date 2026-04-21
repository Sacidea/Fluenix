import { Router } from 'express'
import prisma from '../config/prisma'
import { SessionRepository } from '../repositories/session.repository'
import { ISessionRepository } from '../interfaces/ISessionRepository'
import { SessionService } from '../services/session.service'
import { SessionController } from '../controllers/session.controller'

const router = Router()
const sessionRepo: ISessionRepository = new SessionRepository(prisma)
const sessionService = new SessionService(sessionRepo)
const sessionController = new SessionController(sessionService)

router.post('/', sessionController.createSession)
router.get('/user/:userId', sessionController.getUserSessions)
router.get('/stats/:userId', sessionController.getUserStats)

export default router