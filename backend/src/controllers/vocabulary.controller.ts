import { Request, Response } from 'express'
import { IVocabularyService } from '../interfaces/IVocabularyService'

export class VocabularyController {
  constructor(private service: IVocabularyService) {}

  public getSessionWords = async (req: Request, res: Response) => {
    try {
      // userId comes from verified JWT auth middleware — not from client
      const userId = (req as any).auth?.userId || ''
      const count = req.query.count ? parseInt(req.query.count as string) : 10
      
      const words = await this.service.getSessionWords(userId, count)
      res.json(words)
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Failed to fetch vocabulary session' })
    }
  }

  public markSessionComplete = async (req: Request, res: Response) => {
    try {
      // userId comes from verified JWT — ignore any client-supplied userId
      const userId = (req as any).auth?.userId
      const wordIds = req.body.wordIds as string[]

      if (!userId || !wordIds || !Array.isArray(wordIds)) {
        return res.status(400).json({ error: 'userId and wordIds array are required' })
      }

      await this.service.markSessionComplete(userId, wordIds)
      res.json({ success: true })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Failed to mark session complete' })
    }
  }
}
