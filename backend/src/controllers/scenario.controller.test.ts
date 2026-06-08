import { describe, it, expect, vi } from 'vitest';
import { ScenarioController } from './scenario.controller';
import { IScenarioService } from '../interfaces/IScenarioService';

describe('ScenarioController', () => {
  it('should require category for getNextMission', async () => {
    const mockService: IScenarioService = {
      getNextMission: vi.fn(),
      markMissionComplete: vi.fn(),
    };
    
    const controller = new ScenarioController(mockService);
    
    const req = { auth: { userId: '1' }, body: {} } as any;
    const res = { json: vi.fn(), status: vi.fn().mockReturnThis() } as any;

    await controller.getNextMission(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ success: false, error: 'category is required' });
  });

  it('should mark mission complete', async () => {
    const mockService: IScenarioService = {
      getNextMission: vi.fn(),
      markMissionComplete: vi.fn().mockResolvedValue(true),
    };
    
    const controller = new ScenarioController(mockService);
    
    const req = { auth: { userId: '1' }, body: { missionId: 'm1' } } as any;
    const res = { json: vi.fn(), status: vi.fn().mockReturnThis() } as any;

    await controller.markMissionComplete(req, res);
    
    expect(mockService.markMissionComplete).toHaveBeenCalledWith('1', 'm1');
    expect(res.json).toHaveBeenCalledWith({ success: true });
  });
});
