import { RoleplayMission } from '@prisma/client'

export interface IScenarioService {
  getNextMission(userId: string | null, category: string, level: string): Promise<RoleplayMission | null>
  markMissionComplete(userId: string, missionId: string): Promise<void>
}
