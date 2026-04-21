import { Request, Response } from 'express'
import { PronunciationService } from '../services/pronunciation.service'

export class PronunciationController {
  private service = new PronunciationService()

  public getWords = async (req: Request, res: Response) => {
    try {
      const words = await this.service.getOrSeedWords()
      res.json(words)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Failed to fetch words' })
    }
  }
}
