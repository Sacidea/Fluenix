import { User } from '@prisma/client'

export interface IUserRepository {
  upsertUser(userId: string, email: string, name?: string, level?: string): Promise<User>
  updateLevel(userId: string, level: string): Promise<User>
  getUserById(userId: string): Promise<User | null>
}
