import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, TextInput, Platform, Alert } from 'react-native';
import { useListeningSession } from '../../hooks/useListeningSession';
import * as Icons from 'lucide-react-native';
import * as Speech from 'expo-speech';
import Voice, { SpeechResultsEvent, SpeechErrorEvent } from '@react-native-voice/voice';

type PracticeMode = 'quiz' | 'dictation' | 'shadowing';

function renderLineWithIdioms(line: any) {
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

  // Playback queue tracking
  const utteranceQueue = useRef<string[]>([]);
  const currentUtteranceIdx = useRef(0);

  useEffect(() => {
    // Setup Voice listeners
    try {
      Voice.onSpeechResults = (e: SpeechResultsEvent) => {
        const text = e.value?.[0] || '';
        setSpokenText(text);
        calculateShadowScore(text);
      };
      Voice.onSpeechError = (e: SpeechErrorEvent) => {
        console.log('Speech error:', e.error);
        setIsRecording(false);
        if (e.error?.message?.includes('not allowed')) {
          Alert.alert('Microphone Access', 'Please allow microphone permissions to use shadowing.');
        }
      };
      Voice.onSpeechEnd = () => setIsRecording(false);
    } catch (err) {
      console.log('Voice module not available or errored:', err);
    }

    return () => {
      Speech.stop();
      try {
        Voice.destroy().then(Voice.removeAllListeners);
      } catch (e) {}
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
    
    if (scenario?.dictation?.answers) {
      setDictationAnswers(new Array(scenario.dictation.answers.length).fill(''));
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

  // --- Audio Player Logic ---
  const handlePlayPause = async () => {
    if (isPlaying) {
      Speech.stop();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    
    // Naive continuous playback (expo-speech handles queues automatically if called sequentially)
    // But to get a callback when it's done, we need to track it.
    for (let i = 0; i < scenario.dialogue.length; i++) {
      const line = scenario.dialogue[i];
      // For basic variety, we can use pitch or rate based on speaker name length
      const pitch = (line.speaker?.length || 0) % 2 === 0 ? 1 : 1.1;
      
      Speech.speak(line.text, {
        language: 'en-US',
        pitch,
        rate: 0.9,
        onDone: () => {
          if (i === scenario.dialogue.length - 1) {
            setIsPlaying(false);
          }
        },
        onStopped: () => {
          setIsPlaying(false);
        }
      });
    }
  };

  // --- Quiz Logic ---
  const currentQuestion = scenario.questions ? scenario.questions[currentQuestionIdx] : null;
  const handleOptionClick = (id: string) => {
    if (isAnswered) return;
    setSelectedOptionId(id);
    setIsAnswered(true);
  };

  // --- Dictation Logic ---
  const renderDictationLine = () => {
    if (!scenario.dictation) return null;
    const parts = scenario.dictation.textWithBlanks.split('____');
    
    return (
      <View className="flex-row flex-wrap items-center">
        {parts.map((part: string, i: number) => (
          <React.Fragment key={i}>
            <Text className="text-slate-700 text-base leading-8">{part}</Text>
            {i < parts.length - 1 && (
              <TextInput
                className={`border-b-2 px-2 text-base mx-1 min-w-[80px] h-8 p-0 text-center ${dictationChecked ? (dictationAnswers[i]?.toLowerCase().trim() === scenario.dictation.answers[i]?.toLowerCase() ? 'border-emerald-500 text-emerald-700 bg-emerald-50' : 'border-rose-500 text-rose-700 bg-rose-50') : 'border-slate-300 text-slate-800'}`}
                value={dictationAnswers[i] || ''}
                onChangeText={(val) => {
                  const newAnswers = [...dictationAnswers];
                  newAnswers[i] = val;
                  setDictationAnswers(newAnswers);
                  setDictationChecked(false);
                }}
                placeholder="type"
                placeholderTextColor="#cbd5e1"
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          </React.Fragment>
        ))}
      </View>
    );
  };

  // --- Shadowing Logic ---
  const toggleRecording = async () => {
    try {
      if (isRecording) {
        await Voice.stop();
        setIsRecording(false);
      } else {
        Speech.stop();
        setIsPlaying(false);
        setSpokenText('');
        setShadowScore(null);
        await Voice.start('en-US');
        setIsRecording(true);
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Microphone Error', 'Could not access speech recognition. Check permissions or try on a real device.');
    }
  };

  const calculateShadowScore = (spoken: string) => {
    if (!scenario.shadowing) return;
    const targetWords = scenario.shadowing.targetText.toLowerCase().replace(/[.,?!]/g, '').split(' ');
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
      
      {/* Audio Player Card */}
      <View className="bg-white rounded-[20px] p-6 mb-6 shadow-sm border border-slate-200 overflow-hidden">
        {/* Top Gradient Bar */}
        <View className="absolute top-0 left-0 right-0 h-1.5 bg-cyan-500" />
        
        <Text className="text-slate-900 text-xl font-black mb-1 mt-2 text-center">{scenario.title}</Text>
        <Text className="text-slate-500 text-sm mb-6 text-center italic">{scenario.context}</Text>

        <View className="flex-row items-center justify-between">
          <TouchableOpacity 
            className="w-16 h-16 bg-cyan-500 rounded-full items-center justify-center shadow-md"
            onPress={handlePlayPause}
          >
            {isPlaying ? <Icons.Square size={24} color="white" /> : <Icons.Play size={24} color="white" style={{ marginLeft: 4 }} />}
          </TouchableOpacity>
          
          <View className="flex-1 flex-row items-center justify-between mx-4 h-10 overflow-hidden gap-1">
            {[...Array(15)].map((_, i) => (
              <View 
                key={i} 
                className={`w-1.5 rounded-full ${isPlaying ? 'bg-cyan-400' : 'bg-cyan-100'}`} 
                style={{ height: isPlaying ? 16 + Math.random() * 24 : 8 }} 
              />
            ))}
          </View>
        </View>

        <TouchableOpacity 
          className="mt-6 flex-row items-center justify-center py-2 rounded-xl"
          onPress={() => setShowTranscript(!showTranscript)}
        >
          {showTranscript ? <Icons.EyeOff size={14} color="#06b6d4" /> : <Icons.Eye size={14} color="#06b6d4" />}
          <Text className="text-cyan-600 font-bold ml-2 text-xs uppercase tracking-widest">{showTranscript ? 'Hide Transcript' : 'Show Transcript'}</Text>
        </TouchableOpacity>

        {showTranscript && (
          <View className="mt-4 pt-4 border-t border-slate-200 border-dashed">
            {scenario.dialogue.map((line: any, idx: number) => (
              <View key={idx} className="mb-4">
                <Text className="font-bold text-[11px] uppercase text-slate-400 tracking-widest mb-1">{line.speaker}</Text>
                {renderLineWithIdioms(line)}
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Practice Area */}
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
          
          {/* --- QUIZ MODE --- */}
          {activeMode === 'quiz' && currentQuestion && (
            <View>
              <View className="flex-row justify-between mb-4">
                <Text className="text-lg font-black text-slate-800 flex-1 pr-4 leading-tight">{currentQuestion.text}</Text>
                <Text className="font-bold text-cyan-600 text-xs mt-1">Q {currentQuestionIdx + 1}/{scenario.questions.length}</Text>
              </View>
              
              <View className="flex-col gap-3">
                {currentQuestion.options.map((opt: any) => {
                  const isSelected = selectedOptionId === opt.id;
                  let bgColor = 'bg-white';
                  let borderColor = 'border-slate-200';
                  let textColor = 'text-slate-600';

                  if (isAnswered) {
                    if (opt.isCorrect) {
                      bgColor = 'bg-emerald-50';
                      borderColor = 'border-emerald-500';
                      textColor = 'text-emerald-800';
                    } else if (isSelected) {
                      bgColor = 'bg-rose-50';
                      borderColor = 'border-rose-500';
                      textColor = 'text-rose-800';
                    }
                  } else if (isSelected) {
                    borderColor = 'border-cyan-500';
                    bgColor = 'bg-cyan-50';
                  }

                  return (
                    <TouchableOpacity
                      key={opt.id}
                      className={`p-4 rounded-xl border-2 ${bgColor} ${borderColor}`}
                      onPress={() => handleOptionClick(opt.id)}
                      disabled={isAnswered}
                    >
                      <Text className={`font-bold ${textColor}`}>{opt.text}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {isAnswered && (
                <View className="mt-6">
                  {currentQuestion.options.find((o: any) => o.id === selectedOptionId)?.isCorrect ? (
                    <View className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl mb-4">
                      <View className="flex-row items-center gap-2 mb-1">
                        <Icons.CheckCircle2 size={18} color="#10b981" />
                        <Text className="font-bold text-emerald-800">Correct!</Text>
                      </View>
                      <Text className="text-slate-600 text-sm">
                        {currentQuestion.options.find((o: any) => o.id === selectedOptionId)?.explanation}
                      </Text>
                    </View>
                  ) : (
                    <View className="bg-rose-50 border border-rose-200 p-4 rounded-xl mb-4">
                      <View className="flex-row items-center gap-2 mb-1">
                        <Icons.XCircle size={18} color="#e11d48" />
                        <Text className="font-bold text-rose-800">Incorrect</Text>
                      </View>
                      <Text className="text-slate-600 text-sm">
                        {currentQuestion.options.find((o: any) => o.id === selectedOptionId)?.explanation}
                      </Text>
                    </View>
                  )}

                  {currentQuestionIdx < scenario.questions.length - 1 && (
                    <TouchableOpacity 
                      className="bg-cyan-600 py-3.5 rounded-xl items-center shadow-sm"
                      onPress={() => {
                        setCurrentQuestionIdx(p => p + 1);
                        setSelectedOptionId(null);
                        setIsAnswered(false);
                      }}
                    >
                      <Text className="text-white font-bold">Next Question</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          )}

          {/* --- DICTATION MODE --- */}
          {activeMode === 'dictation' && scenario.dictation && (
            <View>
              <Text className="text-lg font-black text-slate-800 mb-4">Listen to the audio and fill in the missing words.</Text>
              <View className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-4">
                {renderDictationLine()}
              </View>
              <TouchableOpacity 
                className="bg-indigo-600 py-3.5 rounded-xl items-center shadow-sm"
                onPress={() => setDictationChecked(true)}
              >
                <Text className="text-white font-bold">Check Spelling</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* --- SHADOWING MODE --- */}
          {activeMode === 'shadowing' && scenario.shadowing && (
            <View>
              <Text className="text-lg font-black text-slate-800 mb-1">Listen and Repeat</Text>
              <Text className="text-slate-500 mb-4">Read the exact sentence below into the microphone.</Text>

              <View className="bg-pink-50 p-5 rounded-2xl border border-pink-100 mb-6">
                <Text className="text-pink-900 font-medium text-lg text-center italic">"{scenario.shadowing.targetText}"</Text>
              </View>

              <TouchableOpacity 
                className={`w-16 h-16 rounded-full items-center justify-center self-center shadow-md mb-6 ${isRecording ? 'bg-rose-500' : 'bg-pink-500'}`}
                onPress={toggleRecording}
              >
                {isRecording ? <Icons.Square size={24} color="white" /> : <Icons.Mic size={24} color="white" />}
              </TouchableOpacity>

              {shadowScore !== null && (
                <View className="bg-slate-50 border border-slate-200 rounded-xl p-4 items-center">
                  <Text className={`font-black text-2xl ${shadowScore > 80 ? 'text-emerald-500' : shadowScore > 50 ? 'text-amber-500' : 'text-rose-500'}`}>
                    {shadowScore}% Accuracy
                  </Text>
                  <Text className="text-slate-500 text-sm mt-2 text-center">
                    You said: "{spokenText}"
                  </Text>
                </View>
              )}
            </View>
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
