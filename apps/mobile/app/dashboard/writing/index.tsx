import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import * as Icons from 'lucide-react-native';
import { useWritingSession } from '../../../hooks/useWritingSession';
import { WritingSelector } from '../../../components/writing/WritingSelector';
import { WritingCanvas } from '../../../components/writing/WritingCanvas';
import { colors, shadow } from '../../../utils/theme';

export default function WritingPage() {
  const router = useRouter();
  const {
    exercise,
    activeMission,
    userText,
    setUserText,
    feedback,
    loading,
    error,
    analyzeWriting,
    changeExercise,
    exerciseId,
    loadNextMission
  } = useWritingSession();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        
        {/* WEB-STYLE HEADER */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => exerciseId ? changeExercise(null) : router.replace('/dashboard')} 
            style={styles.backButton}
          >
            <Icons.ChevronLeft size={16} color="#475569" />
            <Text style={styles.backButtonText}>{exerciseId ? 'Back to Lobby' : 'Dashboard'}</Text>
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <Text style={styles.headerSubtitle}>Technical Drafting</Text>
            <Text style={styles.headerTitle}>Engineer's Ledger</Text>
          </View>
        </View>

        <View style={styles.content}>
          {!exerciseId ? (
            <WritingSelector changeExercise={changeExercise} />
          ) : (
            <WritingCanvas 
              exercise={exercise!}
              activeMission={activeMission}
              value={userText}
              onChange={setUserText}
              onSubmit={analyzeWriting}
              disabled={loading}
              loading={loading}
              feedback={feedback as any}
              error={error}
              onNext={() => loadNextMission(exerciseId)}
            />
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.slate50,
    paddingTop: 48,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.slate50,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.slate200,
    borderRadius: 8,
    ...shadow.sm,
  },
  backButtonText: {
    fontWeight: '700',
    color: colors.slate600,
    fontSize: 14,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 4,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.slate800,
    fontFamily: 'serif',
  },
  content: {
    flex: 1,
  },
});
