import { PrismaClient } from '@prisma/client'
import { BaseRepository } from './base.repository'
import { ISessionRepository } from '../interfaces/ISessionRepository'

export class SessionRepository extends BaseRepository<any> implements ISessionRepository {
  constructor(prisma: PrismaClient) {
    super(prisma, 'session')
  }

  async findByUserId(userId: string): Promise<any[]> {
    return this.withRetry(() =>
      this.prisma.session.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 20
      })
    )
  }

  async findAllByUserId(userId: string): Promise<any[]> {
    return this.withRetry(() =>
      this.prisma.session.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      })
    )
  }
}