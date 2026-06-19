import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
  const totalSessions = safeStats.totalSessions || 0;
  const xp = totalSessions * 100;
  const level = Math.floor(xp / 500) + 1;
  const nextLevelXp = level * 500;
  const currentLevelXp = (level - 1) * 500;
  const progressPercent = ((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;

  const config = [
    { icon: Icons.Layers, value: String(totalSessions), label: 'Operational Sessions', color: '#3B82F6', bg: '#eff6ff' },
    { icon: Icons.Target, value: safeStats.averageScore ? `${Math.round(safeStats.averageScore)}%` : '—', label: 'Technical Accuracy', color: '#22C55E', bg: '#f0fdf4' },
    { icon: Icons.Flame, value: String(safeStats.streak || 0), label: 'Consistency Streak', color: '#FFC107', bg: '#fffbeb' },
    { icon: Icons.Activity, value: safeStats.lastSession ? new Date(safeStats.lastSession).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }) : '—', label: 'Last Activity', color: '#F43F5E', bg: '#fff1f2' },
  ];

  return (
    <View style={styles.root}>
      {/* Gamification Banner */}
      <LinearGradient
        colors={['#0f172a', '#1e293b']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.banner}
      >
        <View style={styles.bannerLeft}>
          <LinearGradient
            colors={['#4338ca', '#6366f1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.levelBadge}
          >
            <Text style={styles.levelText}>LVL {level}</Text>
          </LinearGradient>
          <View>
            <Text style={styles.bannerTitle}>Engineering Proficiency</Text>
            <Text style={styles.bannerSub}>{xp} XP / {nextLevelXp} XP to Level {level + 1}</Text>
          </View>
        </View>
        <View style={styles.xpTrack}>
          <LinearGradient
            colors={['#38bdf8', '#818cf8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.xpFill, { width: `${progressPercent}%` }]}
          />
        </View>
      </LinearGradient>

      {/* Stats Grid */}
      <View style={styles.grid}>
        {config.map((s) => {
          const Icon = s.icon;
          return (
            <View key={s.label} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={[styles.iconCircle, { backgroundColor: s.bg }]}>
                  <Icon size={16} color={s.color} />
                </View>
                <Text style={styles.cardLabel}>{s.label}</Text>
              </View>
              <Text style={[styles.cardValue, { color: s.color }]}>{s.value}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginBottom: 32,
  },
  banner: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...shadow.md,
  },
  bannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  levelBadge: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelText: {
    fontWeight: '800',
    fontSize: 13,
    color: '#ffffff',
    fontFamily: 'monospace',
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  bannerSub: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  xpTrack: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    borderRadius: 9999,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
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
    gap: 10,
    marginBottom: 12,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    flex: 1,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
});
