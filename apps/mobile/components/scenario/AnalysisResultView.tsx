import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import * as Icons from 'lucide-react-native';

interface Props {
  analysisResult: any;
  setAnalysisResult: (a: any) => void;
}

export function AnalysisResultView({ analysisResult, setAnalysisResult }: Props) {
  if (!analysisResult) return null;

  const getScoreColor = (score: number) => score >= 80 ? 'text-green-600 bg-green-100' : score >= 60 ? 'text-amber-600 bg-amber-100' : 'text-red-600 bg-red-100';
  const getScoreTextColor = (score: number) => score >= 80 ? 'text-green-600' : score >= 60 ? 'text-amber-600' : 'text-red-600';

  return (
    <ScrollView className="flex-1 bg-slate-50 px-4 pt-10 pb-8">
      <View className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-12 items-center">
        
        <View className={`w-24 h-24 rounded-full items-center justify-center mb-6 ${getScoreColor(analysisResult.overall_score).split(' ')[1]}`}>
          <Text className={`text-4xl font-black ${getScoreTextColor(analysisResult.overall_score)}`}>{analysisResult.overall_score}</Text>
        </View>
        
        <Text className="text-2xl font-black text-slate-800 mb-2 text-center font-serif">Simulation Complete</Text>
        <Text className="text-slate-500 text-center mb-8">Here is your comprehensive FAANG evaluation.</Text>

        <View className="flex-row justify-between w-full mb-8">
          <View className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100 items-center mr-2">
            <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Fluency</Text>
            <Text className="text-2xl font-black text-indigo-500">{analysisResult.fluency_score}</Text>
          </View>
          <View className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100 items-center mx-1">
            <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Vocab</Text>
            <Text className="text-2xl font-black text-purple-500">{analysisResult.vocabulary_score}</Text>
          </View>
          <View className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100 items-center ml-2">
            <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Tech</Text>
            <Text className="text-2xl font-black text-amber-500">{analysisResult.technical_accuracy}</Text>
          </View>
        </View>

        <View className="w-full mb-8">
          <Text className="font-bold text-slate-800 text-sm mb-3 ml-1">Manager's Note</Text>
          <Text className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-5 rounded-2xl border border-slate-100">
            {analysisResult.overall_feedback}
          </Text>
        </View>

        <View className="w-full mb-6">
          <View className="flex-row items-center gap-2 mb-4 ml-1">
             <Icons.TrendingUp size={16} color="#10b981" />
             <Text className="font-bold text-green-600 text-sm">Strengths</Text>
          </View>
          {analysisResult.strengths?.map((s: string, i: number) => (
            <View key={i} className="flex-row items-start gap-3 mb-2 bg-green-50/50 p-4 rounded-2xl border border-green-100">
               <Icons.CheckCircle2 size={18} color="#10b981" />
               <Text className="flex-1 text-slate-700 text-sm leading-relaxed">{s}</Text>
            </View>
          ))}
        </View>

        <View className="w-full mb-10">
          <View className="flex-row items-center gap-2 mb-4 ml-1">
             <Icons.AlertTriangle size={16} color="#ef4444" />
             <Text className="font-bold text-red-600 text-sm">Areas to Improve</Text>
          </View>
          {analysisResult.improvements?.map((s: string, i: number) => (
            <View key={i} className="flex-row items-start gap-3 mb-2 bg-red-50/50 p-4 rounded-2xl border border-red-100">
               <Icons.AlertCircle size={18} color="#ef4444" />
               <Text className="flex-1 text-slate-700 text-sm leading-relaxed">{s}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          className="w-full bg-indigo-600 py-4 rounded-xl items-center shadow-sm"
          onPress={() => setAnalysisResult(null)}
        >
          <Text className="text-white font-bold text-lg">Return to Cockpit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
