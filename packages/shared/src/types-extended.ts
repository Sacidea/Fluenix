// ─────────────────────────────────────────────────────────
// Pronunciation
// ─────────────────────────────────────────────────────────

export type Word = {
  id: string;
  word: string;
  category: string;
  phonetic: string;
};

export type PronunciationResult = {
  accuracy_score: number;
  is_correct: boolean;
  feedback: string;
  tip: string;
};

// ─────────────────────────────────────────────────────────
// Listening
// ─────────────────────────────────────────────────────────

export interface ListeningScenario {
  id: string;
  level: string;
  title: string;
  context: string;
  dialogue: unknown[];
  questions: unknown[];
  dictation: unknown;
  shadowing: unknown;
}

// ─────────────────────────────────────────────────────────
// Behavioral
// ─────────────────────────────────────────────────────────

export interface BehavioralQuestion {
  id: string;
  category: string;
  context: string;
  question: string;
}

export type StarFeedback = {
  overall_score: number;
  leadership_alignment: number;
  english_quality: number;
  strengths: string[];
  improvements: string[];
  detailed_analysis: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
};

// ─────────────────────────────────────────────────────────
// Vocabulary
// ─────────────────────────────────────────────────────────

export type VocabWord = {
  id: string;
  word: string;
  difficulty: string;
  type: string;
  definition: string;
  phonetic: string;
  turkishMeaning: string;
  contextSentence: string;
};

// ─────────────────────────────────────────────────────────
// Scenario Analysis
// ─────────────────────────────────────────────────────────

export type ScenarioAnalysisResult = {
  overall_score: number;
  fluency_score: number;
  vocabulary_score: number;
  technical_accuracy: number;
  strengths: string[];
  improvements: string[];
  overall_feedback: string;
};

// ─────────────────────────────────────────────────────────
// Dashboard
// ─────────────────────────────────────────────────────────

export type DashboardStats = {
  totalSessions: number;
  averageScore: number;
  streak: number;
  lastSession: unknown | null;
};

// ─────────────────────────────────────────────────────────
// Session
// ─────────────────────────────────────────────────────────

export type SessionPayload = {
  userId: string;
  type: string;
  scenario: string;
  duration: number;
  score: number;
  feedback?: unknown;
};
