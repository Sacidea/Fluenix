import { IRepository } from './IRepository'

export interface ISessionRepository extends IRepository<any> {
    findByUserId(userId: string): Promise<any[]>
    findAllByUserId(userId: string): Promise<any[]>
    getStatsAggregations(userId: string): Promise<{ totalSessions: number, averageScore: number }>
    getLastSessionDate(userId: string): Promise<Date | null>
    deleteSession(sessionId: string, userId: string): Promise<boolean>
}
