import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useRouter, useFocusEffect } from 'expo-router';
import * as Icons from 'lucide-react-native';
import { modulesData } from '@fluenix/shared';
import { ModuleCard } from '../../components/ModuleCard';
import { StatsCards } from '../../components/StatsCards';
import { LevelSelector } from '../../components/LevelSelector';
import { Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { apiClient } from '../../utils/apiClient';

// Dummy API functions for mobile, normally you would share these or use a mobile-friendly fetch
async function getDashboardStats(userId: string, token: string | null) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 saniye içinde yanıt gelmezse iptal et (Backend kapalıysa beklemesin)
    
    const res = await apiClient.get(`/api/sessions/stats/${userId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return res.data;
  } catch {
    return { totalSessions: 0, averageScore: 0, streak: 0 };
  }
}

export default function DashboardScreen() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [stats, setStats] = useState({ totalSessions: 0, averageScore: 0, streak: 0, lastSession: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace('/sign-in');
    }
  }, [isLoaded, isSignedIn]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchStats = async () => {
        if (user?.id) {
          try {
            const token = await getToken();
            const s = await getDashboardStats(user.id, token);
            setStats(s);
          } catch (e) {
            console.error(e);
          } finally {
            setLoading(false);
          }
        }
      };
      if (isSignedIn) {
        fetchStats();
      }
    }, [isSignedIn, user?.id])
  );

  if (!isLoaded || loading) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <Text className="text-slate-500 font-medium">Loading Terminal...</Text>
      </View>
    );
  }

  const xpAmount = (stats.totalSessions || 0) * 150;
  const progressPercent = (((stats.totalSessions || 0) % 5) / 5) * 100;

  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ padding: 24, paddingTop: 60, paddingBottom: 100 }}>
      {/* HEADER SECTION */}
      <View className="mb-10">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center gap-3">
            <View className="w-8 h-px bg-indigo-600" />
            <Text className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Operational Terminal</Text>
          </View>
          <LevelSelector />
        </View>

        <Text className="font-bold text-4xl text-slate-800 leading-tight mb-2">
          Welcome, {user?.firstName ?? 'Engineer'} —
        </Text>
        <Text className="text-indigo-600 italic text-2xl font-serif mb-6">
          Technical communication environment active.
        </Text>
        <Text className="text-slate-500 leading-relaxed text-base">
          Access your technical lab modules below. Each module is optimized for high-stakes FAANG-level communication standards.
        </Text>
      </View>

      {/* GAMIFICATION WIDGET */}
      <View className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mb-10 overflow-hidden relative">
        <LinearGradient 
          colors={['#FFC107', '#F43F5E']} 
          style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6 }} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 0, y: 1 }} 
        />
        <View className="flex-row justify-between items-center mb-6">
          <Text className="font-bold text-slate-700">Current Progress</Text>
          <View className="flex-row items-baseline gap-1">
            <Text className="font-serif italic font-black text-2xl text-indigo-600">{xpAmount}</Text>
            <Text className="font-bold text-[10px] text-slate-400 tracking-wider">XP</Text>
          </View>
        </View>
        
        <View className="flex-col gap-3">
          <View className="flex-row justify-between items-end">
            <Text className="font-bold text-sm text-slate-800">Weekly Goal</Text>
            <Text className="font-bold text-xs text-slate-400">{(stats.totalSessions || 0) % 5}/5 Sessions</Text>
          </View>
          <View className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <LinearGradient 
              colors={['#FFC107', '#F43F5E']} 
              start={{ x: 0, y: 0 }} 
              end={{ x: 1, y: 0 }} 
              style={{ width: `${progressPercent}%`, height: '100%', borderRadius: 9999 }} 
            />
          </View>
        </View>
      </View>

      {/* STATS ROW */}
      <StatsCards stats={stats} />
      
      <TouchableOpacity 
        className="bg-indigo-50 py-4 rounded-xl flex-row items-center justify-center mb-10 shadow-sm border border-indigo-100"
        onPress={() => router.push('/dashboard/progress')}
      >
        <Icons.TrendingUp size={18} color="#4f46e5" />
        <Text className="font-bold text-indigo-600 ml-2 text-base">View Full Progress Map</Text>
      </TouchableOpacity>

      {/* MODULES SECTION */}
      <View className="mb-10">
        <View className="flex-row items-center gap-4 mb-8">
          <Text className="font-bold text-[10px] uppercase tracking-[3px] text-slate-400">Available Lab Modules</Text>
          <View className="flex-1 h-px bg-slate-200" />
        </View>

        <View>
          {modulesData.map((mod, i) => (
            <ModuleCard key={mod.id} moduleData={mod} />
          ))}
        </View>
      </View>

      {/* FOOTER */}
      <View className="mt-8 pt-8 border-t border-slate-200 flex-row items-center justify-center gap-2">
        <Icons.ShieldCheck size={14} color="#94a3b8" />
        <Text className="font-bold text-[11px] text-slate-400 uppercase tracking-widest">Secure Environment — v1.2</Text>
      </View>

    </ScrollView>
  );
}
