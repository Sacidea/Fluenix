import { describe, it, expect, vi } from 'vitest';
import { UserController } from './user.controller';
import { IUserService } from '../interfaces/IUserService';

describe('UserController', () => {
  it('should initialize and call getUser', async () => {
    const mockService: IUserService = {
      getUser: vi.fn().mockResolvedValue({ id: '1', email: 'test@test.com' }),
      syncUserWithLevel: vi.fn(),
      setLevel: vi.fn(),
    };
    
    const controller = new UserController(mockService);
    
    const req = { params: { userId: '1' } } as any;
    const res = { json: vi.fn(), status: vi.fn().mockReturnThis() } as any;

    await controller.getUser(req, res);
    
    expect(mockService.getUser).toHaveBeenCalledWith('1');
    expect(res.json).toHaveBeenCalledWith({ id: '1', email: 'test@test.com' });
  });

  it('should return 400 if email is missing on updateLevel', async () => {
    const mockService: IUserService = {
      getUser: vi.fn(),
      syncUserWithLevel: vi.fn(),
      setLevel: vi.fn(),
    };
    
    const controller = new UserController(mockService);
    
    const req = { params: { userId: '1' }, body: { level: 'B2' } } as any;
    const res = { json: vi.fn(), status: vi.fn().mockReturnThis() } as any;

    await controller.updateLevel(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Email is required for syncing user' });
  });
});
