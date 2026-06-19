import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';

const CACHE_DIR = Platform.OS === 'web' ? '' : (((FileSystem as any).documentDirectory ?? '') + 'cache/');

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttlMinutes: number | null;
}

async function ensureCacheDir(): Promise<void> {
  if (Platform.OS === 'web') return;
  const dirInfo = await FileSystem.getInfoAsync(CACHE_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(CACHE_DIR, { intermediates: true });
  }
}

function keyToPath(key: string): string {
  // Sanitize key to be filesystem-safe
  const safeKey = key.replace(/[^a-zA-Z0-9_-]/g, '_');
  return CACHE_DIR + safeKey + '.json';
}

export const offlineStorage = {
  /**
   * Store data with an optional TTL (time-to-live) in minutes.
   * If ttlMinutes is omitted or null, the entry never expires.
   */
  async set(key: string, data: unknown, ttlMinutes?: number): Promise<void> {
    if (Platform.OS === 'web') return;
    await ensureCacheDir();

    const entry: CacheEntry<unknown> = {
      data,
      timestamp: Date.now(),
      ttlMinutes: ttlMinutes ?? null,
    };

    await FileSystem.writeAsStringAsync(
      keyToPath(key),
      JSON.stringify(entry),
      { encoding: FileSystem.EncodingType.UTF8 }
    );
  },

  /**
   * Retrieve cached data by key. Returns null if not found or expired.
   */
  async get<T>(key: string): Promise<T | null> {
    if (Platform.OS === 'web') return null;
    try {
      const path = keyToPath(key);
      const info = await FileSystem.getInfoAsync(path);
      if (!info.exists) return null;

      const raw = await FileSystem.readAsStringAsync(path, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      const entry: CacheEntry<T> = JSON.parse(raw);

      // Check TTL
      if (entry.ttlMinutes !== null) {
        const ageMs = Date.now() - entry.timestamp;
        const ttlMs = entry.ttlMinutes * 60 * 1000;
        if (ageMs > ttlMs) {
          // Expired — clean up in background
          FileSystem.deleteAsync(path, { idempotent: true }).catch(() => {});
          return null;
        }
      }

      return entry.data;
    } catch {
      return null;
    }
  },

  /**
   * Remove a single cached entry.
   */
  async remove(key: string): Promise<void> {
    if (Platform.OS === 'web') return;
    try {
      await FileSystem.deleteAsync(keyToPath(key), { idempotent: true });
    } catch {
      // Ignore — file may not exist
    }
  },

  /**
   * Clear all cached data.
   */
  async clear(): Promise<void> {
    if (Platform.OS === 'web') return;
    try {
      await FileSystem.deleteAsync(CACHE_DIR, { idempotent: true });
    } catch {
      // Ignore
    }
  },

  // ── Convenience methods ──────────────────────────────────────────────

  /** Cache the daily/session words (TTL: 60 min) */
  async cacheWords(words: unknown[]): Promise<void> {
    await this.set('session_words', words, 60);
  },

  async getCachedWords(): Promise<unknown[] | null> {
    return this.get<unknown[]>('session_words');
  },

  /** Cache user stats (TTL: 30 min) */
  async cacheStats(stats: unknown): Promise<void> {
    await this.set('user_stats', stats, 30);
  },

  async getCachedStats(): Promise<unknown | null> {
    return this.get('user_stats');
  },

  /** Cache full vocabulary list (TTL: 120 min) */
  async cacheVocabulary(words: unknown[]): Promise<void> {
    await this.set('vocabulary', words, 120);
  },

  async getCachedVocabulary(): Promise<unknown[] | null> {
    return this.get<unknown[]>('vocabulary');
  },
};
