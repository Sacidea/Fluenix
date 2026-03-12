import { SessionRepository } from '../repositories/session.repository'
import { ISessionService, CreateSessionDto } from '../interfaces/ISessionService'

export class SessionService implements ISessionService {
  constructor(private sessionRepo: SessionRepository) {}

  async createSession(data: CreateSessionDto) {
    return this.sessionRepo.create(data)
  }

  async getUserSessions(userId: string): Promise<any[]> {
    return this.sessionRepo.findByUserId(userId)
  }

  async getUserStats(userId: string): Promise<any> {
    const stats = await this.sessionRepo.getUserStats(userId)
    return {
      ...stats,
      streak: 0
    }
  }
}