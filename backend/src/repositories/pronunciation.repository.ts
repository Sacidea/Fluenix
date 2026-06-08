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

  async getUnmasteredWords(userId: string): Promise<PronunciationWord[]> {
    return this.prisma.pronunciationWord.findMany({
      where: {
        masteredBy: {
          none: { userId }
        }
      },
      orderBy: { createdAt: 'asc' }
    })
  }

  async createWord(data: Prisma.PronunciationWordCreateInput): Promise<PronunciationWord> {
    return this.prisma.pronunciationWord.create({ data })
  }

  async markWordAsMastered(userId: string, wordId: string): Promise<void> {
    try {
      await this.prisma.userMasteredPronunciation.create({
        data: { userId, wordId }
      })
    } catch (e: any) {
      if (e.code !== 'P2002') throw e // ignore if already mastered
    }
  }
}

