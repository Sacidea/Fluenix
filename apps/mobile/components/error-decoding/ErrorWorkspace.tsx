import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, ScrollView, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';
import { useUser, useAuth } from '@clerk/clerk-expo';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { API_URL } from '../../utils/apiClient';
import { colors, shadow } from '../../utils/theme';

// Types matched from backend/web
type ScenarioType = 'stack-trace' | 'documentation';
interface ErrorScenario {
  id: string;
  title: string;
  type: ScenarioType;
  difficulty: 'Beginner' | 'Intermediate';
  content: string;
  eli5: string;
  highlights: { word: string; tooltip: string }[];
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

const ROUNDS_PER_SESSION = 3;

// Highlight renderer for Mobile
function renderContentWithHighlights(content: string, highlights?: { word: string; tooltip: string }[]) {
  if (!highlights || highlights.length === 0) return <Text style={styles.monoTextLight}>{content}</Text>;

  const words = highlights.map(h => h.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp("(" + words.join('|') + ")", 'g');
  const parts = content.split(regex);

  return (
    <Text style={styles.monoTextLight}>
      {parts.map((part, i) => {
        const highlight = highlights.find(h => h.word === part);
        if (highlight) {
          return (
            <Text 
              key={i} 
              onPress={() => {
                Alert.alert("Highlight", highlight.tooltip);
              }}
              style={styles.highlightText}
            >
              {part}
            </Text>
          );
        }
        return <Text key={i}>{part}</Text>;
      })}
    </Text>
  );
}

export function ErrorWorkspace() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();
  
  const [scenario, setScenario] = useState<ErrorScenario | null>(null);
  const [loading, setLoading] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showEli5, setShowEli5] = useState(false);

  const fetchScenario = useCallback(async () => {
    if (!isLoaded || !user) return;
    setLoading(true);
    try {
      const level = (user.publicMetadata.level as string) || 'B2';
      const role = (user.publicMetadata.role as string) || 'Full Stack';
      
      const token = await getToken();
      const res = await axios.post(`${API_URL}/api/error-decoding/scenario`, {
        level,
        role
      }, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      
      const data = typeof res.data.scenario === 'string' ? JSON.parse(res.data.scenario) : res.data.scenario;
      setScenario(data);
    } catch (err) {
      console.error('Failed to fetch scenario', err);
    } finally {
      setLoading(false);
    }
  }, [isLoaded, user]);

  useEffect(() => {
    if (sessionCount === 0 && !scenario && !loading && isLoaded) {
      fetchScenario();
    }
  }, [fetchScenario, sessionCount, scenario, loading, isLoaded]);

  const saveSessionProgress = async (finalScore: number) => {
    try {
      if (!user) return;
      const token = await getToken();
      await axios.post(
        `${API_URL}/api/sessions`,
        {
          userId: user.id,
          type: 'error-decoding',
          scenario: 'Error Decoding Challenge',
          score: finalScore,
          duration: ROUNDS_PER_SESSION * 60,
          feedback: { rounds: ROUNDS_PER_SESSION, correct: correctAnswers }
        },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
    } catch (err) {
      console.error('Failed to save session progress', err);
    }
  };

  if (sessionCount >= ROUNDS_PER_SESSION) {
    const finalScore = Math.round((correctAnswers / ROUNDS_PER_SESSION) * 100);
    return (
      <View style={[styles.completionContainer, shadow.sm]}>
        <View style={styles.completionIcon}>
          <Icons.CheckCircle2 size={40} color="#10B981" />
        </View>
        <Text style={styles.completionTitle}>Session Complete!</Text>
        <Text style={styles.completionSubtitle}>
          You scored {finalScore}% ({correctAnswers}/{ROUNDS_PER_SESSION} correct).
        </Text>
        
        <TouchableOpacity 
          style={styles.continueBtn}
          onPress={() => {
            saveSessionProgress(finalScore);
            setSessionCount(0);
            setCorrectAnswers(0);
            setSelectedOptionId(null);
            setIsAnswered(false);
            setShowEli5(false);
            setScenario(null);
            fetchScenario();
          }}
        >
          <Text style={styles.continueBtnText}>Save Progress & Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.dashboardBtn}
          onPress={() => {
            saveSessionProgress(finalScore);
            router.replace('/dashboard');
          }}
        >
          <Text style={styles.dashboardBtnText}>Return to Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading || !scenario) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>
          Analyzing logs and generating dynamic scenario...
        </Text>
      </View>
    );
  }

  const handleOptionClick = (id: string) => {
    if (isAnswered) return;
    setSelectedOptionId(id);
    setIsAnswered(true);
    const opt = scenario?.options?.find(o => o.id === id);
    if (opt?.isCorrect) {
      setCorrectAnswers(p => p + 1);
    }
  };

  const handleNext = () => {
    setSessionCount(p => p + 1);
    if (sessionCount + 1 < ROUNDS_PER_SESSION) {
      setSelectedOptionId(null);
      setIsAnswered(false);
      setShowEli5(false);
      fetchScenario();
    }
  };

