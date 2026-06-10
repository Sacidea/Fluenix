import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, shadow } from '../utils/theme';

const dayKey = (d: Date) => d.toISOString().slice(0, 10);

import { Session } from './SessionItem';

function generateHeatmapData(sessions: Session[]) {
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - 30);

  const countMap = new Map<string, number>();
  sessions.forEach(s => {
    const key = dayKey(new Date(s.createdAt));
    countMap.set(key, (countMap.get(key) || 0) + 1);
  });

  const cols = [];
  let currentWeek = [];
  for (let i = 0; i <= 30; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const count = countMap.get(dayKey(d)) || 0;
    
    currentWeek.push({ date: d, count });
    if (currentWeek.length === 7 || i === 30) {
      cols.push(currentWeek);
      currentWeek = [];
    }
  }

  return cols;
}

export function ActivityHeatmap({ sessions }: { sessions: Session[] }) {
  const cols = generateHeatmapData(sessions);

  const getColor = (count: number) => {
    if (count === 0) return '#f1f5f9';
    if (count === 1) return '#c7d2fe';
    if (count === 2) return '#818cf8';
    if (count === 3) return '#4f46e5';
    return '#312e81';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity Heatmap</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.gridRow}>
          {cols.map((col, colIdx) => (
            <View key={colIdx} style={styles.gridCol}>
              {col.map((cell, rowIdx) => (
                <View 
                  key={rowIdx} 
                  style={[styles.cell, { backgroundColor: getColor(cell.count) }]}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.legendRow}>
        <Text style={styles.legendLabel}>Less</Text>
        <View style={styles.legendSwatches}>
          <View style={[styles.legendSwatch, { backgroundColor: getColor(0) }]} />
          <View style={[styles.legendSwatch, { backgroundColor: getColor(1) }]} />
          <View style={[styles.legendSwatch, { backgroundColor: getColor(2) }]} />
          <View style={[styles.legendSwatch, { backgroundColor: getColor(3) }]} />
          <View style={[styles.legendSwatch, { backgroundColor: getColor(4) }]} />
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
  title: {
    fontWeight: '700',
    color: colors.slate800,
    marginBottom: 16,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 4,
  },
  gridCol: {
    flexDirection: 'column',
    gap: 4,
  },
  cell: {
    width: 16,
    height: 16,
    borderRadius: 2,
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
    gap: 4,
  },
  legendSwatch: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
});
