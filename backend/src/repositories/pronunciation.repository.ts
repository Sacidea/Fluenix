import { BaseRepository } from './base.repository'
import { Prisma, PronunciationWord } from '@prisma/client'
import { prisma } from '../config/prisma'

export class PronunciationRepository extends BaseRepository<PronunciationWord> {
  constructor() {
    super(prisma, 'pronunciationWord')
  }
  async getWords() {
    return this.prisma.pronunciationWord.findMany({
      orderBy: { createdAt: 'asc' }
    })
  }

  async createWord(data: Prisma.PronunciationWordCreateInput) {
    return this.prisma.pronunciationWord.create({ data })
  }
}
