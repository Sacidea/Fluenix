/**
 * Geçerli CEFR ve başlangıç seviyeleri.
 * Yeni seviye eklemek için sadece bu dosyayı değiştirmek yeterli —
 * UserService veya başka sınıflara dokunmaya gerek yok (OCP).
 */
export const VALID_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'beginner'] as const

export type Level = typeof VALID_LEVELS[number]

export function isValidLevel(level: string): level is Level {
  return (VALID_LEVELS as readonly string[]).includes(level)
}