  const selectedOption = scenario?.options?.find(o => o.id === selectedOptionId);

  return (
    <View style={styles.workspace}>
      {/* Progress */}
      <View style={styles.progressRow}>
        <Text style={styles.progressRound}>
          Round {sessionCount + 1} of {ROUNDS_PER_SESSION}
        </Text>
        <Text style={styles.difficultyBadge}>
          {scenario.difficulty}
        </Text>
      </View>

      {/* Visual Content Block */}
      {scenario.type === 'stack-trace' ? (
        <View style={[styles.stackTraceContainer, shadow.md]}>
          <View style={styles.stackTraceHeader}>
            <View style={styles.trafficLights}>
              <View style={[styles.trafficDot, { backgroundColor: colors.red500 }]} />
              <View style={[styles.trafficDot, { backgroundColor: colors.yellow500 }]} />
              <View style={[styles.trafficDot, { backgroundColor: colors.green500 }]} />
              <Text style={styles.stackTraceTitle}>{scenario.title}</Text>
            </View>
            {scenario.eli5 && (
              <TouchableOpacity onPress={() => setShowEli5(!showEli5)} style={styles.eli5Btn}>
                <Icons.Wand2 size={12} color="#a78bfa" />
                <Text style={styles.eli5BtnText}>ELI5</Text>
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.stackTraceBody}>
            {renderContentWithHighlights(scenario.content, scenario.highlights)}
          </View>

          {showEli5 && scenario.eli5 && (
            <View style={styles.eli5Container}>
              <View style={{ marginTop: 2 }}><Icons.Wand2 size={16} color="#c084fc" /></View>
              <Text style={styles.eli5Text}>{scenario.eli5}</Text>
            </View>
          )}
        </View>
      ) : (
        <View style={[styles.docContainer, shadow.sm]}>
          <View style={styles.docHeader}>
            <Text style={styles.docHeaderText}>Documentation Snapshot</Text>
            {scenario.eli5 && (
              <TouchableOpacity onPress={() => setShowEli5(!showEli5)} style={styles.docEli5Btn}>
                <Icons.Wand2 size={12} color="#0284c7" />
                <Text style={styles.docEli5BtnText}>ELI5</Text>
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.docBody}>
            <Text style={styles.docBodyText}>
              {renderContentWithHighlights(scenario.content, scenario.highlights)}
            </Text>
          </View>

          {showEli5 && scenario.eli5 && (
            <View style={styles.docEli5Container}>
              <View style={{ marginTop: 2 }}><Icons.Wand2 size={16} color="#0ea5e9" /></View>
              <Text style={styles.docEli5Text}>{scenario.eli5}</Text>
            </View>
          )}
        </View>
      )}

      {/* Quiz Section */}
      <View style={[styles.quizContainer, shadow.sm]}>
        <Text style={styles.quizQuestion}>{scenario.question}</Text>
        
        <View style={styles.quizOptions}>
          {(scenario?.options || []).map(opt => {
            let optStyle: any = styles.optDefault;
            let optTextStyle: any = styles.optTextDefault;

            const isSelected = selectedOptionId === opt.id;

            if (isAnswered) {
              if (opt.isCorrect) {
                optStyle = styles.optCorrect;
                optTextStyle = styles.optTextCorrect;
              } else if (isSelected) {
                optStyle = styles.optWrong;
                optTextStyle = styles.optTextWrong;
              }
            } else if (isSelected) {
              optStyle = styles.optSelected;
              optTextStyle = styles.optTextSelected;
            }

            return (
              <TouchableOpacity
                key={opt.id}
                style={[styles.optBase, optStyle]}
                onPress={() => handleOptionClick(opt.id)}
                disabled={isAnswered}
              >
                <Text style={[styles.optTextBase, optTextStyle]}>{opt.text}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {isAnswered && selectedOption && (
          <View style={[
            styles.resultBox,
            selectedOption.isCorrect ? styles.resultCorrect : styles.resultWrong,
          ]}>
            <View style={styles.resultHeaderRow}>
              {selectedOption.isCorrect ? (
                <><Icons.CheckCircle2 size={18} color="#059669" /><Text style={styles.resultCorrectTitle}>Correct!</Text></>
              ) : (
                <><Icons.XCircle size={18} color="#E11D48" /><Text style={styles.resultWrongTitle}>Incorrect</Text></>
              )}
            </View>
            <Text style={selectedOption.isCorrect ? styles.resultCorrectBody : styles.resultWrongBody}>
              {selectedOption.explanation}
            </Text>
          </View>
        )}
      </View>

      {/* Next Button */}
      {isAnswered && (
        <TouchableOpacity 
          style={[styles.nextBtn, shadow.md]}
          onPress={handleNext}
        >
          <Text style={styles.nextBtnText}>
            {sessionCount + 1 >= ROUNDS_PER_SESSION ? 'Finish Session' : 'Next Scenario'}
          </Text>
        </TouchableOpacity>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  workspace: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  progressRound: {
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  difficultyBadge: {
    fontFamily: 'monospace',
    fontSize: 10,
    fontWeight: '700',
    color: colors.slate400,
    textTransform: 'uppercase',
    letterSpacing: 4,
    backgroundColor: colors.slate100,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  // Stack trace
  stackTraceContainer: {
    backgroundColor: colors.slate900,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.slate800,
  },
  stackTraceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.slate800,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate700,
  },
  trafficLights: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trafficDot: {
    width: 12,
    height: 12,
    borderRadius: 9999,
  },
  stackTraceTitle: {
    marginLeft: 8,
    fontFamily: 'monospace',
    fontSize: 10,
    color: colors.slate400,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  eli5Btn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(51,65,85,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  eli5BtnText: {
    marginLeft: 4,
    fontSize: 10,
    fontWeight: '700',
    color: '#d8b4fe',
    textTransform: 'uppercase',
  },
  stackTraceBody: {
    padding: 16,
    backgroundColor: colors.slate900,
  },
  monoTextLight: {
    color: colors.slate300,
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 20,
  },
  highlightText: {
    backgroundColor: 'rgba(88,28,135,0.5)',
    color: '#e9d5ff',
    fontWeight: '700',
    paddingHorizontal: 4,
  },
  eli5Container: {
    padding: 16,
    backgroundColor: 'rgba(88,28,135,0.3)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(168,85,247,0.2)',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  eli5Text: {
    flex: 1,
    color: '#e9d5ff',
    fontSize: 12,
    lineHeight: 20,
  },
  // Documentation
  docContainer: {
    backgroundColor: colors.slate50,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.slate200,
  },
  docHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.slate100,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate200,
  },
  docHeaderText: {
    fontFamily: 'monospace',
    fontSize: 10,
    color: '#0284c7',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 4,
  },
  docEli5Btn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  docEli5BtnText: {
    marginLeft: 4,
    fontSize: 10,
    fontWeight: '700',
    color: '#0369a1',
    textTransform: 'uppercase',
  },
  docBody: {
    padding: 16,
    backgroundColor: colors.white,
  },
  docBodyText: {
    color: colors.slate700,
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 20,
  },
  docEli5Container: {
    padding: 16,
    backgroundColor: '#f0f9ff',
    borderTopWidth: 1,
    borderTopColor: '#e0f2fe',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  docEli5Text: {
    flex: 1,
    color: '#075985',
    fontSize: 12,
    lineHeight: 20,
  },
  // Quiz
  quizContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate200,
    marginBottom: 24,
  },
  quizQuestion: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.slate800,
    marginBottom: 20,
    lineHeight: 26,
  },
  quizOptions: {
    flexDirection: 'column',
    gap: 12,
  },
  optBase: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  optDefault: {
    backgroundColor: colors.slate50,
    borderColor: colors.slate200,
  },
  optCorrect: {
    backgroundColor: '#ecfdf5',
    borderColor: '#a7f3d0',
  },
  optWrong: {
    backgroundColor: '#fff1f2',
    borderColor: '#fecdd3',
  },
  optSelected: {
    backgroundColor: colors.primaryBg,
    borderColor: '#c7d2fe',
  },
  optTextBase: {
    fontWeight: '500',
    lineHeight: 22,
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
  optTextSelected: {
    color: '#3730a3',
  },
  resultBox: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  resultCorrect: {
    backgroundColor: '#ecfdf5',
    borderColor: '#a7f3d0',
  },
  resultWrong: {
    backgroundColor: '#fff1f2',
    borderColor: '#fecdd3',
  },
  resultHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  resultCorrectTitle: {
    fontWeight: '700',
    color: '#065f46',
  },
  resultWrongTitle: {
    fontWeight: '700',
    color: '#9f1239',
  },
  resultCorrectBody: {
    color: '#064e3b',
    lineHeight: 22,
  },
  resultWrongBody: {
    color: '#881337',
    lineHeight: 22,
  },
  // Next button
  nextBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
  },
  nextBtnText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 18,
  },
  // Completion
  completionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate200,
    marginTop: 24,
    marginHorizontal: 20,
  },
  completionIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#ecfdf5',
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  completionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.slate800,
    marginBottom: 8,
  },
  completionSubtitle: {
    color: colors.slate500,
    marginBottom: 32,
    textAlign: 'center',
  },
  continueBtn: {
    width: '100%',
    backgroundColor: colors.slate900,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  continueBtnText: {
    color: colors.white,
    fontWeight: '700',
  },
  dashboardBtn: {
    width: '100%',
    backgroundColor: colors.slate100,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  dashboardBtnText: {
    color: colors.slate600,
    fontWeight: '700',
  },
  // Loading
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
    textAlign: 'center',
  },
});
