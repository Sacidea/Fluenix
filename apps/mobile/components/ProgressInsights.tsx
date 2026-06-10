import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActivityHeatmap } from './ActivityHeatmap';
import { CompetencyRadar } from './CompetencyRadar';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, shadow } from '../utils/theme';

import { Session } from './SessionItem';

export function ProgressInsights({ sessions }: { sessions: Session[] }) {
  const scored = sessions.filter(s => typeof s.score === 'number');
  const weeklyTarget = 5;
  
  // Very simplified trend & weekly calculation for mobile
  const now = new Date();
  const thisWeekStart = new Date(now);
  thisWeekStart.setDate(now.getDate() - 7);
  
  const currentWeek = scored.filter(s => new Date(s.createdAt) >= thisWeekStart);
  const weeklyProgress = Math.min((currentWeek.length / weeklyTarget) * 100, 100);

  return (
    <View style={styles.wrapper}>
      {/* Visualizations */}
      <CompetencyRadar sessions={sessions} />
      <ActivityHeatmap sessions={sessions} />

      {/* Goal Card */}
      <View style={styles.goalCard}>
        <View style={styles.goalHeader}>
          <Text style={styles.goalTitle}>Weekly Goal</Text>
          <Text style={styles.goalCount}>{currentWeek.length}/{weeklyTarget} sessions</Text>
        </View>
        <View style={styles.progressBarBg}>
          <LinearGradient
            colors={['#FFC107', '#F43F5E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: `${weeklyProgress}%`, height: '100%', borderRadius: 9999 }}
          />
        </View>
        <Text style={styles.goalMessage}>
          {currentWeek.length >= weeklyTarget
            ? 'Target achieved. Keep momentum with deeper scenario practice.'
            : `Complete ${weeklyTarget - currentWeek.length} more session(s) this week to hit your cadence target.`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 32,
  },
  goalCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.slate200,
    ...shadow.sm,
    marginTop: 16,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  goalTitle: {
    fontWeight: '700',
    color: colors.slate800,
  },
  goalCount: {
    fontWeight: '700',
    fontSize: 10,
    color: colors.slate400,
  },
  progressBarBg: {
    width: '100%',
    height: 10,
    backgroundColor: colors.slate100,
    borderRadius: 9999,
    overflow: 'hidden',
    marginBottom: 12,
  },
  goalMessage: {
    fontSize: 12,
    color: colors.slate500,
    lineHeight: 20,
  },
});
