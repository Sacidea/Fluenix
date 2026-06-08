import { Prisma, PronunciationWord } from '@prisma/client'

export interface IPronunciationRepository {
  getWords(): Promise<PronunciationWord[]>
  getUnmasteredWords(userId: string): Promise<PronunciationWord[]>
  createWord(data: Prisma.PronunciationWordCreateInput): Promise<PronunciationWord>
  markWordAsMastered(userId: string, wordId: string): Promise<void>
}
