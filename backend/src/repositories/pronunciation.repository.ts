import { BaseRepository } from './base.repository'
import { Prisma, PronunciationWord } from '@prisma/client'
import { IPronunciationRepository } from '../interfaces/IPronunciationRepository'
import prisma from '../config/prisma'

export class PronunciationRepository
  extends BaseRepository<PronunciationWord>
  implements IPronunciationRepository
{
  constructor() {
    super(prisma, 'pronunciationWord')
  }

  async getWords(): Promise<PronunciationWord[]> {
    return this.prisma.pronunciationWord.findMany({
      orderBy: { createdAt: 'asc' }
    })
  }

  async createWord(data: Prisma.PronunciationWordCreateInput): Promise<PronunciationWord> {
    return this.prisma.pronunciationWord.create({ data })
  }
}

