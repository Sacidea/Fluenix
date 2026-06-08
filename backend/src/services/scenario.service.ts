import { IScenarioRepository } from '../interfaces/IScenarioRepository'
import { IScenarioService } from '../interfaces/IScenarioService'
import { DEFAULT_SCENARIO_MISSIONS } from '../seeders/scenario.seeder'
import { RoleplayMission } from '@prisma/client'

export class ScenarioService implements IScenarioService {
  constructor(private repo: IScenarioRepository) {}

  private async seedMissionsIfEmpty(): Promise<void> {
    const missions = await this.repo.getMissions()
    
    if (missions.length < DEFAULT_SCENARIO_MISSIONS.length) {
      const existing = new Set(missions.map(m => m.content))
      const missing = DEFAULT_SCENARIO_MISSIONS.filter(m => !existing.has(m.content))
      
      for (const m of missing) {
        await this.repo.createMission(m)
      }
    }
  }

  async getNextMission(userId: string | null, category: string, level: string): Promise<RoleplayMission | null> {
    await this.seedMissionsIfEmpty()
    
    // For anonymous users, just return a random mission in that category
    if (!userId) {
      const targetMissions = await this.repo.getMissionsByCategory(category)
      if (targetMissions.length === 0) return null
      return this.getRandomMission(targetMissions)
    }

    // First try unseen + matching level
    let candidates = await this.repo.getUnseenMissions(userId, category, level)
    
    // If none, fallback to unseen regardless of level
    if (candidates.length === 0) {
      candidates = await this.repo.getUnseenMissions(userId, category)
    }

    // If still none, all have been seen. Reset progress implicitly by picking any matching level.
    if (candidates.length === 0) {
      candidates = await this.repo.getMissionsByCategoryAndLevel(category, level)
    }
    
    // Ultimate fallback
    if (candidates.length === 0) {
      candidates = await this.repo.getMissionsByCategory(category)
    }

    if (candidates.length === 0) return null

    return this.getRandomMission(candidates)
  }

  async markMissionComplete(userId: string, missionId: string): Promise<void> {
    if (!userId || !missionId) return
    await this.repo.markMissionAsSeen(userId, missionId)
  }

  private getRandomMission(missions: RoleplayMission[]): RoleplayMission {
    return missions[Math.floor(Math.random() * missions.length)]
  }
}
