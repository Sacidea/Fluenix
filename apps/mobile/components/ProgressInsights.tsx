import React from 'react';
import { View, Text } from 'react-native';
import { ActivityHeatmap } from './ActivityHeatmap';
import { CompetencyRadar } from './CompetencyRadar';
import { LinearGradient } from 'expo-linear-gradient';

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
    <View className="mb-8">
      {/* Visualizations */}
      <CompetencyRadar sessions={sessions} />
      <ActivityHeatmap sessions={sessions} />

      {/* Goal Card */}
      <View className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm mt-4">
        <View className="flex-row justify-between items-end mb-3">
          <Text className="font-bold text-slate-800">Weekly Goal</Text>
          <Text className="font-bold text-xs text-slate-400">{currentWeek.length}/{weeklyTarget} sessions</Text>
        </View>
        <View className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-3">
          <LinearGradient
            colors={['#FFC107', '#F43F5E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: `${weeklyProgress}%`, height: '100%', borderRadius: 9999 }}
          />
        </View>
        <Text className="text-sm text-slate-500 leading-relaxed">
          {currentWeek.length >= weeklyTarget
            ? 'Target achieved. Keep momentum with deeper scenario practice.'
            : `Complete ${weeklyTarget - currentWeek.length} more session(s) this week to hit your cadence target.`}
        </Text>
      </View>
    </View>
  );
}
