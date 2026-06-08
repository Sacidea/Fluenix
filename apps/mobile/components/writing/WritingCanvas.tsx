import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import * as Icons from 'lucide-react-native';
import { WritingExercise, WritingMission } from '@fluenix/shared';
import { WritingFeedback } from './WritingFeedback';

interface Props {
  exercise: WritingExercise;
  activeMission: WritingMission | null;
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  loading?: boolean;
  feedback?: any;
  error?: string | null;
  onNext?: () => void;
}

export function WritingCanvas({ 
  exercise, 
  activeMission, 
  value, 
  onChange, 
  onSubmit, 
  disabled, 
  loading, 
  feedback, 
  error, 
  onNext 
}: Props) {
  
  const renderReferenceData = (text: string) => {
    return text.split('\n').map((line, i) => {
      let color = '#475569';
      let bgColor = 'transparent';
      let fontWeight: "normal" | "bold" | "600" = 'normal';
      
      if (line.startsWith('+') && !line.startsWith('+++')) {
        color = '#15803d';
        bgColor = '#f0fdf4';
      } else if (line.startsWith('-') && !line.startsWith('---')) {
        color = '#b91c1c';
        bgColor = '#fef2f2';
      } else if (line.startsWith('@@')) {
        color = '#8b5cf6';
      } else if (line.startsWith('diff') || line.startsWith('index') || line.startsWith('---') || line.startsWith('+++')) {
        color = '#64748b';
        fontWeight = 'bold';
      }
      
      return (
        <View key={i} style={{ backgroundColor: bgColor, paddingHorizontal: 4, paddingVertical: 2 }}>
          <Text style={{ color, fontWeight, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 12 }}>
            {line}
          </Text>
        </View>
      );
    });
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-slate-50" 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingVertical: 16 }}>
        
        {/* Context Panel */}
        <View className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-4 overflow-hidden">
          <View className="bg-slate-100/50 px-4 py-3 border-b border-slate-200 flex-row items-center gap-2">
            <Icons.ClipboardList size={16} color="#64748b" />
            <Text className="font-bold text-xs text-slate-500 uppercase tracking-widest">Task & Context</Text>
          </View>
          
          <View className="p-4">
            {activeMission ? (
              <>
                <Text className="text-lg font-black text-slate-800 font-serif mb-2">{activeMission.title}</Text>
                <Text className="text-sm text-slate-600 leading-relaxed mb-4">{activeMission.context}</Text>
                
                {activeMission.referenceData ? (
                  <View className="bg-slate-900 rounded-xl overflow-hidden p-4">
                    <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-700 pb-2">Reference Data</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      <View>
                        {renderReferenceData(activeMission.referenceData)}
                      </View>
                    </ScrollView>
                  </View>
                ) : null}
              </>
            ) : (
              <Text className="text-sm text-slate-500 italic text-center py-4">Loading operational context...</Text>
            )}
          </View>
        </View>

        {/* Editor Panel */}
        <View className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex-1 min-h-[300px]">
          <View className="bg-slate-100/50 px-4 py-3 border-b border-slate-200 flex-row items-center gap-2">
            <Icons.PenLine size={16} color="#64748b" />
            <Text className="font-bold text-xs text-slate-500 uppercase tracking-widest">Draft Editor</Text>
          </View>
          
          <TextInput
            className="flex-1 p-4 text-base text-slate-700 leading-relaxed"
            multiline
            placeholder="Start typing your response here. Focus on clarity and technical accuracy..."
            placeholderTextColor="#94a3b8"
            value={value}
            onChangeText={onChange}
            editable={!disabled && !feedback}
            textAlignVertical="top"
          />

          <View className="p-4 border-t border-slate-100">
            {error ? <Text className="text-red-500 text-xs mb-3 font-medium">{error}</Text> : null}
            
            <View className="flex-row items-center justify-end gap-3">
              {feedback && onNext ? (
                <TouchableOpacity
                  onPress={onNext}
                  className="bg-emerald-500 px-5 py-3 rounded-xl flex-row items-center justify-center shadow-sm"
                >
                  <Text className="text-white font-bold text-sm">NEXT TASK</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={onSubmit}
                  disabled={disabled || loading || !value.trim() || !!feedback}
                  className={`px-5 py-3 rounded-xl flex-row items-center justify-center shadow-sm gap-2 ${(disabled || !value.trim() || !!feedback) ? 'bg-slate-200' : 'bg-indigo-600'}`}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Icons.Send size={16} color={(disabled || !value.trim() || !!feedback) ? '#94a3b8' : '#fff'} />
                  )}
                  <Text className={`font-bold text-sm ${(disabled || !value.trim() || !!feedback) ? 'text-slate-400' : 'text-white'}`}>
                    {loading ? 'ANALYZING...' : 'SUBMIT DRAFT'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {feedback && (
              <WritingFeedback 
                feedback={feedback} 
                theme={exercise.id === 'pr_description' ? 'lilac' : exercise.id === 'commit_message' ? 'yellow' : 'blue'}
              />
            )}
          </View>
        </View>

        {/* Bottom padding for scroll */}
        <View className="h-10" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
