import { Request, Response } from 'express'
import { IPronunciationService } from '../interfaces/IPronunciationService'

export class PronunciationController {
  constructor(private service: IPronunciationService) {}

  public getWords = async (req: any, res: Response) => {
    try {
      const userId = req.auth?.userId || null
      const words = await this.service.getOrSeedWords(userId)
      res.json(words)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Failed to fetch words' })
    }
  }

  public generateWords = async (req: any, res: Response) => {
    try {
      const { topic } = req.body
      if (!topic) {
        return res.status(400).json({ error: 'Topic is required' })
      }
      const words = await this.service.generateWords(topic)
      res.json({ success: true, words })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Failed to generate words' })
    }
  }

  public markMastered = async (req: any, res: Response) => {
    try {
      const userId = req.auth?.userId
      const { wordId } = req.body
      if (!userId || !wordId) {
        return res.status(400).json({ error: 'userId and wordId required' })
      }
      await this.service.markAsMastered(userId, wordId)
      res.json({ success: true })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Failed to mark as mastered' })
    }
  }
}

