import { describe, it, expect, vi } from 'vitest';
import { SessionController } from './session.controller';
import { ISessionService } from '../interfaces/ISessionService';

describe('SessionController', () => {
  it('should be defined', () => {
    const mockService: ISessionService = {
      createSession: vi.fn(),
      getUserSessions: vi.fn(),
      getUserStats: vi.fn(),
      deleteSession: vi.fn(),
    };
    
    const controller = new SessionController(mockService);
    expect(controller).toBeDefined();
  });
});
