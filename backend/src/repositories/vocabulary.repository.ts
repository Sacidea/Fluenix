import { BaseRepository } from './base.repository'
import { Prisma, VocabWord, UserSeenVocab } from '@prisma/client'
import { IVocabularyRepository } from '../interfaces/IVocabularyRepository'
import prisma from '../config/prisma'

export class VocabularyRepository
  extends BaseRepository<VocabWord>
  implements IVocabularyRepository
{
  constructor() {
    super(prisma, 'vocabWord')
  }

  async getWords(): Promise<VocabWord[]> {
    return this.prisma.vocabWord.findMany({
      orderBy: { createdAt: 'asc' }
    })
  }

  async createWord(data: Prisma.VocabWordCreateInput): Promise<VocabWord> {
    return this.prisma.vocabWord.create({ data })
  }

  async getUserSeenWords(userId: string): Promise<UserSeenVocab[]> {
    return this.prisma.userSeenVocab.findMany({
      where: { userId }
    })
  }

  async markWordsAsSeen(userId: string, wordIds: string[]): Promise<void> {
    const data = wordIds.map(wordId => ({
      userId,
      wordId
    }))
    
    // Use createMany to ignore duplicates gracefully
    await this.prisma.userSeenVocab.createMany({
      data,
      skipDuplicates: true
    })
  }

  async getUnseenWords(userId: string): Promise<VocabWord[]> {
    return this.prisma.vocabWord.findMany({
      where: {
        seenBy: { none: { userId } }
      }
    })
  }
}
