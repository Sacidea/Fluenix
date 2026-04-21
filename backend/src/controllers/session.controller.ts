import { Request, Response } from 'express'
import { SessionService } from '../services/session.service'

export class SessionController {
  constructor(private sessionService: SessionService) {}

  public createSession = async (req: Request, res: Response) => {
    try {
      const session = await this.sessionService.createSession(req.body)
      res.json(session)
    } catch (err) {
      console.error('createSession error:', err)
      res.status(500).json({ error: 'Failed to create session', detail: String(err) })
    }
  }

  public getUserSessions = async (req: Request, res: Response) => {
    try {
      const userId = String(req.params.userId)
      const sessions = await this.sessionService.getUserSessions(userId)
      res.json(sessions)
    } catch (err) {
      console.error('getUserSessions error:', err)
      res.status(500).json({ error: 'Failed to get sessions', detail: String(err) })
    }
  }

  public getUserStats = async (req: Request, res: Response) => {
    try {
      const userId = String(req.params.userId)
      const stats = await this.sessionService.getUserStats(userId)
      res.json(stats)
    } catch (err) {
      console.error('getUserStats error:', err)
      res.status(500).json({ error: 'Failed to get stats', detail: String(err) })
    }
  }
}
