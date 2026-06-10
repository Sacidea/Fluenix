import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Platform, FlatList, Alert, StyleSheet } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useRouter, useFocusEffect } from 'expo-router';
import * as Icons from 'lucide-react-native';

import { StatsCards } from '../../../components/StatsCards';
import { ProgressInsights } from '../../../components/ProgressInsights';
import { SessionItem } from '../../../components/SessionItem';
import { SessionDetailModal } from '../../../components/SessionDetailModal';
import { apiClient } from '../../../utils/apiClient';
import { Session } from '../../../components/SessionItem';
import { colors } from '../../../utils/theme';

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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loadingText}>Compiling personnel dossier...</Text>
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
      <View style={styles.headerSection}>
        <View style={styles.headerLabelRow}>
          <View style={styles.headerAccent} />
          <Text style={styles.headerLabel}>Personnel Dossier</Text>
        </View>

        <Text style={styles.headerTitle}>
          Competency <Text style={styles.headerTitleAccent}>Progress Map</Text>
        </Text>
        <Text style={styles.headerDescription}>
          Tracking technical proficiency across all active simulation environments.
        </Text>
      </View>

      {/* STATS DOSSIER */}
      <StatsCards stats={data.stats} />
      
      {/* VISUALIZATIONS */}
      <ProgressInsights sessions={data.sessions} />

      <View style={styles.logLabelRow}>
        <Text style={styles.logLabel}>Operational Record Log</Text>
        <View style={styles.logDivider} />
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Icons.Inbox size={48} color="#cbd5e1" style={{ marginBottom: 16 }} />
      <Text style={styles.emptyTitle}>No Operational Logs Found</Text>
      <Text style={styles.emptyDescription}>Start your first session to begin building your personnel dossier.</Text>
      <TouchableOpacity 
        style={styles.emptyButton}
        onPress={() => router.push('/dashboard')}
      >
        <Text style={styles.emptyButtonText}>Return to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <Icons.ShieldCheck size={14} color="#94a3b8" />
      <Text style={styles.footerText}>Verified Technical Proficiency Record — v1.2</Text>
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
        style={styles.flatList}
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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.slate50,
  },
  loadingText: {
    color: colors.slate500,
    fontWeight: '500',
    marginTop: 16,
  },
  flatList: {
    flex: 1,
    backgroundColor: colors.slate50,
  },
  headerSection: {
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate200,
    paddingBottom: 32,
  },
  headerLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  headerAccent: {
    width: 32,
    height: 1,
    backgroundColor: colors.primary,
  },
  headerLabel: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 4,
    color: colors.slate400,
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 36,
    color: colors.slate800,
    lineHeight: 40,
    marginBottom: 8,
  },
  headerTitleAccent: {
    fontFamily: 'serif',
    fontStyle: 'italic',
    fontWeight: '400',
    color: colors.primary,
  },
  headerDescription: {
    color: colors.slate500,
    lineHeight: 22,
    fontSize: 14,
  },
  logLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
    marginTop: 16,
  },
  logLabel: {
    fontWeight: '700',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: colors.slate400,
  },
  logDivider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.slate200,
  },
  emptyContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 32,
    borderWidth: 1,
    borderColor: colors.slate200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontWeight: '700',
    color: colors.slate800,
    fontSize: 18,
    marginBottom: 8,
  },
  emptyDescription: {
    color: colors.slate500,
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: colors.slate900,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyButtonText: {
    color: colors.white,
    fontWeight: '700',
  },
  footer: {
    marginTop: 48,
    paddingTop: 32,
    borderTopWidth: 1,
    borderTopColor: colors.slate200,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    fontWeight: '700',
    fontSize: 10,
    color: colors.slate400,
    textTransform: 'uppercase',
    letterSpacing: 4,
  },
});
