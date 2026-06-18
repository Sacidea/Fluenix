import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Alert, StyleSheet } from 'react-native';
import { useListeningSession } from '../../hooks/useListeningSession';
import * as Icons from 'lucide-react-native';
import * as Speech from 'expo-speech';
let ExpoSpeechRecognitionModule: any = { start: async () => {}, stop: async () => {} };
let useSpeechRecognitionEvent: any = (_event: string, _handler: any) => {};

try {
  const speechRecognition = require('expo-speech-recognition');
  if (speechRecognition?.ExpoSpeechRecognitionModule) {
    ExpoSpeechRecognitionModule = speechRecognition.ExpoSpeechRecognitionModule;
    useSpeechRecognitionEvent = speechRecognition.useSpeechRecognitionEvent;
  }
} catch (e) {
  console.warn('expo-speech-recognition not available in ListeningWorkspace');
}
import { colors, shadow } from '../../utils/theme';

import { usePermissions } from '../../hooks/usePermissions';

import { ListeningPlayer } from './ListeningPlayer';
import { ListeningQuiz } from './ListeningQuiz';
import { ListeningDictation } from './ListeningDictation';
import { ListeningShadowing } from './ListeningShadowing';

type PracticeMode = 'quiz' | 'dictation' | 'shadowing';

type DialogueLine = {
  text: string;
  speaker?: string;
  idiomHighlight?: {
    word: string;
    meaning: string;
  };
};

