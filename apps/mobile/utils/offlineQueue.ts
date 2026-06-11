import * as FileSystem from 'expo-file-system';
import type { AxiosInstance } from 'axios';

const QUEUE_PATH = ((FileSystem as any).documentDirectory ?? '') + 'offline_queue.json';

export interface QueuedAction {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  data?: unknown;
  createdAt: number;
}

/** Generate a simple unique-enough ID (no crypto needed for queue IDs). */
function uid(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

async function readQueue(): Promise<QueuedAction[]> {
  try {
    const info = await FileSystem.getInfoAsync(QUEUE_PATH);
    if (!info.exists) return [];
    const raw = await FileSystem.readAsStringAsync(QUEUE_PATH, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    return JSON.parse(raw) as QueuedAction[];
  } catch {
    return [];
  }
}

async function writeQueue(queue: QueuedAction[]): Promise<void> {
  await FileSystem.writeAsStringAsync(
    QUEUE_PATH,
    JSON.stringify(queue),
    { encoding: FileSystem.EncodingType.UTF8 }
  );
}

export const offlineQueue = {
  /**
   * Add an action to the offline queue.
   *
   * @example
   *   offlineQueue.add({ method: 'POST', url: '/words/answer', data: { wordId, correct: true } });
   */
  async add(payload: Omit<QueuedAction, 'id' | 'createdAt'>): Promise<void> {
    const queue = await readQueue();
    queue.push({
      ...payload,
      id: uid(),
      createdAt: Date.now(),
    });
    await writeQueue(queue);
  },

  /** Return all currently queued actions. */
  async getAll(): Promise<QueuedAction[]> {
    return readQueue();
  },

  /**
   * Attempt to flush every queued action through the provided Axios client.
   * Successfully sent items are removed; failed items remain in the queue.
   *
   * @returns counts of synced vs failed items
   */
  async flush(
    client: AxiosInstance,
    token: string
  ): Promise<{ synced: number; failed: number }> {
    const queue = await readQueue();
    if (queue.length === 0) return { synced: 0, failed: 0 };

    const headers = { Authorization: `Bearer ${token}` };
    const remaining: QueuedAction[] = [];
    let synced = 0;

    for (const action of queue) {
      try {
        await client.request({
          method: action.method,
          url: action.url,
          data: action.data,
          headers,
        });
        synced++;
      } catch {
        remaining.push(action);
      }
    }

    await writeQueue(remaining);
    return { synced, failed: remaining.length };
  },

  /** Remove all queued actions. */
  async clear(): Promise<void> {
    try {
      await FileSystem.deleteAsync(QUEUE_PATH, { idempotent: true });
    } catch {
      // Ignore
    }
  },

  /** Return the number of pending actions. */
  async count(): Promise<number> {
    const queue = await readQueue();
    return queue.length;
  },
};
