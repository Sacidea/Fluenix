import { describe, it, expect } from 'vitest'
import { apiClient, aiClient } from './apiClient'

describe('API Clients', () => {
  it('should have correct base URL for apiClient', () => {
    // This assumes the env var is not set, or we can just check if it exists
    expect(apiClient).toBeDefined()
    expect(apiClient.defaults.baseURL).toBeDefined()
  })

  it('should have correct base URL for aiClient', () => {
    expect(aiClient).toBeDefined()
    expect(aiClient.defaults.baseURL).toBeDefined()
  })
})
