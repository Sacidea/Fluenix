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

  async getStatsAggregations(userId: string): Promise<{ totalSessions: number, averageScore: number }> {
    return this.withRetry(async () => {
      const aggregations = await this.prisma.session.aggregate({
        where: { userId },
        _count: true,
        _avg: { score: true }
      })
      return {
        totalSessions: aggregations._count || 0,
        averageScore: aggregations._avg.score || 0
      }
    })
  }

  async getLastSessionDate(userId: string): Promise<Date | null> {
    return this.withRetry(async () => {
      const lastSession = await this.prisma.session.findFirst({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: { createdAt: true }
      })
      return lastSession?.createdAt || null
    })
  }

  async deleteSession(sessionId: string, userId: string): Promise<boolean> {
    return this.withRetry(async () => {
      const result = await this.prisma.session.deleteMany({
        where: { id: sessionId, userId }
      })
      return result.count > 0
    })
  }
}