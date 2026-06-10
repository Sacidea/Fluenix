import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
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
import { colors, shadow } from '../../utils/theme';

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
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Terminal...</Text>
      </View>
    );
  }

  const xpAmount = (stats.totalSessions || 0) * 150;
  const progressPercent = (((stats.totalSessions || 0) % 5) / 5) * 100;

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={{ padding: 24, paddingTop: 60, paddingBottom: 100 }}>
      {/* HEADER SECTION */}
      <View style={styles.headerSection}>
        <View style={styles.headerTopRow}>
          <View style={styles.headerLabelRow}>
            <View style={styles.headerAccent} />
            <Text style={styles.headerLabel}>Operational Terminal</Text>
          </View>
          <LevelSelector />
        </View>

        <Text style={styles.welcomeTitle}>
          Welcome, {user?.firstName ?? 'Engineer'} —
        </Text>
        <Text style={styles.welcomeSubtitle}>
          Technical communication environment active.
        </Text>
        <Text style={styles.welcomeDescription}>
          Access your technical lab modules below. Each module is optimized for high-stakes FAANG-level communication standards.
        </Text>
      </View>

      {/* GAMIFICATION WIDGET */}
      <View style={styles.gamificationCard}>
        <LinearGradient 
          colors={['#FFC107', '#F43F5E']} 
          style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 6 }} 
          start={{ x: 0, y: 0 }} 
          end={{ x: 0, y: 1 }} 
        />
        <View style={styles.gamificationHeader}>
          <Text style={styles.gamificationTitle}>Current Progress</Text>
          <View style={styles.xpRow}>
            <Text style={styles.xpValue}>{xpAmount}</Text>
            <Text style={styles.xpLabel}>XP</Text>
          </View>
        </View>
        
        <View style={styles.goalSection}>
          <View style={styles.goalHeaderRow}>
            <Text style={styles.goalTitle}>Weekly Goal</Text>
            <Text style={styles.goalCount}>{(stats.totalSessions || 0) % 5}/5 Sessions</Text>
          </View>
          <View style={styles.progressBarBg}>
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
        style={styles.progressButton}
        onPress={() => router.push('/dashboard/progress')}
      >
        <Icons.TrendingUp size={18} color="#4f46e5" />
        <Text style={styles.progressButtonText}>View Full Progress Map</Text>
      </TouchableOpacity>

      {/* MODULES SECTION */}
      <View style={styles.modulesSection}>
        <View style={styles.modulesSectionHeader}>
          <Text style={styles.modulesSectionLabel}>Available Lab Modules</Text>
          <View style={styles.modulesDivider} />
        </View>

        <View>
          {modulesData.map((mod, i) => (
            <ModuleCard key={mod.id} moduleData={mod} />
          ))}
        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Icons.ShieldCheck size={14} color="#94a3b8" />
        <Text style={styles.footerText}>Secure Environment — v1.2</Text>
      </View>

    </ScrollView>
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
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.slate50,
  },
  headerSection: {
    marginBottom: 40,
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
  welcomeTitle: {
    fontWeight: '700',
    fontSize: 36,
    color: colors.slate800,
    lineHeight: 40,
    marginBottom: 8,
  },
  welcomeSubtitle: {
    color: colors.primary,
    fontStyle: 'italic',
    fontSize: 24,
    fontFamily: 'serif',
    marginBottom: 24,
  },
  welcomeDescription: {
    color: colors.slate500,
    lineHeight: 22,
    fontSize: 14,
  },
  gamificationCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.slate200,
    marginBottom: 40,
    overflow: 'hidden',
    position: 'relative',
    ...shadow.sm,
  },
  gamificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  gamificationTitle: {
    fontWeight: '700',
    color: colors.slate700,
  },
  xpRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  xpValue: {
    fontFamily: 'serif',
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: 24,
    color: colors.primary,
  },
  xpLabel: {
    fontWeight: '700',
    fontSize: 10,
    color: colors.slate400,
    letterSpacing: 2,
  },
  goalSection: {
    flexDirection: 'column',
    gap: 12,
  },
  goalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  goalTitle: {
    fontWeight: '700',
    fontSize: 12,
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
  },
  progressButton: {
    backgroundColor: colors.primaryBg,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    ...shadow.sm,
  },
  progressButtonText: {
    fontWeight: '700',
    color: colors.primary,
    marginLeft: 8,
    fontSize: 14,
  },
  modulesSection: {
    marginBottom: 40,
  },
  modulesSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
  },
  modulesSectionLabel: {
    fontWeight: '700',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 3,
    color: colors.slate400,
  },
  modulesDivider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.slate200,
  },
  footer: {
    marginTop: 32,
    paddingTop: 32,
    borderTopWidth: 1,
    borderTopColor: colors.slate200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  footerText: {
    fontWeight: '700',
    fontSize: 11,
    color: colors.slate400,
    textTransform: 'uppercase',
    letterSpacing: 4,
  },
});
