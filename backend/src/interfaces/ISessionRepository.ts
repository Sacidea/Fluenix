import { IRepository } from './IRepository'

export interface ISessionRepository extends IRepository<any> {
    findByUserId(userId: string): Promise<any[]>
    findAllByUserId(userId: string): Promise<any[]>
}
