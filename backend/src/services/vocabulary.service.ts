import { IVocabularyRepository } from '../interfaces/IVocabularyRepository'
import { IVocabularyService } from '../interfaces/IVocabularyService'
import { DEFAULT_VOCABULARY_WORDS } from '../seeders/vocabulary.seeder'
import { VocabWord } from '@prisma/client'

export class VocabularyService implements IVocabularyService {
  constructor(private repo: IVocabularyRepository) {}

  private async seedWordsIfEmpty(): Promise<void> {
    const words = await this.repo.getWords()
    
    if (words.length < DEFAULT_VOCABULARY_WORDS.length) {
      const existingWords = new Set(words.map(w => w.word))
      const missingWords = DEFAULT_VOCABULARY_WORDS.filter(w => !existingWords.has(w.word as string))
      
      for (const w of missingWords) {
        await this.repo.createWord(w)
      }
    }
  }

  async getSessionWords(userId: string, count: number = 10): Promise<VocabWord[]> {
    await this.seedWordsIfEmpty()
    
    const allWords = await this.repo.getWords()
    
    // For anonymous users, return random words
    if (!userId) {
      return this.shuffleAndPick(allWords, count)
    }

    const unseenWords = await this.repo.getUnseenWords(userId)

    let selectedWords: VocabWord[] = []
    
    if (unseenWords.length >= count) {
      selectedWords = this.shuffleAndPick(unseenWords, count)
    } else {
      // If we don't have enough unseen words, we mix them with seen ones.
      // Getting seen words requires fetching all words, and removing the unseen ones.
      const unseenIds = new Set(unseenWords.map(w => w.id))
      const seenWords = allWords.filter(w => !unseenIds.has(w.id))
      
      const needed = count - unseenWords.length
      selectedWords = [
        ...unseenWords,
        ...this.shuffleAndPick(seenWords, needed)
      ]
      // Shuffle the combined result so old words aren't always at the end
      selectedWords = this.shuffleAndPick(selectedWords, selectedWords.length)
    }

    return selectedWords
  }

  async markSessionComplete(userId: string, wordIds: string[]): Promise<void> {
    if (!userId || wordIds.length === 0) return
    await this.repo.markWordsAsSeen(userId, wordIds)
  }

  private shuffleAndPick<T>(array: T[], n: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, n)
  }
}
