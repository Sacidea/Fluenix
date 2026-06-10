import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { apiClient } from '../../utils/apiClient';
import { useAuth, useUser } from '@clerk/clerk-expo';
import * as Icons from 'lucide-react-native';
import { colors, shadow } from '../../utils/theme';

type TextSegment = {
  text: string;
  isClickable: boolean;
  isError?: boolean;
  options?: string[];
  correctOption?: string;
  explanation?: string;
};

type GrammarExercise = {
  id: string;
  title: string;
  context: string;
  level: string;
  segments: TextSegment[];
};

export function GrammarWorkspace() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  
  const [exercise, setExercise] = useState<GrammarExercise | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionCount, setSessionCount] = useState(0);

  const [foundErrorIndex, setFoundErrorIndex] = useState<number | null>(null);
  const [selectedFix, setSelectedFix] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const [wrongShakeIndex, setWrongShakeIndex] = useState<number | null>(null);

  const fetchExercise = useCallback(async () => {
    if (!isLoaded || !user) return;
    setIsLoading(true);
    try {
      const level = (user?.publicMetadata?.level as string) || 'B2';
      const token = await getToken();
      
      const res = await apiClient.post('/api/grammar/next', 
        { level },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      
      if (res.data.success && res.data.data) {
        setExercise(res.data.data);
      } else {
        setExercise(null);
      }
    } catch (err) {
      console.error("Failed to load grammar exercise", err);
      setExercise(null);
    } finally {
      setIsLoading(false);
    }
  }, [isLoaded, user]);

  useEffect(() => {
    setSessionCount(0);
    resetExerciseState();
    if (isLoaded) {
      fetchExercise();
    }
  }, [fetchExercise, isLoaded]);

  const resetExerciseState = () => {
    setWrongShakeIndex(null);
    setFoundErrorIndex(null);
    setSelectedFix(null);
    setIsAnswered(false);
  };

  const handleNext = () => {
    setSessionCount(p => p + 1);
    resetExerciseState();
    fetchExercise();
  };

  const handleSegmentClick = (segment: TextSegment, index: number) => {
    if (!segment.isClickable || foundErrorIndex !== null) return;

    if (segment.isError) {
      setFoundErrorIndex(index);
    } else {
      setWrongShakeIndex(index);
      setTimeout(() => setWrongShakeIndex(null), 800);
    }
  };

  const handleOptionSelect = async (option: string) => {
    if (isAnswered || !exercise) return;
    setSelectedFix(option);
    setIsAnswered(true);

    try {
      const token = await getToken();
      await apiClient.post('/api/grammar/mark-seen', 
        { exerciseId: exercise.id },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );

      // Save session to backend
      if (user?.id) {
        const errorSegment = exercise.segments.find(s => s.isError);
        const isCorrect = errorSegment && option === errorSegment.correctOption;
        await apiClient.post('/api/sessions', {
          userId: user.id,
          type: 'grammar',
          scenario: exercise.title,
          duration: 60, // approximate duration
          score: isCorrect ? 100 : 0
        }, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
      }
    } catch (err) {
      console.error('Failed to update progress', err);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#10b981" />
        <Text style={styles.loadingText}>Loading Exercises...</Text>
      </View>
    );
  }

  if (!exercise) {
    return (
      <View style={styles.loadingContainer}>
        <Icons.CheckCircle2 size={48} color="#10b981" />
        <Text style={styles.emptyTitle}>Generating Scenarios...</Text>
        <Text style={styles.emptySubtitle}>Our AI is preparing new advanced grammar exercises for you. Check back later!</Text>
      </View>
    );
  }

  const errorSegment = foundErrorIndex !== null ? exercise.segments[foundErrorIndex] : null;
  const isFixCorrect = errorSegment && selectedFix === errorSegment.correctOption;

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Text style={styles.exerciseTitle}>{exercise.title}</Text>
          <View style={styles.contextRow}>
            <Icons.MessageSquare size={14} color="#64748b" />
            <Text style={styles.contextText}>{exercise.context}</Text>
          </View>
        </View>
        <View style={styles.sessionBadge}>
          <Text style={styles.sessionBadgeText}>Ex {sessionCount + 1}</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={[styles.mainCard, shadow.sm]}>
        
        {/* Instruction */}
        <View style={[
          styles.instructionBar,
          foundErrorIndex === null ? styles.instructionDefault : styles.instructionFound,
        ]}>
          {foundErrorIndex !== null && <Icons.CheckCircle2 size={18} color="#10b981" />}
          <Text style={[
            styles.instructionText,
            foundErrorIndex === null ? styles.instructionTextDefault : styles.instructionTextFound,
          ]}>
            {foundErrorIndex === null 
              ? 'Find the grammatical error in the text below. Tap on the incorrect phrase.'
              : 'Error Found! Now select the correct fix.'}
          </Text>
        </View>

        {/* Interactive Text */}
        <View style={styles.interactiveText}>
          {exercise.segments.map((seg, idx) => {
            const isWrongShake = wrongShakeIndex === idx;
            const isErrorFound = foundErrorIndex === idx;
            
            // For spacing between words
            const isLast = idx === exercise.segments.length - 1;
            const spaceStr = isLast ? '' : ' ';

            if (isErrorFound) {
              if (isAnswered && isFixCorrect) {
                return (
                  <View key={idx} style={styles.correctedWord}>
                    <Text style={styles.correctedWordText}>{seg.correctOption}{spaceStr}</Text>
                  </View>
                );
              }
              return (
                <View key={idx} style={styles.errorWord}>
                  <Text style={styles.errorWordText}>{seg.text}{spaceStr}</Text>
                </View>
              );
            }

            if (!seg.isClickable) {
              return (
                <Text key={idx} style={styles.normalWord}>
                  {seg.text}{spaceStr}
                </Text>
              );
            }

            return (
              <TouchableOpacity 
                key={idx} 
                onPress={() => handleSegmentClick(seg, idx)}
                activeOpacity={0.7}
                style={styles.clickableWordWrap}
              >
                <View style={[
                  styles.clickableWord,
                  isWrongShake ? styles.clickableWordShake : styles.clickableWordDefault,
                ]}>
                  <Text 
                    style={[
                      styles.clickableWordText,
                      isWrongShake ? styles.clickableWordTextShake : styles.clickableWordTextDefault,
                    ]}
                  >
                    {seg.text}{spaceStr}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Options & Feedback */}
      {errorSegment && (
        <View style={[styles.optionsCard, shadow.sm]}>
          <View style={styles.optionsList}>
            {errorSegment.options?.map((opt, idx) => {
              const isSelected = selectedFix === opt;
              const isCorrect = opt === errorSegment.correctOption;
              
              let optStyle: any = styles.optDefault;
              let optTextStyle: any = styles.optTextDefault;

              if (isAnswered) {
                if (isCorrect) {
                  optStyle = styles.optCorrect;
                  optTextStyle = styles.optTextCorrect;
                } else if (isSelected && !isCorrect) {
                  optStyle = styles.optWrong;
                  optTextStyle = styles.optTextWrong;
                }
              }

              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.optBase, optStyle]}
                  onPress={() => handleOptionSelect(opt)}
                  disabled={isAnswered}
                >
                  <Text style={[styles.optTextBase, optTextStyle]}>{opt}</Text>
                  {isAnswered && isCorrect && <Icons.CheckCircle2 size={20} color="#10b981" />}
                  {isAnswered && isSelected && !isCorrect && <Icons.XCircle size={20} color="#f43f5e" />}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Explanation Box */}
          {isAnswered && (
            <View style={[styles.explanationBox, shadow.sm]}>
              <View style={styles.explanationHeader}>
                <Icons.AlertCircle size={18} color="#6366f1" />
                <Text style={styles.explanationTitle}>Grammar Rule</Text>
              </View>
              <Text style={styles.explanationText}>{errorSegment.explanation}</Text>
              <TouchableOpacity 
                style={[styles.nextBtn, shadow.sm]}
                onPress={handleNext}
              >
                <Text style={styles.nextBtnText}>Next Exercise</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 24,
    marginHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate200,
  },
  loadingText: {
    color: colors.slate500,
    fontWeight: '500',
    marginTop: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.slate800,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    color: colors.slate500,
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  headerLeft: {
    flex: 1,
    paddingRight: 16,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.slate800,
    marginBottom: 4,
  },
  contextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contextText: {
    fontSize: 10,
    color: colors.slate500,
    marginLeft: 6,
    fontWeight: '500',
  },
  sessionBadge: {
    backgroundColor: colors.slate200,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  sessionBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.slate500,
    textTransform: 'uppercase',
    letterSpacing: 4,
  },
  mainCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.slate200,
    overflow: 'hidden',
    marginBottom: 24,
  },
  instructionBar: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  instructionDefault: {
    backgroundColor: colors.slate50,
    borderBottomColor: colors.slate200,
  },
  instructionFound: {
    backgroundColor: '#ecfdf5',
    borderBottomColor: '#d1fae5',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  instructionText: {
    fontWeight: '500',
  },
  instructionTextDefault: {
    color: colors.slate600,
  },
  instructionTextFound: {
    color: '#047857',
  },
  interactiveText: {
    padding: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  correctedWord: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginHorizontal: 4,
    marginVertical: 4,
  },
  correctedWordText: {
    color: '#047857',
    fontWeight: '700',
    fontSize: 18,
  },
  errorWord: {
    backgroundColor: '#fff1f2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginHorizontal: 4,
    borderBottomWidth: 2,
    borderBottomColor: colors.rose500,
    borderStyle: 'dashed',
    marginVertical: 4,
  },
  errorWordText: {
    color: '#be123c',
    fontWeight: '700',
    fontSize: 18,
  },
  normalWord: {
    color: colors.slate700,
    fontSize: 18,
    marginVertical: 4,
  },
  clickableWordWrap: {
    marginHorizontal: 4,
    marginVertical: 4,
  },
  clickableWord: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#c7d2fe',
  },
  clickableWordDefault: {
    backgroundColor: colors.primaryBg,
  },
  clickableWordShake: {
    backgroundColor: '#ffe4e6',
  },
  clickableWordText: {
    fontSize: 18,
    fontWeight: '500',
  },
  clickableWordTextDefault: {
    color: '#4338ca',
  },
  clickableWordTextShake: {
    color: '#be123c',
  },
  optionsCard: {
    backgroundColor: colors.slate50,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate200,
    marginBottom: 24,
  },
  optionsList: {
    flexDirection: 'column',
    gap: 12,
  },
  optBase: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  optDefault: {
    backgroundColor: colors.white,
    borderColor: colors.slate300,
  },
  optCorrect: {
    backgroundColor: '#ecfdf5',
    borderColor: colors.emerald500,
  },
  optWrong: {
    backgroundColor: '#fff1f2',
    borderColor: colors.rose500,
  },
  optTextBase: {
    fontWeight: '700',
    fontSize: 14,
  },
  optTextDefault: {
    color: colors.slate700,
  },
  optTextCorrect: {
    color: '#065f46',
  },
  optTextWrong: {
    color: '#9f1239',
  },
  explanationBox: {
    marginTop: 20,
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.slate200,
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  explanationTitle: {
    fontWeight: '700',
    color: '#312e81',
  },
  explanationText: {
    color: colors.slate600,
    lineHeight: 26,
    marginBottom: 16,
  },
  nextBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextBtnText: {
    color: colors.white,
    fontWeight: '700',
  },
});
