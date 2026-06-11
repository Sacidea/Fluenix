import type { SessionPayload } from './types-extended';

/**
 * Parse AI JSON responses that may be wrapped in markdown code fences.
 * Handles the common pattern: ```json\n{...}\n```
 *
 * Used in 6+ files across web and mobile apps.
 */
export function parseAIResponse<T>(raw: string): T {
  const cleaned = raw
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();
  return JSON.parse(cleaned) as T;
}

/**
 * Create a session payload object for saving to the backend.
 */
export function createSessionPayload(params: {
  userId: string;
  type: string;
  scenario: string;
  duration: number;
  score: number;
  feedback?: unknown;
}): SessionPayload {
  return {
    userId: params.userId,
    type: params.type,
    scenario: params.scenario,
    duration: params.duration,
    score: params.score,
    ...(params.feedback !== undefined && { feedback: params.feedback }),
  };
}

/**
 * Return a page-slice of items.
 * Pages are 1-indexed.
 */
export function paginateItems<T>(
  items: T[],
  page: number,
  pageSize: number,
): T[] {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

/**
 * Calculate total number of pages for a given total item count and page size.
 * Always returns at least 1.
 */
export function calculateTotalPages(
  totalItems: number,
  pageSize: number,
): number {
  return Math.ceil(totalItems / pageSize) || 1;
}

/**
 * Format a duration in seconds to "MM:SS" string.
 * Used in scenario session timers.
 */
export function formatDuration(seconds: number): string {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
}
