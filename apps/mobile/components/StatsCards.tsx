import React from 'react';
import { View, Text } from 'react-native';
import * as Icons from 'lucide-react-native';

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
    <View className="flex-row flex-wrap justify-between gap-y-4 mb-8">
      {/* Sessions */}
      <View className="w-[48%] bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <View className="flex-row items-center gap-3 mb-2">
          <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center">
            <Icons.Layers size={16} color="#3B82F6" />
          </View>
          <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sessions</Text>
        </View>
        <Text className="text-2xl font-black text-slate-800">{safeStats.totalSessions || 0}</Text>
      </View>

      {/* Streak */}
      <View className="w-[48%] bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <View className="flex-row items-center gap-3 mb-2">
          <View className="w-8 h-8 rounded-full bg-orange-50 items-center justify-center">
            <Icons.Flame size={16} color="#F97316" />
          </View>
          <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Streak</Text>
        </View>
        <Text className="text-2xl font-black text-slate-800">{safeStats.streak || 0}</Text>
      </View>

      {/* Avg Score */}
      <View className="w-[48%] bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <View className="flex-row items-center gap-3 mb-2">
          <View className="w-8 h-8 rounded-full bg-green-50 items-center justify-center">
            <Icons.Target size={16} color="#22C55E" />
          </View>
          <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg Score</Text>
        </View>
        <Text className="text-2xl font-black text-slate-800">
          {safeStats.averageScore ? `${Math.round(safeStats.averageScore)}%` : '—'}
        </Text>
      </View>

      {/* Last Login */}
      <View className="w-[48%] bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <View className="flex-row items-center gap-3 mb-2">
          <View className="w-8 h-8 rounded-full bg-indigo-50 items-center justify-center">
            <Icons.Clock size={16} color="#6366F1" />
          </View>
          <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Login</Text>
        </View>
        <Text className="text-sm font-bold text-slate-800 mt-2">
          {safeStats.lastSession ? new Date(safeStats.lastSession).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '--'}
        </Text>
      </View>
    </View>
  );
}
