import { Prisma, RoleplayMission, UserSeenRoleplay } from '@prisma/client'

export interface IScenarioRepository {
  getMissions(): Promise<RoleplayMission[]>
  createMission(data: Prisma.RoleplayMissionCreateInput): Promise<RoleplayMission>
  getUserSeenMissions(userId: string): Promise<UserSeenRoleplay[]>
  markMissionAsSeen(userId: string, missionId: string): Promise<void>
  
  getUnseenMissions(userId: string, category: string, level?: string): Promise<RoleplayMission[]>
  getMissionsByCategoryAndLevel(category: string, level: string): Promise<RoleplayMission[]>
  getMissionsByCategory(category: string): Promise<RoleplayMission[]>
}
