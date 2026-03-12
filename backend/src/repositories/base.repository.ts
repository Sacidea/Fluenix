import { PrismaClient } from '@prisma/client'
import { IRepository } from '../interfaces/IRepository'

export abstract class BaseRepository<T> implements IRepository<T> {
  constructor(
    protected prisma: PrismaClient,
    protected modelName: string
  ) {}

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
}