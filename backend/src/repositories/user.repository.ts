import { PrismaClient, User } from '@prisma/client'
import { IUserRepository } from '../interfaces/IUserRepository'

export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async upsertUser(userId: string, email: string, name?: string, level: string = 'beginner'): Promise<User> {
    return await this.prisma.user.upsert({
      where: { id: userId },
      update: {
        email: email,
        name: name,
        level: level,
      },
      create: {
        id: userId,
        email: email,
        name: name,
        level: level,
      }
    })
  }

  async updateLevel(userId: string, level: string): Promise<User> {
    return await this.prisma.user.update({
      where: { id: userId },
      data: { level }
    })
  }

  async getUserById(userId: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id: userId }
    })
  }
}

