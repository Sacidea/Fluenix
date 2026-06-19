import { PrismaClient } from '@prisma/client'
import { ISessionRepository } from '../interfaces/ISessionRepository'
import { ISessionService, CreateSessionDto } from '../interfaces/ISessionService'
import NodeCache from 'node-cache'

const cache = new NodeCache({ stdTTL: 300 })

export class SessionService implements ISessionService {
  constructor(
    private sessionRepo: ISessionRepository,
    private prisma: PrismaClient
  ) { }

  async createSession(data: CreateSessionDto) {
    // Determine streak logic before creating the new session
    const lastSession = await this.sessionRepo.getLastSessionDate(data.userId)
    const now = new Date()

    let shouldIncrementStreak = false
    let shouldResetStreak = false

    if (lastSession) {
      const last = new Date(lastSession)
      last.setHours(0, 0, 0, 0)
      const today = new Date(now)
      today.setHours(0, 0, 0, 0)

      const diffTime = Math.abs(today.getTime() - last.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 1) {
        // Last session was yesterday -> increment
        shouldIncrementStreak = true
      } else if (diffDays > 1) {
        // More than a day has passed -> reset
        shouldResetStreak = true
      }
      // If diffDays === 0, they already practiced today, keep streak the same.
    } else {
      // First session ever
      shouldIncrementStreak = true
    }

    // Update streak based on logic
    if (shouldIncrementStreak) {
      await this.prisma.user.update({
        where: { id: data.userId },
        data: { streak: { increment: 1 } }
      })
    } else if (shouldResetStreak) {
      await this.prisma.user.update({
        where: { id: data.userId },
        data: { streak: 1 }
      })
    }

    // Invalidate cache
    cache.del(`stats:${data.userId}`)
    cache.del(`sessions:${data.userId}`)

    // Create the session
    return this.sessionRepo.create(data)
  }

  async getUserSessions(userId: string): Promise<any[]> {
    const cacheKey = `sessions:${userId}`
    const cached = cache.get(cacheKey)
    if (cached) return cached as any[]

    const sessions = await this.sessionRepo.findByUserId(userId)
    cache.set(cacheKey, sessions)

    return sessions
  }

  async getUserStats(userId: string): Promise<any> {
    const cacheKey = `stats:${userId}`
    const cached = cache.get(cacheKey)
    if (cached) return cached

    const { totalSessions, averageScore } = await this.sessionRepo.getStatsAggregations(userId)
    const lastSession = await this.sessionRepo.getLastSessionDate(userId)
    
    // Fetch user to get O(1) streak
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { streak: true }
    })

    const stats = {
      totalSessions,
      averageScore: Math.round(averageScore),
      lastSession,
      streak: user?.streak || 0
    }

    cache.set(cacheKey, stats)

    return stats
  }

  async deleteSession(sessionId: string, userId: string): Promise<boolean> {
    const deleted = await this.sessionRepo.deleteSession(sessionId, userId)
    if (deleted) {
      cache.del(`stats:${userId}`)
      cache.del(`sessions:${userId}`)
    }
    return deleted
  }
}