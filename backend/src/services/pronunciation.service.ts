import { IPronunciationRepository } from '../interfaces/IPronunciationRepository'
import { IPronunciationService } from '../interfaces/IPronunciationService'
import { DEFAULT_PRONUNCIATION_WORDS } from '../seeders/pronunciation.seeder'
import { PronunciationWord } from '@prisma/client'

export class PronunciationService implements IPronunciationService {
  constructor(private repo: IPronunciationRepository) {}

  async getOrSeedWords(): Promise<PronunciationWord[]> {
    let words = await this.repo.getWords()
    
    if (words.length === 0) {
      for (const w of DEFAULT_PRONUNCIATION_WORDS) {
        await this.repo.createWord(w)
      }
      words = await this.repo.getWords()
    }
    
    return words
  }
}

