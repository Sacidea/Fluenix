import { useState, useEffect, useCallback, useRef } from 'react';
import * as Network from 'expo-network';
import { offlineQueue } from '../utils/offlineQueue';
import { apiClient } from '../utils/apiClient';
import { useAuth } from '@clerk/clerk-expo';

const POLL_INTERVAL_MS = 5_000;

export function useSyncManager() {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const { getToken } = useAuth();

  // Track previous online state so we can auto-sync on reconnection
  const wasOnlineRef = useRef(true);

  // ── Refresh the pending count ─────────────────────────────────────────
  const refreshCount = useCallback(async () => {
    const count = await offlineQueue.count();
    setPendingCount(count);
  }, []);

  // ── Core sync logic ───────────────────────────────────────────────────
  const syncNow = useCallback(async () => {
    if (isSyncing) return;

    try {
      setIsSyncing(true);
      const token = await getToken();
      if (!token) return;

      const result = await offlineQueue.flush(apiClient, token);
      setLastSyncTime(new Date());
      setPendingCount(result.failed);
    } catch {
      // Silently fail — items stay in queue for next attempt
    } finally {
      setIsSyncing(false);
    }
  }, [isSyncing, getToken]);

  // ── Network polling ───────────────────────────────────────────────────
  useEffect(() => {
    let mounted = true;
    let interval: ReturnType<typeof setInterval>;

    const check = async () => {
      try {
        const state = await Network.getNetworkStateAsync();
        const connected = state.isConnected ?? true;

        if (!mounted) return;
        setIsOnline(connected);

        // Auto-sync when transitioning from offline → online
        if (connected && !wasOnlineRef.current) {
          syncNow();
        }
        wasOnlineRef.current = connected;
      } catch {
        // Ignore
      }
    };

    check();
    interval = setInterval(check, POLL_INTERVAL_MS);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [syncNow]);

  // ── Keep pending count fresh ──────────────────────────────────────────
  useEffect(() => {
    refreshCount();
    const interval = setInterval(refreshCount, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [refreshCount]);

  return {
    /** Whether the device currently has internet connectivity. */
    isOnline,
    /** Number of actions waiting to be synced. */
    pendingCount,
    /** Timestamp of the most recent successful sync, or null. */
    lastSyncTime,
    /** Whether a sync operation is currently in progress. */
    isSyncing,
    /** Manually trigger a sync attempt. */
    syncNow,
  };
}
