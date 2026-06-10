import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';
import { colors, shadow } from '../utils/theme';

export type Stats = {
  totalSessions: number;
  averageScore: number;
  streak: number;
  lastSession?: string | null;
};

interface Props {
  stats: Stats;
}

export function StatsCards({ stats }: Props) {
  const safeStats = stats || {};
  return (
    <View style={styles.grid}>
      {/* Sessions */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconCircle, { backgroundColor: '#eff6ff' }]}>
            <Icons.Layers size={16} color="#3B82F6" />
          </View>
          <Text style={styles.cardLabel}>Sessions</Text>
        </View>
        <Text style={styles.cardValue}>{safeStats.totalSessions || 0}</Text>
      </View>

      {/* Streak */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconCircle, { backgroundColor: '#fff7ed' }]}>
            <Icons.Flame size={16} color="#F97316" />
          </View>
          <Text style={styles.cardLabel}>Streak</Text>
        </View>
        <Text style={styles.cardValue}>{safeStats.streak || 0}</Text>
      </View>

      {/* Avg Score */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconCircle, { backgroundColor: '#f0fdf4' }]}>
            <Icons.Target size={16} color="#22C55E" />
          </View>
          <Text style={styles.cardLabel}>Avg Score</Text>
        </View>
        <Text style={styles.cardValue}>
          {safeStats.averageScore ? `${Math.round(safeStats.averageScore)}%` : '—'}
        </Text>
      </View>

      {/* Last Login */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconCircle, { backgroundColor: colors.primaryBg }]}>
            <Icons.Clock size={16} color="#6366F1" />
          </View>
          <Text style={styles.cardLabel}>Last Login</Text>
        </View>
        <Text style={styles.lastLoginValue}>
          {safeStats.lastSession ? new Date(safeStats.lastSession).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '--'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
    marginBottom: 32,
  },
  card: {
    width: '48%',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate200,
    borderRadius: 16,
    padding: 16,
    ...shadow.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.slate400,
    textTransform: 'uppercase',
    letterSpacing: 4,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.slate800,
  },
  lastLoginValue: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.slate800,
    marginTop: 8,
  },
});
