import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Icons from 'lucide-react-native';
import { Word, PronunciationResult } from '../../hooks/usePronunciationSession';

interface AnalysisWorkspaceProps {
  supported: boolean;
  currentWord: Word | null;
  listening: boolean;
  transcript: string;
  result: PronunciationResult | null;
  loading: boolean;
  startListening: () => void;
  stopListening: () => void;
  speakWord: () => void;
  nextWord: () => void;
}

export function AnalysisWorkspace({
  supported,
  currentWord,
  listening,
  transcript,
  result,
  loading,
  startListening,
  stopListening,
  speakWord,
  nextWord
}: AnalysisWorkspaceProps) {
  if (!supported) {
    return (
      <View className="flex-1 items-center justify-center p-8">
        <Icons.AlertCircle size={48} color="#ef4444" />
        <Text className="text-xl font-black text-slate-800 mt-4 mb-2 text-center">Environment Error</Text>
        <Text className="text-slate-600 text-center leading-relaxed">
          Acoustic analysis requires Web Speech API or @react-native-voice/voice support. Please test in a supported environment or rebuild the dev client.
        </Text>
      </View>
    );
  }

  if (!currentWord) {
    return (
      <View className="flex-1 items-center justify-center py-20">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-slate-500 mt-4 font-medium">Initializing Phonetic Engine...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-5">
      <View className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8">
          <View className="bg-slate-100 px-3 py-1 rounded-full">
            <Text className="text-xs font-bold text-slate-600">{currentWord.category} Analysis</Text>
          </View>
          <View className="w-2 h-2 rounded-full bg-blue-500" />
        </View>

        {/* Word Display */}
        <View className="items-center mb-10">
          <Text className="text-5xl font-black text-slate-800 mb-2">{currentWord.word}</Text>
          <Text className="text-lg font-mono text-slate-400 tracking-widest">/{currentWord.phonetic}/</Text>
        </View>

        {/* Action Row */}
        <View className="flex-row gap-3 mb-8">
          <TouchableOpacity 
            onPress={speakWord}
            className="flex-1 flex-row items-center justify-center bg-slate-100 py-4 rounded-2xl"
          >
            <Icons.Volume2 size={20} color="#475569" />
            <Text className="ml-2 font-bold text-slate-700">Reference</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={listening ? stopListening : startListening}
            className={`flex-1 flex-row items-center justify-center py-4 rounded-2xl ${listening ? 'bg-red-500' : 'bg-blue-600'}`}
          >
            {listening ? <Icons.Square size={20} color="#ffffff" /> : <Icons.Mic size={20} color="#ffffff" />}
            <Text className="ml-2 font-bold text-white">{listening ? 'Stop' : 'Record'}</Text>
          </TouchableOpacity>
        </View>

        {/* Transcript & Loader */}
        {Boolean(transcript) && !loading && (
          <View className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-4 items-center">
            <Text className="text-[10px] font-bold text-slate-400 mb-1 tracking-wider">RECOGNIZED INPUT</Text>
            <Text className="text-base font-medium text-slate-700">"{transcript}"</Text>
          </View>
        )}

        {loading && (
          <View className="items-center py-4">
            <ActivityIndicator size="small" color="#3b82f6" />
            <Text className="text-xs font-medium text-slate-500 mt-2">Analyzing Acoustic Signature...</Text>
          </View>
        )}

        {/* Result Report */}
        {result && (
          <View className="mt-2">
            <View className={`flex-row items-center justify-between p-4 rounded-2xl mb-4 ${result.is_correct ? 'bg-green-50' : 'bg-red-50'}`}>
              <View className="flex-row items-center">
                {result.is_correct ? <Icons.CheckCircle size={20} color="#16a34a" /> : <Icons.AlertCircle size={20} color="#dc2626" />}
                <Text className={`ml-2 font-black ${result.is_correct ? 'text-green-700' : 'text-red-700'}`}>
                  {result.is_correct ? 'ANALYSIS PASSED' : 'RETRY REQUIRED'}
                </Text>
              </View>
              <View className="items-end">
                <Text className={`text-xl font-black ${result.is_correct ? 'text-green-700' : 'text-red-700'}`}>{result.accuracy_score}</Text>
                <Text className={`text-[10px] font-bold ${result.is_correct ? 'text-green-600' : 'text-red-600'}`}>MATCH %</Text>
              </View>
            </View>

            <View className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-3">
              <Text className="text-[10px] font-black text-slate-400 tracking-wider mb-2">TECHNICAL FEEDBACK</Text>
              <Text className="text-sm leading-relaxed text-slate-700">{result.feedback}</Text>
            </View>

            <View className="bg-blue-50 p-4 rounded-2xl border border-blue-100 mb-6">
              <Text className="text-[10px] font-black text-blue-400 tracking-wider mb-2">CALIBRATION TIP</Text>
              <Text className="text-sm leading-relaxed text-blue-800">{result.tip}</Text>
            </View>

            <TouchableOpacity 
              onPress={nextWord}
              className="bg-slate-900 py-4 rounded-2xl items-center shadow-md"
            >
              <Text className="text-white font-bold">Proceed to Next Word</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
