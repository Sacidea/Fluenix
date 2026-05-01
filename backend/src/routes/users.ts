import { Router } from 'express'
import prisma from '../config/prisma'
import { UserRepository } from '../repositories/user.repository'
import { UserService } from '../services/user.service'
import { UserController } from '../controllers/user.controller'
import { requireAuth, requireUserParamMatch } from '../middleware/auth'

const router = Router()

const userRepo = new UserRepository(prisma)
const userService = new UserService(userRepo)
const userController = new UserController(userService)

router.use(requireAuth)
router.get('/:userId', requireUserParamMatch(), userController.getUser)
router.put('/:userId/level', requireUserParamMatch(), userController.updateLevel)

export default router
