import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Animated, Platform } from 'react-native';
import axios from 'axios';
import { useAuth, useUser } from '@clerk/clerk-expo';
import * as Icons from 'lucide-react-native';

const getApiUrl = () => {
  if (Platform.OS === 'web') return 'http://localhost:3001';
  return process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:3001';
};
const API_URL = getApiUrl();

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

  // Animation values for shake effect
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const [wrongShakeIndex, setWrongShakeIndex] = useState<number | null>(null);

  const fetchExercise = useCallback(async () => {
    if (!isLoaded || !user) return;
    setIsLoading(true);
    try {
      const level = (user.publicMetadata.level as string) || 'B2';
      const token = await getToken();
      
      const res = await axios.post(`${API_URL}/api/grammar/next`, 
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

  const triggerShake = () => {
    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true })
    ]).start();
  };

  const handleSegmentClick = (segment: TextSegment, index: number) => {
    if (!segment.isClickable || foundErrorIndex !== null) return;

    if (segment.isError) {
      setFoundErrorIndex(index);
    } else {
      setWrongShakeIndex(index);
      triggerShake();
      setTimeout(() => setWrongShakeIndex(null), 500);
    }
  };

  const handleOptionSelect = async (option: string) => {
    if (isAnswered || !exercise) return;
    setSelectedFix(option);
    setIsAnswered(true);

    try {
      const token = await getToken();
      await axios.post(`${API_URL}/api/grammar/mark-seen`, 
        { exerciseId: exercise.id },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
    } catch (err) {
      console.error('Failed to mark exercise as seen', err);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center p-8 mt-6 mx-5 bg-white rounded-2xl border border-slate-200">
        <ActivityIndicator size="large" color="#10b981" />
        <Text className="text-slate-500 font-medium mt-4">Loading Exercises...</Text>
      </View>
    );
  }

  if (!exercise) {
    return (
      <View className="flex-1 items-center justify-center p-8 mt-6 mx-5 bg-white rounded-2xl border border-slate-200">
        <Icons.CheckCircle2 size={48} color="#10b981" />
        <Text className="text-xl font-black text-slate-800 mt-4 mb-2">Generating Scenarios...</Text>
        <Text className="text-slate-500 text-center">Our AI is preparing new advanced grammar exercises for you. Check back later!</Text>
      </View>
    );
  }

  const errorSegment = foundErrorIndex !== null ? exercise.segments[foundErrorIndex] : null;
  const isFixCorrect = errorSegment && selectedFix === errorSegment.correctOption;

  return (
    <View className="px-5 pt-4 pb-8">
      {/* Header */}
      <View className="flex-row items-start justify-between mb-6">
        <View className="flex-1 pr-4">
          <Text className="text-lg font-black text-slate-800 mb-1">{exercise.title}</Text>
          <View className="flex-row items-center">
            <Icons.MessageSquare size={14} color="#64748b" />
            <Text className="text-xs text-slate-500 ml-1.5 font-medium">{exercise.context}</Text>
          </View>
        </View>
        <View className="bg-slate-200 px-3 py-1.5 rounded-full">
          <Text className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Ex {sessionCount + 1}</Text>
        </View>
      </View>

      {/* Main Content */}
      <View className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        
        {/* Instruction */}
        <View className={`px-5 py-3 border-b ${foundErrorIndex === null ? 'bg-slate-50 border-slate-200' : 'bg-emerald-50 border-emerald-100 flex-row items-center gap-2'}`}>
          {foundErrorIndex !== null && <Icons.CheckCircle2 size={18} color="#10b981" />}
          <Text className={`font-medium ${foundErrorIndex === null ? 'text-slate-600' : 'text-emerald-700'}`}>
            {foundErrorIndex === null 
              ? 'Find the grammatical error in the text below. Tap on the incorrect phrase.'
              : 'Error Found! Now select the correct fix.'}
          </Text>
        </View>

        {/* Interactive Text */}
        <View className="p-6">
          <Text style={{ lineHeight: 32 }}>
            {exercise.segments.map((seg, idx) => {
              const isWrongShake = wrongShakeIndex === idx;
              const isErrorFound = foundErrorIndex === idx;
              
              if (isErrorFound) {
                if (isAnswered && isFixCorrect) {
                  return (
                    <Text key={idx} className="text-emerald-600 font-bold bg-emerald-50 px-1">
                      {seg.correctOption}
                    </Text>
                  );
                }
                return (
                  <Text key={idx} className="text-rose-600 font-bold bg-rose-50 border-b-2 border-rose-500 border-dashed px-1">
                    {seg.text}
                  </Text>
                );
              }

              if (!seg.isClickable) {
                return <Text key={idx} className="text-slate-700 text-lg">{seg.text}</Text>;
              }

              // Clickable segments wrap in TouchableOpacity style text
              return (
                <Text 
                  key={idx} 
                  onPress={() => handleSegmentClick(seg, idx)}
                  className="text-indigo-600 bg-indigo-50 px-1 border-b border-indigo-200"
                  style={{
                    fontSize: 18,
                    ...(isWrongShake && { color: '#E11D48', backgroundColor: '#FFE4E6' }) // Basic flash red for shake
                  }}
                >
                  {seg.text}
                </Text>
              );
            })}
          </Text>
        </View>
      </View>

      {/* Options & Feedback */}
      {errorSegment && (
        <View className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-6 shadow-sm">
          <View className="flex-col gap-3">
            {errorSegment.options?.map((opt, idx) => {
              const isSelected = selectedFix === opt;
              const isCorrect = opt === errorSegment.correctOption;
              
              let bgColor = 'bg-white';
              let borderColor = 'border-slate-300';
              let textColor = 'text-slate-700';

              if (isAnswered) {
                if (isCorrect) {
                  bgColor = 'bg-emerald-50';
                  borderColor = 'border-emerald-500';
                  textColor = 'text-emerald-800';
                } else if (isSelected && !isCorrect) {
                  bgColor = 'bg-rose-50';
                  borderColor = 'border-rose-500';
                  textColor = 'text-rose-800';
                }
              }

              return (
                <TouchableOpacity
                  key={idx}
                  className={`flex-row items-center justify-between p-4 rounded-xl border-2 ${bgColor} ${borderColor}`}
                  onPress={() => handleOptionSelect(opt)}
                  disabled={isAnswered}
                >
                  <Text className={`font-bold text-base ${textColor}`}>{opt}</Text>
                  {isAnswered && isCorrect && <Icons.CheckCircle2 size={20} color="#10b981" />}
                  {isAnswered && isSelected && !isCorrect && <Icons.XCircle size={20} color="#f43f5e" />}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Explanation Box */}
          {isAnswered && (
            <View className="mt-5 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <View className="flex-row items-center gap-2 mb-2">
                <Icons.AlertCircle size={18} color="#6366f1" />
                <Text className="font-bold text-indigo-900">Grammar Rule</Text>
              </View>
              <Text className="text-slate-600 leading-relaxed mb-4">{errorSegment.explanation}</Text>
              <TouchableOpacity 
                className="bg-indigo-600 py-3.5 rounded-xl items-center shadow-sm"
                onPress={handleNext}
              >
                <Text className="text-white font-bold">Next Exercise</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
