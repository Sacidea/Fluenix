import { ISessionRepository } from '../interfaces/ISessionRepository'
import { ISessionService, CreateSessionDto } from '../interfaces/ISessionService'

export class SessionService implements ISessionService {
  constructor(private sessionRepo: ISessionRepository) { }

  async createSession(data: CreateSessionDto) {
    return this.sessionRepo.create(data)
  }

  async getUserSessions(userId: string): Promise<any[]> {
    return this.sessionRepo.findByUserId(userId)
  }

  async getUserStats(userId: string): Promise<any> {
    const sessions = await this.sessionRepo.findAllByUserId(userId)
    const totalSessions = sessions.length
    const scoredSessions = sessions.filter((s: any) => s.score !== null)
    const averageScore = scoredSessions.length > 0
      ? scoredSessions.reduce((acc: number, s: any) => acc + (s.score || 0), 0) / scoredSessions.length
      : 0
    return {
      totalSessions,
      averageScore: Math.round(averageScore),
      lastSession: sessions[0]?.createdAt || null,
      streak: 0
    }
  }
}