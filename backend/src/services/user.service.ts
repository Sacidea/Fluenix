import { UserRepository } from '../repositories/user.repository'

export class UserService {
  constructor(private userRepo: UserRepository) {}

  async syncUserWithLevel(userId: string, email: string, name: string | undefined, level: string) {
    // Determine level if unspecified
    const finalLevel = level || 'beginner'
    return await this.userRepo.upsertUser(userId, email, name, finalLevel)
  }

  async setLevel(userId: string, level: string) {
    const validLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'beginner']
    if (!validLevels.includes(level)) {
      throw new Error(`Invalid level: ${level}. Must be one of ${validLevels.join(', ')}`)
    }
    return await this.userRepo.updateLevel(userId, level)
  }

  async getUser(userId: string) {
    const user = await this.userRepo.getUserById(userId)
    if (!user) {
      return { id: userId, level: 'beginner' }
    }
    return user
  }
}
