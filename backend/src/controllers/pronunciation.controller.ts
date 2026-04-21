import { Request, Response } from 'express'
import { IPronunciationService } from '../interfaces/IPronunciationService'

export class PronunciationController {
  constructor(private service: IPronunciationService) {}

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

