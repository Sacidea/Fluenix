import { Request, Response } from 'express'
import { IScenarioService } from '../interfaces/IScenarioService'
import { z } from 'zod'

const GetNextMissionSchema = z.object({
  category: z.string({ required_error: 'category is required' }),
  level: z.string().optional().default('B2')
})

const MarkMissionCompleteSchema = z.object({
  missionId: z.string({ required_error: 'missionId is required' })
})

export class ScenarioController {
  constructor(private service: IScenarioService) {}

  public getNextMission = async (req: Request, res: Response) => {
    try {
      // userId comes from verified JWT — not from client body
      const userId = (req as any).auth?.userId || null
      const parsed = GetNextMissionSchema.safeParse(req.body)
      if (!parsed.success) {
        return res.status(400).json({ success: false, error: parsed.error.errors[0].message })
      }
      const { category, level } = parsed.data

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
      const parsed = MarkMissionCompleteSchema.safeParse(req.body)
      if (!parsed.success) {
        return res.status(400).json({ success: false, error: parsed.error.errors[0].message })
      }
      const { missionId } = parsed.data

      if (!userId) {
        return res.status(401).json({ success: false, error: 'Unauthorized' })
      }

      await this.service.markMissionComplete(userId, missionId)
      res.json({ success: true })
    } catch (err) {
      console.error(err)
      res.status(500).json({ success: false, error: 'Failed to mark mission complete' })
    }
  }
}
