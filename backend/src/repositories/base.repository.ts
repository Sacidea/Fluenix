import { PrismaClient } from '@prisma/client'
import { IRepository } from '../interfaces/IRepository'

export abstract class BaseRepository<T> implements IRepository<T> {
  constructor(
    protected prisma: PrismaClient,
    protected modelName: string
  ) { }

  async findById(id: string): Promise<T | null> {
    return (this.prisma as any)[this.modelName].findUnique({ where: { id } })
  }

  async findAll(filter?: Partial<T>): Promise<T[]> {
    return (this.prisma as any)[this.modelName].findMany({ where: filter })
  }

  async create(data: Partial<T>): Promise<T> {
    return (this.prisma as any)[this.modelName].create({ data })
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    return (this.prisma as any)[this.modelName].update({ where: { id }, data })
  }

  async delete(id: string): Promise<void> {
    await (this.prisma as any)[this.modelName].delete({ where: { id } })
  }

  protected async withRetry<R>(operation: () => Promise<R>, retries = 3): Promise<R> {
    let attempt = 0
    while (attempt < retries) {
      try {
        return await operation()
      } catch (err) {
        attempt++
        if (attempt === retries) throw err
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    throw new Error('Retry failed')
  }
}