import { IUserRepository } from '../interfaces/IUserRepository'
import { IUserService } from '../interfaces/IUserService'
import { isValidLevel, VALID_LEVELS } from '../config/levels.config'
import { User } from '@prisma/client'

export class UserService implements IUserService {
  constructor(private userRepo: IUserRepository) {}

  async syncUserWithLevel(userId: string, email: string, name: string | undefined, level: string): Promise<User> {
    const finalLevel = isValidLevel(level) ? level : 'beginner'
    return await this.userRepo.upsertUser(userId, email, name, finalLevel)
  }

  async setLevel(userId: string, level: string): Promise<User> {
    if (!isValidLevel(level)) {
      throw new Error(`Invalid level: ${level}. Must be one of ${VALID_LEVELS.join(', ')}`)
    }
    return await this.userRepo.updateLevel(userId, level)
  }

  async getUser(userId: string): Promise<User | { id: string; level: string }> {
    const user = await this.userRepo.getUserById(userId)
    if (!user) {
      return { id: userId, level: 'beginner' }
    }
    return user
  }
}

