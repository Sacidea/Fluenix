import { Router } from 'express'
import { PronunciationRepository } from '../repositories/pronunciation.repository'
import { PronunciationService } from '../services/pronunciation.service'
import { PronunciationController } from '../controllers/pronunciation.controller'

const router = Router()

const repository = new PronunciationRepository()
const service = new PronunciationService(repository)
const controller = new PronunciationController(service)

router.get('/words', controller.getWords)

export default router

