import { PrismaClient } from '@prisma/client'

export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  async upsertUser(userId: string, email: string, name?: string, level: string = 'beginner') {
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

  async updateLevel(userId: string, level: string) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: { level }
    })
  }

  async getUserById(userId: string) {
    return await this.prisma.user.findUnique({
      where: { id: userId }
    })
  }
}
