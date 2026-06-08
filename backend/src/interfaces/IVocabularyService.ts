import { VocabWord } from '@prisma/client'

export interface IVocabularyService {
  getSessionWords(userId: string, count?: number): Promise<VocabWord[]>
  markSessionComplete(userId: string, wordIds: string[]): Promise<void>
}
