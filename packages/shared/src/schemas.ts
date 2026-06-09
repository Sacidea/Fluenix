import { z } from 'zod';

// Shared Enums / Literals
export const ScenarioTypeSchema = z.enum(['interview', 'standup', 'code_review']);

// Models
export const ScenarioMissionSchema = z.object({
  id: z.string(),
  category: z.string(),
  level: z.string(),
  content: z.string(),
});

export const ListeningScenarioSchema = z.object({
  id: z.string(),
  level: z.string(),
  title: z.string(),
  context: z.string(),
  dialogue: z.array(z.any()), // Can be typed stricter if needed
  questions: z.array(z.any()),
  dictation: z.any(),
  shadowing: z.any(),
});

// Infer types
export type ZodScenarioType = z.infer<typeof ScenarioTypeSchema>;
export type ZodScenarioMission = z.infer<typeof ScenarioMissionSchema>;
export type ZodListeningScenario = z.infer<typeof ListeningScenarioSchema>;
