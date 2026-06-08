import { describe, it, expect, vi } from 'vitest';
import { VocabularyController } from './vocabulary.controller';
import { IVocabularyService } from '../interfaces/IVocabularyService';

describe('VocabularyController', () => {
  it('should fetch session words', async () => {
    const mockService: IVocabularyService = {
      getSessionWords: vi.fn().mockResolvedValue([{ id: '1', word: 'apple' }]),
      markSessionComplete: vi.fn(),
    };
    
    const controller = new VocabularyController(mockService);
    
    const req = { auth: { userId: 'user1' }, query: { count: '5' } } as any;
    const res = { json: vi.fn(), status: vi.fn().mockReturnThis() } as any;

    await controller.getSessionWords(req, res);
    
    expect(mockService.getSessionWords).toHaveBeenCalledWith('user1', 5);
    expect(res.json).toHaveBeenCalledWith([{ id: '1', word: 'apple' }]);
  });

  it('should require wordIds array for markSessionComplete', async () => {
    const mockService: IVocabularyService = {
      getSessionWords: vi.fn(),
      markSessionComplete: vi.fn(),
    };
    
    const controller = new VocabularyController(mockService);
    
    const req = { auth: { userId: 'user1' }, body: {} } as any;
    const res = { json: vi.fn(), status: vi.fn().mockReturnThis() } as any;

    await controller.markSessionComplete(req, res);
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'userId and wordIds array are required' });
  });
});
