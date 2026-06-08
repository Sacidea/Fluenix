import { Router } from 'express'
import { VocabularyController } from '../controllers/vocabulary.controller'
import { VocabularyService } from '../services/vocabulary.service'
import { VocabularyRepository } from '../repositories/vocabulary.repository'
import { requireAuth } from '../middleware/auth'

const router = Router()

const repository = new VocabularyRepository()
const service = new VocabularyService(repository)
const controller = new VocabularyController(service)

// GET /api/vocabulary/session?count=10
router.get('/session', requireAuth, controller.getSessionWords)

// POST /api/vocabulary/complete
router.post('/complete', requireAuth, controller.markSessionComplete)

export default router
