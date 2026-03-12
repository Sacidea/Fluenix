import { PrismaClient } from '@prisma/client'
import { BaseRepository } from './base.repository'

export class SessionRepository extends BaseRepository<any> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'session')
  }

  async findByUserId(userId: string) {
    return this.prisma.session.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20
    })
  }

  async getUserStats(userId: string) {
    const sessions = await this.prisma.session.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })

    const totalSessions = sessions.length
    const scoredSessions = sessions.filter(s => s.score !== null)
    const averageScore = scoredSessions.length > 0
      ? scoredSessions.reduce((acc, s) => acc + (s.score || 0), 0) / scoredSessions.length
      : 0

    return {
      totalSessions,
      averageScore: Math.round(averageScore),
      lastSession: sessions[0]?.createdAt || null
    }
  }
}