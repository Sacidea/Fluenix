import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';
import { colors, shadow } from '../utils/theme';

import { Session } from './SessionItem';

// Use local timezone like web (not UTC)
const getLocalYMD = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

// Calculate streak from sessions
const getStreak = (sessions: Session[]) => {
  const days = new Set(sessions.map(s => getLocalYMD(new Date(s.createdAt))));
  let streak = 0;
  const d = new Date();
  while (days.has(getLocalYMD(d))) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
};

function generateHeatmapData(sessions: Session[]) {
  const now = new Date();
  // Match web: 5 weeks (~35 days), aligned to start on Sunday
  const start = new Date(now);
  start.setDate(now.getDate() - (5 * 7 - 1) - now.getDay());

  const totalDays = Math.ceil((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  const countMap = new Map<string, number>();
  sessions.forEach(s => {
    const key = getLocalYMD(new Date(s.createdAt));
    countMap.set(key, (countMap.get(key) || 0) + 1);
  });

  const cols = [];
  let currentWeek: { date: Date; count: number; isFuture: boolean }[] = [];
  for (let i = 0; i < totalDays; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const isFuture = d > now;
    const count = isFuture ? 0 : (countMap.get(getLocalYMD(d)) || 0);
    
    currentWeek.push({ date: d, count, isFuture });
    if (currentWeek.length === 7) {
      cols.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) {
    cols.push(currentWeek);
  }

  return cols;
}

export function ActivityHeatmap({ sessions }: { sessions: Session[] }) {
  const cols = generateHeatmapData(sessions);
  const streak = getStreak(sessions);

  const getColor = (count: number, isFuture: boolean) => {
    if (isFuture) return 'transparent';
    if (count === 0) return '#f1f5f9';
    if (count === 1) return '#c7d2fe';
    if (count === 2) return '#818cf8';
    return '#4f46e5'; // 3+ matches web (no extra dark level)
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Activity Heatmap</Text>
        <View style={styles.streakBadge}>
          <Icons.Flame size={12} color="#d97706" />
          <Text style={styles.streakText}>Consistency Streak: {streak}</Text>
        </View>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.gridRow}>
          {cols.map((col, colIdx) => (
            <View key={colIdx} style={styles.gridCol}>
              {col.map((cell, rowIdx) => (
                <View 
                  key={rowIdx} 
                  style={[
                    styles.cell, 
                    { backgroundColor: getColor(cell.count, cell.isFuture) },
                    cell.isFuture && styles.futureCell,
                  ]}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.legendRow}>
        <Text style={styles.legendLabel}>Less</Text>
        <View style={styles.legendSwatches}>
          <View style={[styles.legendSwatch, { backgroundColor: '#f1f5f9' }]} />
          <View style={[styles.legendSwatch, { backgroundColor: '#c7d2fe' }]} />
          <View style={[styles.legendSwatch, { backgroundColor: '#818cf8' }]} />
          <View style={[styles.legendSwatch, { backgroundColor: '#4f46e5' }]} />
        </View>
        <Text style={styles.legendLabel}>More</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.slate200,
    ...shadow.sm,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontWeight: '700',
    color: colors.slate800,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fffbeb',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#fef3c7',
  },
  streakText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#92400e',
  },
  gridRow: {
    flexDirection: 'row',
    gap: 3,
  },
  gridCol: {
    flexDirection: 'column',
    gap: 3,
  },
  cell: {
    width: 14,
    height: 14,
    borderRadius: 3,
  },
  futureCell: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  legendLabel: {
    fontSize: 10,
    color: colors.slate400,
    fontWeight: '700',
  },
  legendSwatches: {
    flexDirection: 'row',
    gap: 3,
  },
  legendSwatch: {
    width: 12,
    height: 12,
    borderRadius: 3,
  },
});
