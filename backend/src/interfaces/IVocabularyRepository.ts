import { Prisma, VocabWord, UserSeenVocab } from '@prisma/client'

export interface IVocabularyRepository {
  getWords(): Promise<VocabWord[]>
  createWord(data: Prisma.VocabWordCreateInput): Promise<VocabWord>
  getUserSeenWords(userId: string): Promise<UserSeenVocab[]>
  markWordsAsSeen(userId: string, wordIds: string[]): Promise<void>
  
  getUnseenWords(userId: string): Promise<VocabWord[]>
}
