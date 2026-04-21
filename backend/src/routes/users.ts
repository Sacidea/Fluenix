import { Router } from 'express'
import prisma from '../config/prisma'
import { UserRepository } from '../repositories/user.repository'
import { UserService } from '../services/user.service'
import { UserController } from '../controllers/user.controller'

const router = Router()

const userRepo = new UserRepository(prisma)
const userService = new UserService(userRepo)
const userController = new UserController(userService)

router.get('/:userId', userController.getUser)
router.put('/:userId/level', userController.updateLevel)

export default router
