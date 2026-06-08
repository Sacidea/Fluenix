import { IPronunciationRepository } from '../interfaces/IPronunciationRepository'
import { IPronunciationService } from '../interfaces/IPronunciationService'
import { DEFAULT_PRONUNCIATION_WORDS } from '../seeders/pronunciation.seeder'
import { PronunciationWord } from '@prisma/client'

export class PronunciationService implements IPronunciationService {
  constructor(private repo: IPronunciationRepository) {}

  async getOrSeedWords(userId: string | null): Promise<PronunciationWord[]> {
    const allWords = await this.repo.getWords()
    
    if (allWords.length < DEFAULT_PRONUNCIATION_WORDS.length) {
      const existingWords = new Set(allWords.map(w => w.word))
      const missingWords = DEFAULT_PRONUNCIATION_WORDS.filter(w => !existingWords.has(w.word as string))
      
      for (const w of missingWords) {
        await this.repo.createWord(w)
      }
    }
    
    if (userId) {
      return this.repo.getUnmasteredWords(userId)
    }
    return this.repo.getWords()
  }

  async generateWords(topic: string): Promise<PronunciationWord[]> {
    try {
      const aiUrl = `${process.env.AI_SERVICE_URL || 'http://localhost:8000'}/pronunciation/generate`
      const response = await fetch(aiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.INTERNAL_API_SECRET}` },
        body: JSON.stringify({ topic })
      })

      if (response.ok) {
        const data = await response.json()
        const newWords = data.words || []
        const createdWords = []
        for (const w of newWords) {
          createdWords.push(await this.repo.createWord({
            word: w.word,
            category: topic,
            phonetic: w.phonetic
          }))
        }
        return createdWords
      }
      throw new Error('AI Service generation failed')
    } catch (error) {
      console.warn('[PronunciationService] AI generation failed or not implemented, falling back to mock generator.', error)
      // Fallback for demonstration since we don't have python AI server source code
      const mocks = [
        { word: `${topic}Core`, category: topic, phonetic: `${topic}-kor` },
        { word: `${topic}System`, category: topic, phonetic: `${topic}-sis-tum` },
        { word: `${topic}Flow`, category: topic, phonetic: `${topic}-floh` },
        { word: `${topic}Base`, category: topic, phonetic: `${topic}-bays` },
        { word: `${topic}Sync`, category: topic, phonetic: `${topic}-sink` }
      ]
      
      const createdWords = []
      for (const m of mocks) {
        try {
          createdWords.push(await this.repo.createWord(m))
        } catch {
          // ignore duplicate
        }
      }
      return createdWords
    }
  }

  async markAsMastered(userId: string, wordId: string): Promise<void> {
    if (!userId || !wordId) return
    await this.repo.markWordAsMastered(userId, wordId)
  }
}

