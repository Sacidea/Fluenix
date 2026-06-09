import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Platform, FlatList, Alert } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useRouter, useFocusEffect } from 'expo-router';
import * as Icons from 'lucide-react-native';

import { StatsCards } from '../../../components/StatsCards';
import { ProgressInsights } from '../../../components/ProgressInsights';
import { SessionItem } from '../../../components/SessionItem';
import { SessionDetailModal } from '../../../components/SessionDetailModal';
import { apiClient } from '../../../utils/apiClient';
import { Session } from '../../../components/SessionItem';

async function getProgressData(userId: string, token: string | null) {
  try {
    const res = await apiClient.get(`/api/sessions/stats/${userId}?full=true`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    });
    return res.data;
  } catch {
    return { stats: { totalSessions: 0, averageScore: 0, streak: 0 }, sessions: [] };
  }
}

export default function ProgressScreen() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [data, setData] = useState({ 
    stats: { totalSessions: 0, averageScore: 0, streak: 0, lastSession: null }, 
    sessions: [] as Session[] 
  });
  const [loading, setLoading] = useState(true);

  // Client-side pagination state
  const [displayCount, setDisplayCount] = useState(10);
  
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

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
            const d = await getProgressData(user.id, token);
            if (d.stats && d.sessions) {
              setData(d);
            }
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
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text className="text-slate-500 font-medium mt-4">Compiling personnel dossier...</Text>
      </View>
    );
  }

  const loadMore = () => {
    if (displayCount < data.sessions.length) {
      setDisplayCount(prev => prev + 10);
    }
  };

  const renderHeader = () => (
    <View>
      {/* HEADER SECTION */}
      <View className="mb-10 border-b border-slate-200 pb-8">
        <View className="flex-row items-center gap-3 mb-4">
          <View className="w-8 h-px bg-indigo-600" />
          <Text className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Personnel Dossier</Text>
        </View>

        <Text className="font-bold text-4xl text-slate-800 leading-tight mb-2">
          Competency <Text className="font-serif italic font-normal text-indigo-600">Progress Map</Text>
        </Text>
        <Text className="text-slate-500 leading-relaxed text-base">
          Tracking technical proficiency across all active simulation environments.
        </Text>
      </View>

      {/* STATS DOSSIER */}
      <StatsCards stats={data.stats} />
      
      {/* VISUALIZATIONS */}
      <ProgressInsights sessions={data.sessions} />

      <View className="flex-row items-center gap-4 mb-6 mt-4">
        <Text className="font-bold text-[10px] uppercase tracking-[2px] text-slate-400">Operational Record Log</Text>
        <View className="flex-1 h-px bg-slate-200" />
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View className="bg-white rounded-2xl p-8 border border-slate-200 items-center justify-center">
      <Icons.Inbox size={48} color="#cbd5e1" className="mb-4" />
      <Text className="font-bold text-slate-800 text-lg mb-2">No Operational Logs Found</Text>
      <Text className="text-slate-500 text-center mb-6">Start your first session to begin building your personnel dossier.</Text>
      <TouchableOpacity 
        className="bg-slate-900 px-6 py-3 rounded-xl"
        onPress={() => router.push('/dashboard')}
      >
        <Text className="text-white font-bold">Return to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => (
    <View className="mt-12 pt-8 border-t border-slate-200 flex-row items-center gap-2">
      <Icons.ShieldCheck size={14} color="#94a3b8" />
      <Text className="font-bold text-[10px] text-slate-400 uppercase tracking-widest">Verified Technical Proficiency Record — v1.2</Text>
    </View>
  );

  const executeDelete = async (session: Session) => {
    try {
      const token = await getToken();
      await apiClient.delete(`/api/sessions/${session.id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined
      });
      
      setData(prev => ({
        ...prev,
        sessions: prev.sessions.filter((s: Session) => s.id !== session.id)
      }));
    } catch (e) {
      if (Platform.OS === 'web') alert("Network error occurred.");
      else Alert.alert("Error", "Network error occurred.");
    }
  };

  const handleDelete = (session: Session) => {
    if (Platform.OS === 'web') {
      if (window.confirm("Are you sure you want to delete this session record?")) {
        executeDelete(session);
      }
      return;
    }

    Alert.alert(
      "Delete Record",
      "Are you sure you want to delete this session record?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => executeDelete(session)
        }
      ]
    );
  };

  return (
    <>
      <FlatList
        className="flex-1 bg-slate-50"
        contentContainerStyle={{ padding: 24, paddingTop: 60, paddingBottom: 100 }}
        data={data.sessions.slice(0, displayCount)}
        keyExtractor={(item: Session, index) => String(item.id || index)}
        renderItem={({ item }) => (
          <SessionItem 
            session={item} 
            onPress={() => setSelectedSession(item)} 
            onDelete={() => handleDelete(item)}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
      />
      <SessionDetailModal 
        visible={!!selectedSession} 
        session={selectedSession} 
        onClose={() => setSelectedSession(null)} 
      />
    </>
  );
}
