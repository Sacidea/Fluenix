import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';
import { useVocabularySession } from '../../hooks/useVocabularySession';
import { Flashcard } from './Flashcard';
import { useRouter } from 'expo-router';
import { colors, shadow } from '../../utils/theme';

const SESSION_SIZE = 10;
const { width } = Dimensions.get('window');

export function FlashcardWorkspace() {
  const { sessionWords, loading, error, fetchSession, completeSession } = useVocabularySession(SESSION_SIZE);
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [needsReviewIds, setNeedsReviewIds] = useState<string[]>([]);

  const handleNext = async (status: 'review' | 'got_it') => {
    const wordId = sessionWords[currentIndex].id;
    let newMastered = [...masteredIds];
    let newReview = [...needsReviewIds];

    if (status === 'review') {
      newReview.push(wordId);
      setNeedsReviewIds(newReview);
    } else {
      newMastered.push(wordId);
      setMasteredIds(newMastered);
    }

    setIsFlipped(false);

    setTimeout(async () => {
      if (currentIndex < sessionWords.length - 1) {
        setCurrentIndex(p => p + 1);
      } else {
        setIsFinished(true);
        await completeSession(newMastered, newReview);
      }
    }, 350); // wait for flip animation to finish
  };

  const handleRestart = () => {
    fetchSession();
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsFinished(false);
    setMasteredIds([]);
    setNeedsReviewIds([]);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.blue500} />
        <Text style={styles.loadingText}>Loading vocabulary session...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Icons.AlertTriangle size={32} color={colors.red500} />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (sessionWords.length === 0) return null;

  if (isFinished) {
    const masteredCount = masteredIds.length;
    const reviewCount = needsReviewIds.length;
    const masteredPct = Math.round((masteredCount / sessionWords.length) * 100);
    
    return (
      <View style={styles.finishedContainer}>
        <View style={styles.trophyCircle}>
          <Icons.Trophy size={40} color={colors.yellow500} />
        </View>
        <Text style={styles.finishedTitle}>Session Complete</Text>
        <Text style={styles.finishedDesc}>
          You reviewed {sessionWords.length} FAANG-level technical terms.
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.emerald600 }]}>{masteredCount}</Text>
            <Text style={styles.statLabel}>Mastered</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.purple500 }]}>{masteredPct}%</Text>
            <Text style={styles.statLabel}>Score</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.red600 }]}>{reviewCount}</Text>
            <Text style={styles.statLabel}>Review</Text>
          </View>
        </View>

        <TouchableOpacity 
          onPress={handleRestart}
          style={styles.restartBtn}
        >
          <Text style={styles.restartBtnText}>Start New Session</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => router.replace('/dashboard')}
          style={styles.dashboardBtn}
        >
          <Text style={styles.dashboardBtnText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentWord = sessionWords[currentIndex];

  return (
    <View style={styles.mainContainer}>
      {/* Progress */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressCounter}>
            {currentIndex + 1} / {sessionWords.length}
          </Text>
          <Text style={styles.difficultyLabel}>
            {currentWord.difficulty}
          </Text>
        </View>
        <View style={styles.progressBarBg}>
          <View 
            style={[styles.progressBarFill, { width: `${(currentIndex / sessionWords.length) * 100}%` }]}
          />
        </View>
        <View style={styles.dotRow}>
          {sessionWords.map((_, i) => (
            <View 
              key={i} 
              style={[
                styles.dot,
                i < currentIndex ? styles.dotCompleted : i === currentIndex ? styles.dotCurrent : styles.dotPending,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Flashcard */}
      <Flashcard 
        word={currentWord} 
        isFlipped={isFlipped} 
        setIsFlipped={setIsFlipped} 
      />

      {/* Action Buttons */}
      <View style={styles.actionsSection}>
        <View style={styles.actionsRow}>
          <TouchableOpacity 
            disabled={!isFlipped}
            onPress={() => handleNext('review')}
            style={[
              styles.actionBtn,
              isFlipped ? styles.reviewBtnActive : styles.actionBtnDisabled,
            ]}
          >
            <Icons.X size={20} color={isFlipped ? "#DC2626" : "#94A3B8"} />
            <Text style={[styles.actionBtnText, isFlipped ? styles.reviewBtnText : styles.actionBtnTextDisabled]}>Needs Review</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            disabled={!isFlipped}
            onPress={() => handleNext('got_it')}
            style={[
              styles.actionBtn,
              styles.gotItBtn,
              isFlipped ? styles.gotItBtnActive : styles.gotItBtnDisabled,
            ]}
          >
            <Icons.Check size={20} color={colors.white} />
            <Text style={styles.gotItBtnText}>Got It</Text>
          </TouchableOpacity>
        </View>
        
        {!isFlipped && (
          <View style={styles.tapHintRow}>
            <Text style={styles.tapHintText}>Tap the card to reveal definition and unlock buttons</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  loadingText: {
    color: colors.slate500,
    fontWeight: '500',
    marginTop: 16,
  },
  errorText: {
    color: colors.red500,
    fontWeight: '500',
    marginTop: 16,
    textAlign: 'center',
  },
  finishedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  trophyCircle: {
    width: 80,
    height: 80,
    backgroundColor: '#fefce8',
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  finishedTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: colors.slate800,
    marginBottom: 8,
  },
  finishedDesc: {
    color: colors.slate500,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 16,
    flex: 1,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: colors.slate100,
    ...shadow.sm,
  },
  statValue: {
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.slate400,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  restartBtn: {
    width: '100%',
    backgroundColor: colors.slate900,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    ...shadow.md,
    marginBottom: 16,
  },
  restartBtnText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 18,
  },
  dashboardBtn: {
    width: '100%',
    backgroundColor: colors.slate100,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  dashboardBtnText: {
    color: colors.slate600,
    fontWeight: '700',
  },
  mainContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressCounter: {
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '900',
    color: colors.purple500,
    letterSpacing: 4,
  },
  difficultyLabel: {
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '700',
    color: colors.slate400,
    textTransform: 'uppercase',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: colors.slate200,
    borderRadius: 9999,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.purple500,
    borderRadius: 9999,
  },
  dotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 4,
  },
  dot: {
    height: 4,
    flex: 1,
    marginHorizontal: 2,
    borderRadius: 9999,
  },
  dotCompleted: {
    backgroundColor: colors.purple500,
  },
  dotCurrent: {
    backgroundColor: '#d8b4fe',
  },
  dotPending: {
    backgroundColor: colors.slate200,
  },
  actionsSection: {
    marginTop: 8,
    marginBottom: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  reviewBtnActive: {
    backgroundColor: '#fef2f2',
    borderColor: '#fecaca',
  },
  actionBtnDisabled: {
    backgroundColor: colors.slate50,
    borderColor: colors.slate200,
    opacity: 0.5,
  },
  actionBtnText: {
    marginLeft: 8,
    fontWeight: '700',
  },
  reviewBtnText: {
    color: '#b91c1c',
  },
  actionBtnTextDisabled: {
    color: colors.slate400,
  },
  gotItBtn: {
    borderWidth: 0,
    ...shadow.sm,
  },
  gotItBtnActive: {
    backgroundColor: colors.green500,
  },
  gotItBtnDisabled: {
    backgroundColor: colors.slate300,
  },
  gotItBtnText: {
    marginLeft: 8,
    fontWeight: '700',
    color: colors.white,
  },
  tapHintRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  tapHintText: {
    color: colors.slate400,
    fontWeight: '500',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});
