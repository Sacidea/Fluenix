import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, ScrollView, Platform } from 'react-native';
import * as Icons from 'lucide-react-native';
import { useUser, useAuth } from '@clerk/clerk-expo';
import axios from 'axios';
import { useRouter } from 'expo-router';

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

const getApiUrl = () => {
  if (Platform.OS === 'web') return 'http://localhost:3001';
  return process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:3001';
};
const API_URL = getApiUrl();

// Highlight renderer for Mobile
function renderContentWithHighlights(content: string, highlights?: { word: string; tooltip: string }[]) {
  if (!highlights || highlights.length === 0) return <Text className="text-slate-300 font-mono text-sm leading-relaxed">{content}</Text>;

  const words = highlights.map(h => h.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp("(" + words.join('|') + ")", 'g');
  const parts = content.split(regex);

  return (
    <Text className="text-slate-300 font-mono text-sm leading-relaxed">
      {parts.map((part, i) => {
        const highlight = highlights.find(h => h.word === part);
        if (highlight) {
          return (
            <Text 
              key={i} 
              onPress={() => {
                if (Platform.OS === 'web') {
                  window.alert(`Highlight: ${highlight.tooltip}`);
                } else {
                  Alert.alert("Highlight", highlight.tooltip);
                }
              }}
              className="bg-purple-900/50 text-purple-200 font-bold px-1"
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
      const token = await getToken();
      await axios.post(
        `${API_URL}/api/sessions/complete`,
        {
          type: 'error-decoding',
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
      <View className="flex-1 items-center justify-center p-6 bg-white rounded-2xl border border-slate-200 mt-6 mx-5 shadow-sm">
        <View className="w-20 h-20 bg-emerald-50 rounded-full items-center justify-center mb-6">
          <Icons.CheckCircle2 size={40} color="#10B981" />
        </View>
        <Text className="text-2xl font-black text-slate-800 mb-2">Session Complete!</Text>
        <Text className="text-slate-500 mb-8 text-center">
          You scored {finalScore}% ({correctAnswers}/{ROUNDS_PER_SESSION} correct).
        </Text>
        
        <TouchableOpacity 
          className="w-full bg-slate-900 py-4 rounded-xl items-center mb-4"
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
          <Text className="text-white font-bold">Save Progress & Continue</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="w-full bg-slate-100 py-4 rounded-xl items-center"
          onPress={() => {
            saveSessionProgress(finalScore);
            router.replace('/dashboard');
          }}
        >
          <Text className="text-slate-600 font-bold">Return to Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loading || !scenario) {
    return (
      <View className="flex-1 items-center justify-center p-8 mt-6 mx-5 bg-white rounded-2xl border border-slate-200">
        <ActivityIndicator size="large" color="#6366f1" />
        <Text className="text-slate-500 font-medium mt-4 text-center">
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
    <View className="px-5 pt-4 pb-8">
      {/* Progress */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="font-mono text-xs font-black text-indigo-600 tracking-widest uppercase">
          Round {sessionCount + 1} of {ROUNDS_PER_SESSION}
        </Text>
        <Text className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">
          {scenario.difficulty}
        </Text>
      </View>

      {/* Visual Content Block */}
      {scenario.type === 'stack-trace' ? (
        <View className="bg-slate-900 rounded-2xl overflow-hidden mb-6 shadow-md border border-slate-800">
          <View className="flex-row items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
            <View className="flex-row items-center gap-1.5">
              <View className="w-3 h-3 rounded-full bg-red-500" />
              <View className="w-3 h-3 rounded-full bg-yellow-500" />
              <View className="w-3 h-3 rounded-full bg-green-500" />
              <Text className="ml-2 font-mono text-[10px] text-slate-400 font-bold uppercase">{scenario.title}</Text>
            </View>
            {scenario.eli5 && (
              <TouchableOpacity onPress={() => setShowEli5(!showEli5)} className="flex-row items-center bg-slate-700/50 px-2 py-1 rounded">
                <Icons.Wand2 size={12} color="#a78bfa" />
                <Text className="ml-1 text-[10px] font-bold text-purple-300 uppercase">ELI5</Text>
              </TouchableOpacity>
            )}
          </View>
          
          <View className="p-4 bg-slate-900">
            {renderContentWithHighlights(scenario.content, scenario.highlights)}
          </View>

          {showEli5 && scenario.eli5 && (
            <View className="p-4 bg-purple-900/30 border-t border-purple-500/20 flex-row items-start gap-3">
              <View className="mt-0.5"><Icons.Wand2 size={16} color="#c084fc" /></View>
              <Text className="flex-1 text-purple-200 text-sm leading-relaxed">{scenario.eli5}</Text>
            </View>
          )}
        </View>
      ) : (
        <View className="bg-slate-50 rounded-2xl overflow-hidden mb-6 shadow-sm border border-slate-200">
          <View className="flex-row items-center justify-between px-4 py-3 bg-slate-100 border-b border-slate-200">
            <Text className="font-mono text-[10px] text-sky-600 font-bold uppercase tracking-widest">Documentation Snapshot</Text>
            {scenario.eli5 && (
              <TouchableOpacity onPress={() => setShowEli5(!showEli5)} className="flex-row items-center bg-sky-100 px-2 py-1 rounded">
                <Icons.Wand2 size={12} color="#0284c7" />
                <Text className="ml-1 text-[10px] font-bold text-sky-700 uppercase">ELI5</Text>
              </TouchableOpacity>
            )}
          </View>
          
          <View className="p-4 bg-white">
            <Text className="text-slate-700 font-mono text-sm leading-relaxed">
              {renderContentWithHighlights(scenario.content, scenario.highlights)}
            </Text>
          </View>

          {showEli5 && scenario.eli5 && (
            <View className="p-4 bg-sky-50 border-t border-sky-100 flex-row items-start gap-3">
              <View className="mt-0.5"><Icons.Wand2 size={16} color="#0ea5e9" /></View>
              <Text className="flex-1 text-sky-800 text-sm leading-relaxed">{scenario.eli5}</Text>
            </View>
          )}
        </View>
      )}

      {/* Quiz Section */}
      <View className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mb-6">
        <Text className="text-lg font-bold text-slate-800 mb-5 leading-relaxed">{scenario.question}</Text>
        
        <View className="flex-col gap-3">
          {(scenario?.options || []).map(opt => {
            const isSelected = selectedOptionId === opt.id;
            let bgColor = 'bg-slate-50';
            let borderColor = 'border-slate-200';
            let textColor = 'text-slate-700';

            if (isAnswered) {
              if (opt.isCorrect) {
                bgColor = 'bg-emerald-50';
                borderColor = 'border-emerald-200';
                textColor = 'text-emerald-800';
              } else if (isSelected) {
                bgColor = 'bg-rose-50';
                borderColor = 'border-rose-200';
                textColor = 'text-rose-800';
              }
            } else if (isSelected) {
              bgColor = 'bg-indigo-50';
              borderColor = 'border-indigo-200';
              textColor = 'text-indigo-800';
            }

            return (
              <TouchableOpacity
                key={opt.id}
                className={`p-4 rounded-xl border ${bgColor} ${borderColor}`}
                onPress={() => handleOptionClick(opt.id)}
                disabled={isAnswered}
              >
                <Text className={`font-medium ${textColor} leading-relaxed`}>{opt.text}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {isAnswered && selectedOption && (
          <View className={`mt-5 p-4 rounded-xl border ${selectedOption.isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
            <View className="flex-row items-center gap-2 mb-2">
              {selectedOption.isCorrect ? (
                <><Icons.CheckCircle2 size={18} color="#059669" /><Text className="font-bold text-emerald-800">Correct!</Text></>
              ) : (
                <><Icons.XCircle size={18} color="#E11D48" /><Text className="font-bold text-rose-800">Incorrect</Text></>
              )}
            </View>
            <Text className={selectedOption.isCorrect ? 'text-emerald-900 leading-relaxed' : 'text-rose-900 leading-relaxed'}>
              {selectedOption.explanation}
            </Text>
          </View>
        )}
      </View>

      {/* Next Button */}
      {isAnswered && (
        <TouchableOpacity 
          className="bg-indigo-600 py-4 rounded-xl items-center shadow-md mb-8"
          onPress={handleNext}
        >
          <Text className="text-white font-bold text-lg">
            {sessionCount + 1 >= ROUNDS_PER_SESSION ? 'Finish Session' : 'Next Scenario'}
          </Text>
        </TouchableOpacity>
      )}

    </View>
  );
}
