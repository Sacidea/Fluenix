import { BaseRepository } from './base.repository'
import { Prisma, RoleplayMission, UserSeenRoleplay } from '@prisma/client'
import { IScenarioRepository } from '../interfaces/IScenarioRepository'
import prisma from '../config/prisma'

export class ScenarioRepository
  extends BaseRepository<RoleplayMission>
  implements IScenarioRepository
{
  constructor() {
    super(prisma, 'roleplayMission')
  }

  async getMissions(): Promise<RoleplayMission[]> {
    return this.prisma.roleplayMission.findMany()
  }

  async createMission(data: Prisma.RoleplayMissionCreateInput): Promise<RoleplayMission> {
    return this.prisma.roleplayMission.create({ data })
  }

  async getUserSeenMissions(userId: string): Promise<UserSeenRoleplay[]> {
    return this.prisma.userSeenRoleplay.findMany({
      where: { userId }
    })
  }

  async markMissionAsSeen(userId: string, missionId: string): Promise<void> {
    await this.prisma.userSeenRoleplay.upsert({
      where: {
        userId_missionId: {
          userId,
          missionId
        }
      },
      update: {},
      create: {
        userId,
        missionId
      }
    })
  }

  async getUnseenMissions(userId: string, category: string, level?: string): Promise<RoleplayMission[]> {
    const where: any = {
      category,
      seenBy: {
        none: { userId }
      }
    }
    if (level) {
      where.level = level
    }
    return this.prisma.roleplayMission.findMany({ where })
  }

  async getMissionsByCategoryAndLevel(category: string, level: string): Promise<RoleplayMission[]> {
    return this.prisma.roleplayMission.findMany({
      where: { category, level }
    })
  }

  async getMissionsByCategory(category: string): Promise<RoleplayMission[]> {
    return this.prisma.roleplayMission.findMany({
      where: { category }
    })
  }
}