function renderLineWithIdioms(line: DialogueLine) {
  if (!line.idiomHighlight || !line.idiomHighlight.word) return <Text style={styles.dialogueText}>{line.text}</Text>;

  const { word, meaning } = line.idiomHighlight;
  const parts = line.text.split(new RegExp("(" + word + ")", 'gi'));

  return (
    <Text style={styles.dialogueText}>
      {parts.map((part: string, i: number) => {
        if (part.toLowerCase() === word.toLowerCase()) {
          return (
            <Text 
              key={i} 
              style={styles.idiomHighlight}
              onPress={() => Alert.alert('Idiom Meaning', meaning)}
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

export function ListeningWorkspace() {
  const { activeScenario: scenario, isLoadingScenario, loadNextScenario, saveSession } = useListeningSession();
  const { requestMicrophonePermission, handleVoiceError } = usePermissions();

  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [activeMode, setActiveMode] = useState<PracticeMode>('quiz');

  // Mode 1: Quiz state
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  // Mode 2: Dictation state
  const [dictationAnswers, setDictationAnswers] = useState<string[]>([]);
  const [dictationChecked, setDictationChecked] = useState(false);

  // Mode 3: Shadowing state
  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [shadowScore, setShadowScore] = useState<number | null>(null);

  useSpeechRecognitionEvent('result', (e: any) => {
    if (e.results && e.results.length > 0) {
      const text = e.results[0].transcript;
      setSpokenText(text);
      calculateShadowScore(text);
    }
  });

  useSpeechRecognitionEvent('error', (e: any) => {
    console.log('Speech error:', e.error);
    setIsRecording(false);
    handleVoiceError(e.error);
  });

  useSpeechRecognitionEvent('end', () => setIsRecording(false));

  useEffect(() => {
    Speech.stop();
    return () => {
      Speech.stop();
      ExpoSpeechRecognitionModule?.stop();
    };
  }, []);

  useEffect(() => {
    Speech.stop();
    setIsPlaying(false);
    setCurrentQuestionIdx(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setCorrectAnswersCount(0);
    setShowTranscript(false);
    setActiveMode('quiz');
    
    if ((scenario?.dictation as any)?.answers) {
      setDictationAnswers(new Array((scenario!.dictation as any).answers.length).fill(''));
      setDictationChecked(false);
    }
    setShadowScore(null);
    setSpokenText('');
  }, [scenario]);

  if (isLoadingScenario || !scenario) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#06b6d4" />
        <Text style={styles.loadingTitle}>Generating Audio...</Text>
        <Text style={styles.loadingSubtitle}>Preparing a new FAANG-style listening task for you.</Text>
      </View>
    );
  }

  const handlePlayPause = async () => {
    if (isPlaying) {
      Speech.stop();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    
    const voices = await Speech.getAvailableVoicesAsync();
    const englishVoices = voices.filter(v => v.language.startsWith('en'));
    
    const femaleKeywords = ['female', 'woman', 'girl', 'zira', 'samantha', 'victoria', 'karen', 'moira', 'tessa', 'ava', 'susan', 'hazel', 'fiona', 'aria', 'jenny', 'amy', 'olivia', 'emma'];
    const maleKeywords = ['male', 'man', 'boy', 'david', 'mark', 'james', 'daniel', 'george', 'alex', 'fred', 'christopher', 'guy', 'aaron', 'brian', 'andrew', 'ryan', 'steffan'];
    
    const fPool = englishVoices.filter(v => femaleKeywords.some(k => v.name.toLowerCase().includes(k)));
    const mPool = englishVoices.filter(v => maleKeywords.some(k => v.name.toLowerCase().includes(k)));
    
    const femalePool = fPool.length > 0 ? fPool : englishVoices;
    const malePool = mPool.length > 0 ? mPool : englishVoices;
    
    const speakerVoiceMap: Record<string, string> = {};
    let femaleVoiceIdx = 0;
    let maleVoiceIdx = 0;

    for (let i = 0; i < (scenario.dialogue as unknown[]).length; i++) {
      const line = (scenario.dialogue as any)[i];
      const gender = (line.gender || 'male').toLowerCase();
      const speakerName = line.speaker || `Speaker_${i}`;

      if (!speakerVoiceMap[speakerName]) {
        const targetPool = gender === 'female' ? femalePool : malePool;
        const poolToUse = targetPool.length > 0 ? targetPool : voices;
        if (poolToUse.length > 0) {
          if (gender === 'female') {
            speakerVoiceMap[speakerName] = poolToUse[femaleVoiceIdx % poolToUse.length].identifier;
            femaleVoiceIdx++;
          } else {
            speakerVoiceMap[speakerName] = poolToUse[maleVoiceIdx % poolToUse.length].identifier;
            maleVoiceIdx++;
          }
        }
      }
    }

    // Sequential playback with natural pauses between speakers
    const lines = scenario.dialogue as any[];
    let currentLineIdx = 0;

    const speakNext = () => {
      if (currentLineIdx >= lines.length) {
        setIsPlaying(false);
        return;
      }
      const line = lines[currentLineIdx];
      const speakerName = line.speaker || `Speaker_${currentLineIdx}`;
      const selectedVoice = speakerVoiceMap[speakerName];
      currentLineIdx++;

      Speech.speak(line.text, {
        language: 'en-US',
        voice: selectedVoice,
        rate: 0.9,
        onDone: () => {
          // Natural pause between speakers
          setTimeout(speakNext, 400);
        },
        onStopped: () => {
          setIsPlaying(false);
        }
      });
    };
    speakNext();
  };

  const handleOptionClick = (id: string) => {
    if (isAnswered) return;
    setSelectedOptionId(id);
    setIsAnswered(true);

    const currentQuestion = (scenario?.questions as any)?.[currentQuestionIdx];
    const selectedOption = currentQuestion?.options?.find((o: any) => o.id === id);
    if (selectedOption?.isCorrect) {
      setCorrectAnswersCount(p => p + 1);
    }
  };

  const toggleRecording = async () => {
    try {
      if (isRecording) {
        await ExpoSpeechRecognitionModule?.stop();
        setIsRecording(false);
      } else {
        const hasPerm = await requestMicrophonePermission();
        if (!hasPerm) return;

        Speech.stop();
        setIsPlaying(false);
        setSpokenText('');
        setShadowScore(null);
        await ExpoSpeechRecognitionModule?.start({ lang: 'en-US', interimResults: true });
        setIsRecording(true);
      }
    } catch (e) {
      console.error(e);
      handleVoiceError(e);
    }
  };

  const calculateShadowScore = (spoken: string) => {
    if (!scenario.shadowing) return;
    const targetWords = (scenario.shadowing as any).targetText.toLowerCase().replace(/[.,?!]/g, '').split(' ');
    const spokenWords = spoken.toLowerCase().replace(/[.,?!]/g, '').split(' ');
    
    let matchCount = 0;
    targetWords.forEach((word: string) => {
      if (spokenWords.includes(word)) matchCount++;
    });
    
    const accuracy = Math.round((matchCount / targetWords.length) * 100);
    setShadowScore(Math.min(100, accuracy));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      
      <ListeningPlayer 
        scenario={scenario}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        showTranscript={showTranscript}
        onToggleTranscript={() => setShowTranscript(!showTranscript)}
        renderLineWithIdioms={renderLineWithIdioms}
      />

      <View style={styles.workspaceCard}>
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, activeMode === 'quiz' && styles.tabButtonActive]}
            onPress={() => setActiveMode('quiz')}
          >
            <Icons.ListChecks size={18} color={activeMode === 'quiz' ? colors.cyan500 : colors.slate500} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeMode === 'dictation' && styles.tabButtonActive]}
            onPress={() => setActiveMode('dictation')}
          >
            <Icons.Keyboard size={18} color={activeMode === 'dictation' ? colors.purple500 : colors.slate500} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeMode === 'shadowing' && styles.tabButtonActive]}
            onPress={() => setActiveMode('shadowing')}
          >
            <Icons.Mic size={18} color={activeMode === 'shadowing' ? colors.pink500 : colors.slate500} />
          </TouchableOpacity>
        </View>

        <View style={styles.workspaceContent}>
          {activeMode === 'quiz' && (
            <ListeningQuiz 
              scenario={scenario}
              currentQuestionIdx={currentQuestionIdx}
              selectedOptionId={selectedOptionId}
              isAnswered={isAnswered}
              onOptionSelect={handleOptionClick}
              onNextQuestion={async () => {
                if (currentQuestionIdx < (scenario.questions as unknown[]).length - 1) {
                  setCurrentQuestionIdx(p => p + 1);
                  setSelectedOptionId(null);
                  setIsAnswered(false);
                } else {
                  const total = (scenario.questions as unknown[]).length;
                  const finalScore = Math.round((correctAnswersCount / total) * 100) || 0;
                  await saveSession(finalScore);
                  loadNextScenario();
                }
              }}
            />
          )}

          {activeMode === 'dictation' && (
            <ListeningDictation 
              scenario={scenario}
              dictationAnswers={dictationAnswers}
              dictationChecked={dictationChecked}
              onUpdateAnswer={(i, val) => {
                const newAnswers = [...dictationAnswers];
                newAnswers[i] = val;
                setDictationAnswers(newAnswers);
                setDictationChecked(false);
              }}
              onCheckSpelling={() => setDictationChecked(true)}
            />
          )}

          {activeMode === 'shadowing' && (
            <ListeningShadowing 
              scenario={scenario}
              isRecording={isRecording}
              shadowScore={shadowScore}
              spokenText={spokenText}
              onToggleRecording={toggleRecording}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  dialogueText: {
    color: colors.slate700,
    fontSize: 14,
    lineHeight: 22,
  },
  idiomHighlight: {
    color: '#0e7490',
    fontWeight: '700',
    backgroundColor: '#cffafe',
    textDecorationLine: 'underline',
    textDecorationStyle: 'dashed',
    textDecorationColor: '#06b6d4',
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
  loadingTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.slate800,
    marginTop: 16,
    marginBottom: 8,
  },
  loadingSubtitle: {
    color: colors.slate500,
    textAlign: 'center',
  },
  workspaceCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.slate200,
    padding: 4,
    marginBottom: 24,
    ...shadow.sm,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.slate50,
    padding: 4,
    borderRadius: 16,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  tabButtonActive: {
    backgroundColor: colors.white,
    ...shadow.sm,
  },
  workspaceContent: {
    padding: 20,
  },
  nextButton: {
    backgroundColor: colors.slate800,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    ...shadow.sm,
  },
  nextButtonText: {
    color: colors.white,
    fontWeight: '700',
  },
});
