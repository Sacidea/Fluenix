import React from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Platform } from 'react-native';
import * as Icons from 'lucide-react-native';

const labelMap: Record<string, string> = {
  'scenario': 'Scenario Simulation',
  'writing': 'Technical Writing',
  'pronunciation': 'Pronunciation Lab',
  'vocabulary': 'Vocabulary Builder',
  'error-decoding': 'Error Decoder',
  'grammar-lab': 'Grammar Linter'
};

import { Session } from './SessionItem';

export function SessionDetailModal({ visible, session, onClose }: { visible: boolean; session: Session | null; onClose: () => void }) {
  if (!session) return null;

  const hasFeedback = session.feedback && typeof session.feedback === 'object';
  const fb = session.feedback || {};

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View className="flex-1 bg-slate-50">
        {/* Header */}
        <View className="pt-12 pb-4 px-6 flex-row items-center justify-between border-b border-slate-200 bg-white">
          <View>
            <Text className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 mb-1">
              Operational Record
            </Text>
            <Text className="font-bold text-lg text-slate-800">
              {labelMap[session.type] || session.type}
            </Text>
          </View>
          <TouchableOpacity onPress={onClose} className="w-10 h-10 bg-slate-100 rounded-full items-center justify-center">
            <Icons.X size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
          {/* Main Info */}
          <View className="bg-white p-5 rounded-2xl border border-slate-200 mb-6 flex-row justify-between items-center">
            <View>
              <Text className="text-slate-500 text-xs mb-1">Date</Text>
              <Text className="font-bold text-slate-800">
                {new Date(session.createdAt).toLocaleDateString(undefined, { 
                  year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                })}
              </Text>
            </View>
            {typeof session.score === 'number' && (
              <View className="items-end">
                <Text className="text-slate-500 text-xs mb-1">Score</Text>
                <Text className={`font-black text-2xl ${session.score >= 80 ? 'text-green-600' : 'text-indigo-600'}`}>
                  {Math.round(session.score)}
                </Text>
              </View>
            )}
          </View>

          {hasFeedback ? (
            <View className="gap-6 mb-10">
              {fb.overall && (
                <View>
                  <Text className="font-bold text-sm text-slate-800 uppercase tracking-widest mb-3">Overall Assessment</Text>
                  <Text className="text-slate-600 leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
                    {fb.overall}
                  </Text>
                </View>
              )}

              {fb.strengths && fb.strengths.length > 0 && (
                <View>
                  <Text className="font-bold text-sm text-green-600 uppercase tracking-widest mb-3">Identified Strengths</Text>
                  <View className="bg-white p-4 rounded-xl border border-slate-200 gap-2">
                    {fb.strengths.map((item: string, i: number) => (
                      <View key={i} className="flex-row items-start gap-2">
                        <Icons.CheckCircle2 size={16} color="#16a34a" className="mt-0.5" />
                        <Text className="text-slate-600 flex-1">{item}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {fb.improvements && fb.improvements.length > 0 && (
                <View>
                  <Text className="font-bold text-sm text-amber-600 uppercase tracking-widest mb-3">Areas for Improvement</Text>
                  <View className="bg-white p-4 rounded-xl border border-slate-200 gap-2">
                    {fb.improvements.map((item: string, i: number) => (
                      <View key={i} className="flex-row items-start gap-2">
                        <Icons.AlertCircle size={16} color="#d97706" className="mt-0.5" />
                        <Text className="text-slate-600 flex-1">{item}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ) : (
            <View className="items-center justify-center py-10 bg-white rounded-2xl border border-slate-200">
              <Icons.FileQuestion size={40} color="#cbd5e1" className="mb-4" />
              <Text className="font-bold text-slate-600">No detailed feedback available</Text>
              <Text className="text-slate-400 text-center mt-2">This session was recorded without AI analysis.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}
