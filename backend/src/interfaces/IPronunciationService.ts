import { PronunciationWord } from '@prisma/client'

export interface IPronunciationService {
  getOrSeedWords(userId: string | null): Promise<PronunciationWord[]>
  generateWords(topic: string): Promise<PronunciationWord[]>
  markAsMastered(userId: string, wordId: string): Promise<void>
}
