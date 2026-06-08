import { Request, Response } from 'express'
import { IScenarioService } from '../interfaces/IScenarioService'

export class ScenarioController {
  constructor(private service: IScenarioService) {}

  public getNextMission = async (req: Request, res: Response) => {
    try {
      // userId comes from verified JWT — not from client body
      const userId = (req as any).auth?.userId || null
      const { category, level } = req.body

      if (!category) {
        return res.status(400).json({ success: false, error: 'category is required' })
      }

      const mission = await this.service.getNextMission(userId, category, level || 'B2')
      
      if (!mission) {
        return res.status(404).json({ success: false, error: 'No mission found' })
      }

      res.json({ success: true, data: mission })
    } catch (err) {
      console.error(err)
      res.status(500).json({ success: false, error: 'Failed to fetch next scenario mission' })
    }
  }

  public markMissionComplete = async (req: Request, res: Response) => {
    try {
      // userId comes from verified JWT — ignore client-supplied userId
      const userId = (req as any).auth?.userId
      const { missionId } = req.body

      if (!userId || !missionId) {
        return res.status(400).json({ success: false, error: 'userId and missionId are required' })
      }

      await this.service.markMissionComplete(userId, missionId)
      res.json({ success: true })
    } catch (err) {
      console.error(err)
      res.status(500).json({ success: false, error: 'Failed to mark mission complete' })
    }
  }
}
