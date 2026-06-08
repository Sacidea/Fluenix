export interface ISessionService {
  createSession(data: CreateSessionDto): Promise<any>
  getUserSessions(userId: string): Promise<any[]>
  getUserStats(userId: string): Promise<UserStats>
  deleteSession(sessionId: string, userId: string): Promise<boolean>
}

export interface CreateSessionDto {
  userId: string
  type: string
  scenario?: string
  duration: number
  score?: number
  feedback?: any
}

export interface UserStats {
  totalSessions: number
  averageScore: number
  streak: number
  lastSession: Date | null
}