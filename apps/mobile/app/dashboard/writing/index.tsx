import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import * as Icons from 'lucide-react-native';
import { useWritingSession } from '../../../hooks/useWritingSession';
import { WritingSelector } from '../../../components/writing/WritingSelector';
import { WritingCanvas } from '../../../components/writing/WritingCanvas';

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
      <View className="flex-1 bg-slate-50 pt-12">
        
        {/* WEB-STYLE HEADER */}
        <View className="px-4 pb-4 border-b border-slate-200 flex-row items-center justify-between bg-slate-50">
          <TouchableOpacity 
            onPress={() => exerciseId ? changeExercise(null) : router.replace('/dashboard')} 
            className="flex-row items-center gap-1.5 bg-white px-3 py-2 border border-slate-200 rounded-lg shadow-sm"
          >
            <Icons.ChevronLeft size={16} color="#475569" />
            <Text className="font-bold text-slate-600 text-sm">{exerciseId ? 'Back to Lobby' : 'Dashboard'}</Text>
          </TouchableOpacity>
          <View className="items-end">
            <Text className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-widest mb-1">Technical Drafting</Text>
            <Text className="text-lg font-black text-slate-800 font-serif leading-none">Engineer's Ledger</Text>
          </View>
        </View>

        <View className="flex-1">
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
