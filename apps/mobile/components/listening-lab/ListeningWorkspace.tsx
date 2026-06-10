import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { useListeningSession } from '../../hooks/useListeningSession';
import * as Icons from 'lucide-react-native';
import * as Speech from 'expo-speech';
// import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition';
const ExpoSpeechRecognitionModule = { start: async (_opts?: any) => {}, stop: async () => {} };
const useSpeechRecognitionEvent = (event: string, callback: any) => {};

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
  if (!line.idiomHighlight || !line.idiomHighlight.word) return <Text className="text-slate-700 text-base">{line.text}</Text>;

  const { word, meaning } = line.idiomHighlight;
  const parts = line.text.split(new RegExp("(" + word + ")", 'gi'));

  return (
    <Text className="text-slate-700 text-base leading-relaxed">
      {parts.map((part: string, i: number) => {
        if (part.toLowerCase() === word.toLowerCase()) {
          return (
            <Text 
              key={i} 
              className="text-cyan-700 font-bold bg-cyan-100" 
              style={{ textDecorationLine: 'underline', textDecorationStyle: 'dashed', textDecorationColor: '#06b6d4' }}
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
  const { activeScenario: scenario, isLoadingScenario, loadNextScenario } = useListeningSession();
  const { requestMicrophonePermission, handleVoiceError } = usePermissions();

  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [activeMode, setActiveMode] = useState<PracticeMode>('quiz');

  // Mode 1: Quiz state
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Mode 2: Dictation state
  const [dictationAnswers, setDictationAnswers] = useState<string[]>([]);
  const [dictationChecked, setDictationChecked] = useState(false);

  // Mode 3: Shadowing state
  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [shadowScore, setShadowScore] = useState<number | null>(null);

  useSpeechRecognitionEvent('result', (e) => {
    if (e.results && e.results.length > 0) {
      const text = e.results[0].transcript;
      setSpokenText(text);
      calculateShadowScore(text);
    }
  });

  useSpeechRecognitionEvent('error', (e) => {
    console.log('Speech error:', e.error);
    setIsRecording(false);
    handleVoiceError(e.error);
  });

  useSpeechRecognitionEvent('end', () => setIsRecording(false));

  useEffect(() => {
    Speech.stop();
    return () => {
      Speech.stop();
      ExpoSpeechRecognitionModule.stop();
    };
  }, []);

  useEffect(() => {
    Speech.stop();
    setIsPlaying(false);
    setCurrentQuestionIdx(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
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
      <View className="flex-1 items-center justify-center p-8 mt-6 mx-5 bg-white rounded-2xl border border-slate-200">
        <ActivityIndicator size="large" color="#06b6d4" />
        <Text className="text-xl font-black text-slate-800 mt-4 mb-2">Generating Audio...</Text>
        <Text className="text-slate-500 text-center">Preparing a new FAANG-style listening task for you.</Text>
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
    
    for (let i = 0; i < (scenario.dialogue as unknown[]).length; i++) {
      const line = (scenario.dialogue as any)[i];
      const pitch = (line.speaker?.length || 0) % 2 === 0 ? 1 : 1.1;
      
      Speech.speak(line.text, {
        language: 'en-US',
        pitch,
        rate: 0.9,
        onDone: () => {
          if (i === (scenario.dialogue as unknown[]).length - 1) {
            setIsPlaying(false);
          }
        },
        onStopped: () => {
          setIsPlaying(false);
        }
      });
    }
  };

  const handleOptionClick = (id: string) => {
    if (isAnswered) return;
    setSelectedOptionId(id);
    setIsAnswered(true);
  };

  const toggleRecording = async () => {
    try {
      if (isRecording) {
        await ExpoSpeechRecognitionModule.stop();
        setIsRecording(false);
      } else {
        const hasPerm = await requestMicrophonePermission();
        if (!hasPerm) return;

        Speech.stop();
        setIsPlaying(false);
        setSpokenText('');
        setShadowScore(null);
        await ExpoSpeechRecognitionModule.start({ lang: 'en-US', interimResults: true });
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
    <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
      
      <ListeningPlayer 
        scenario={scenario}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        showTranscript={showTranscript}
        onToggleTranscript={() => setShowTranscript(!showTranscript)}
        renderLineWithIdioms={renderLineWithIdioms}
      />

      <View className="bg-white rounded-3xl border border-slate-200 p-1 shadow-sm mb-6">
        <View className="flex-row items-center bg-slate-50 p-1 rounded-2xl">
          <TouchableOpacity 
            className={`flex-1 items-center justify-center py-3 rounded-xl ${activeMode === 'quiz' ? 'bg-white shadow-sm' : ''}`}
            onPress={() => setActiveMode('quiz')}
          >
            <Icons.ListChecks size={18} color={activeMode === 'quiz' ? '#06b6d4' : '#64748b'} />
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 items-center justify-center py-3 rounded-xl ${activeMode === 'dictation' ? 'bg-white shadow-sm' : ''}`}
            onPress={() => setActiveMode('dictation')}
          >
            <Icons.Keyboard size={18} color={activeMode === 'dictation' ? '#8b5cf6' : '#64748b'} />
          </TouchableOpacity>
          <TouchableOpacity 
            className={`flex-1 items-center justify-center py-3 rounded-xl ${activeMode === 'shadowing' ? 'bg-white shadow-sm' : ''}`}
            onPress={() => setActiveMode('shadowing')}
          >
            <Icons.Mic size={18} color={activeMode === 'shadowing' ? '#ec4899' : '#64748b'} />
          </TouchableOpacity>
        </View>

        <View className="p-5">
          {activeMode === 'quiz' && (
            <ListeningQuiz 
              scenario={scenario}
              currentQuestionIdx={currentQuestionIdx}
              selectedOptionId={selectedOptionId}
              isAnswered={isAnswered}
              onOptionSelect={handleOptionClick}
              onNextQuestion={() => {
                setCurrentQuestionIdx(p => p + 1);
                setSelectedOptionId(null);
                setIsAnswered(false);
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

      <TouchableOpacity 
        className="bg-slate-800 py-4 rounded-xl items-center shadow-sm"
        onPress={loadNextScenario}
      >
        <Text className="text-white font-bold">Next AI Scenario</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
