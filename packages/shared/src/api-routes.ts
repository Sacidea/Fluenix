// ─────────────────────────────────────────────────────────
// Backend API Routes (via apiClient)
// ─────────────────────────────────────────────────────────

export const API_ROUTES = {
  // Sessions
  SESSIONS: '/api/sessions',

  // Pronunciation
  PRONUNCIATION_WORDS: '/api/pronunciation/words',
  PRONUNCIATION_GENERATE: '/api/pronunciation/generate',
  PRONUNCIATION_MASTER: '/api/pronunciation/master',

  // Scenario
  SCENARIO_NEXT: '/api/scenario/next',
  SCENARIO_COMPLETE: '/api/scenario/complete',

  // Behavioral
  BEHAVIORAL_NEXT: '/api/behavioral/next',

  // Vocabulary
  VOCABULARY_SESSION: '/api/vocabulary/session',
  VOCABULARY_COMPLETE: '/api/vocabulary/complete',

  // Listening
  LISTENING_NEXT: '/api/listening/next',

  // Writing
  WRITING_NEXT: '/api/writing/next',
} as const;

// ─────────────────────────────────────────────────────────
// AI Service Routes (via aiClient)
// ─────────────────────────────────────────────────────────

export const AI_ROUTES = {
  PRONUNCIATION_ANALYZE: '/pronunciation/analyze',
  SCENARIO_CHAT: '/scenario/chat',
  SCENARIO_ANALYZE: '/scenario/analyze',
  BEHAVIORAL_ANALYZE: '/behavioral/analyze',
  WRITING_ANALYZE: '/writing/analyze',
} as const;

// ─────────────────────────────────────────────────────────
// Derived types for type-safe route access
// ─────────────────────────────────────────────────────────

export type ApiRoute = (typeof API_ROUTES)[keyof typeof API_ROUTES];
export type AiRoute = (typeof AI_ROUTES)[keyof typeof AI_ROUTES];
