import { Router } from 'express'
import { PronunciationRepository } from '../repositories/pronunciation.repository'
import { PronunciationService } from '../services/pronunciation.service'
import { PronunciationController } from '../controllers/pronunciation.controller'
import { requireAuth } from '../middleware/auth'

const router = Router()

const repository = new PronunciationRepository()
const service = new PronunciationService(repository)
const controller = new PronunciationController(service)

router.get('/words', requireAuth, controller.getWords)
router.post('/generate', requireAuth, controller.generateWords)
router.post('/master', requireAuth, controller.markMastered)

export default router

