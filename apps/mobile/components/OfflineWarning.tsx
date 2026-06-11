import React, { useEffect, useState } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Icons from 'lucide-react-native';
import { colors, shadow } from '../utils/theme';
import { useSyncManager } from '../hooks/useSyncManager';

function formatSyncTime(date: Date | null): string {
  if (!date) return '';
  const now = Date.now();
  const diffSec = Math.floor((now - date.getTime()) / 1000);
  if (diffSec < 60) return 'just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  return `${diffHr}h ago`;
}

export function OfflineWarning() {
  const { isOnline, pendingCount, lastSyncTime, isSyncing, syncNow } = useSyncManager();
  const [animation] = useState(new Animated.Value(0));

  const showBanner = !isOnline || pendingCount > 0;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: showBanner ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showBanner]);

  if (!showBanner) return null;

  const bannerColor = isOnline ? colors.amber500 : colors.rose500;
  const syncTimeLabel = formatSyncTime(lastSyncTime);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [-60, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={[styles.banner, { backgroundColor: bannerColor }]}>
        <View style={styles.content}>
          {/* Status icon + message */}
          <View style={styles.row}>
            {isOnline ? (
              <Icons.RefreshCw size={14} color="white" />
            ) : (
              <Icons.WifiOff size={14} color="white" />
            )}
            <Text style={styles.bannerText}>
              {isOnline
                ? `${pendingCount} pending change${pendingCount !== 1 ? 's' : ''} to sync`
                : 'No Internet Connection'}
            </Text>
          </View>

          {/* Meta row: pending count + last sync */}
          <View style={styles.metaRow}>
            {!isOnline && pendingCount > 0 && (
              <Text style={styles.metaText}>
                {pendingCount} queued
              </Text>
            )}
            {syncTimeLabel !== '' && (
              <Text style={styles.metaText}>
                Last sync: {syncTimeLabel}
              </Text>
            )}
          </View>
        </View>

        {/* Sync button (only when online with pending items) */}
        {isOnline && pendingCount > 0 && (
          <TouchableOpacity
            onPress={syncNow}
            disabled={isSyncing}
            style={styles.syncButton}
            activeOpacity={0.7}
          >
            {isSyncing ? (
              <ActivityIndicator size="small" color={bannerColor} />
            ) : (
              <Text style={[styles.syncButtonText, { color: bannerColor }]}>
                Sync Now
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 48,
    paddingBottom: 10,
    paddingHorizontal: 16,
    ...shadow.md,
    zIndex: 50,
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bannerText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 12,
    marginLeft: 8,
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: 2,
    marginLeft: 22,
    gap: 12,
  },
  metaText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
    fontWeight: '500',
  },
  syncButton: {
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    minWidth: 70,
    alignItems: 'center',
  },
  syncButtonText: {
    fontWeight: '700',
    fontSize: 11,
  },
});
