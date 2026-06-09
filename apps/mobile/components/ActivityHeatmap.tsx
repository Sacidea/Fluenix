import React from 'react';
import { View, Text, ScrollView } from 'react-native';

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
    <View className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm mb-4">
      <Text className="font-bold text-slate-800 mb-4">Activity Heatmap</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-1">
          {cols.map((col, colIdx) => (
            <View key={colIdx} className="flex-col gap-1">
              {col.map((cell, rowIdx) => (
                <View 
                  key={rowIdx} 
                  className="w-4 h-4 rounded-sm"
                  style={{ backgroundColor: getColor(cell.count) }}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
      <View className="flex-row justify-end items-center gap-2 mt-4">
        <Text className="text-[10px] text-slate-400 font-bold">Less</Text>
        <View className="flex-row gap-1">
          <View className="w-3 h-3 rounded-sm" style={{ backgroundColor: getColor(0) }} />
          <View className="w-3 h-3 rounded-sm" style={{ backgroundColor: getColor(1) }} />
          <View className="w-3 h-3 rounded-sm" style={{ backgroundColor: getColor(2) }} />
          <View className="w-3 h-3 rounded-sm" style={{ backgroundColor: getColor(3) }} />
          <View className="w-3 h-3 rounded-sm" style={{ backgroundColor: getColor(4) }} />
        </View>
        <Text className="text-[10px] text-slate-400 font-bold">More</Text>
      </View>
    </View>
  );
}
