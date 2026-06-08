import { Request, Response } from 'express'
import { ISessionService } from '../interfaces/ISessionService'

export class SessionController {
  constructor(private sessionService: ISessionService) {}

  public createSession = async (req: Request, res: Response) => {
    try {
      const session = await this.sessionService.createSession(req.body)
      res.json(session)
    } catch (err) {
      console.error('createSession error:', err)
      res.status(500).json({ error: 'Failed to create session' })
    }
  }

  public getUserSessions = async (req: Request, res: Response) => {
    try {
      const userId = String(req.params.userId)
      const sessions = await this.sessionService.getUserSessions(userId)
      res.json(sessions)
    } catch (err) {
      console.error('getUserSessions error:', err)
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  public getUserStats = async (req: Request, res: Response) => {
    try {
      const userId = String(req.params.userId)
      const stats = await this.sessionService.getUserStats(userId)
      
      if (req.query.full === 'true') {
        const sessions = await this.sessionService.getUserSessions(userId)
        res.json({ stats, sessions })
        return
      }
      
      res.json(stats)
    } catch (err) {
      console.error('getUserStats error:', err)
      res.status(500).json({ error: 'Internal server error' })
    }
  }

  public deleteSession = async (req: Request, res: Response) => {
    try {
      const sessionId = String(req.params.id)
      const userId = (req as any).auth?.userId
      
      if (!userId) {
        res.status(401).json({ error: 'Unauthorized' })
        return
      }

      const deleted = await this.sessionService.deleteSession(sessionId, userId)
      if (!deleted) {
        res.status(404).json({ error: 'Session not found or not owned by user' })
        return
      }

      res.json({ success: true })
    } catch (err) {
      console.error('deleteSession error:', err)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

