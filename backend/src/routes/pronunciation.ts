import { Router } from 'express'
import { PronunciationController } from '../controllers/pronunciation.controller'

const router = Router()
const controller = new PronunciationController()

router.get('/words', controller.getWords)

export default router
