import { Router } from 'express'
import { ScenarioController } from '../controllers/scenario.controller'
import { ScenarioService } from '../services/scenario.service'
import { ScenarioRepository } from '../repositories/scenario.repository'
import { requireAuth } from '../middleware/auth'

const router = Router()

const repository = new ScenarioRepository()
const service = new ScenarioService(repository)
const controller = new ScenarioController(service)

// POST /api/scenario/next
router.post('/next', requireAuth, controller.getNextMission)

// POST /api/scenario/complete
router.post('/complete', requireAuth, controller.markMissionComplete)

export default router
