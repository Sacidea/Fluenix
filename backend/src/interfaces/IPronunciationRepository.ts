import { Prisma, PronunciationWord } from '@prisma/client'

export interface IPronunciationRepository {
  getWords(): Promise<PronunciationWord[]>
  createWord(data: Prisma.PronunciationWordCreateInput): Promise<PronunciationWord>
}
