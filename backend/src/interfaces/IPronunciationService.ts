import { PronunciationWord } from '@prisma/client'

export interface IPronunciationService {
  getOrSeedWords(): Promise<PronunciationWord[]>
}
