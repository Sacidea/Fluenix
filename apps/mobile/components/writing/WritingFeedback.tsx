import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import * as Icons from 'lucide-react-native';

interface Props {
  feedback: any;
  theme?: 'lilac' | 'yellow' | 'blue';
}

export function WritingFeedback({ feedback, theme = 'blue' }: Props) {
  if (!feedback) return null;

  const score = feedback.overall_score ?? 0;
  
  let colors = { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: '#3b82f6' };
  if (theme === 'lilac') colors = { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-800', icon: '#6366f1' };
  if (theme === 'yellow') colors = { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', icon: '#f59e0b' };
  if (score >= 90) colors = { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', icon: '#10b981' };
  else if (score < 60) colors = { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-800', icon: '#f43f5e' };

  return (
    <View className={`w-full rounded-2xl p-5 border ${colors.bg} ${colors.border} mt-4`}>
      <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-white/40">
        <View className="flex-row items-center gap-2">
          <Icons.Activity size={18} color={colors.icon} />
          <Text className={`font-bold uppercase tracking-widest text-[10px] ${colors.text}`}>AI Analysis Complete</Text>
        </View>
        <Text className={`text-2xl font-black font-serif ${colors.text}`}>{score}/100</Text>
      </View>

      <Text className={`font-bold text-sm mb-2 ${colors.text}`}>Feedback</Text>
      <Text className={`text-sm leading-relaxed mb-4 ${colors.text} opacity-90`}>
        {feedback.overall_feedback || feedback.feedback || "Good job."}
      </Text>

      {feedback.improvements && feedback.improvements.length > 0 && (
        <>
          <Text className={`font-bold text-sm mt-2 mb-2 ${colors.text}`}>Areas to Improve</Text>
          {feedback.improvements.map((imp: string, i: number) => (
            <View key={i} className="flex-row items-start gap-2 mb-2">
              <View className="mt-1">
                <Icons.AlertCircle size={14} color={colors.icon} />
              </View>
              <Text className={`flex-1 text-sm ${colors.text} opacity-90`}>{imp}</Text>
            </View>
          ))}
        </>
      )}

      {feedback.strengths && feedback.strengths.length > 0 && (
        <>
          <Text className={`font-bold text-sm mt-4 mb-2 ${colors.text}`}>Strengths</Text>
          {feedback.strengths.map((st: string, i: number) => (
            <View key={i} className="flex-row items-start gap-2 mb-2">
              <View className="mt-1">
                <Icons.CheckCircle2 size={14} color={colors.icon} />
              </View>
              <Text className={`flex-1 text-sm ${colors.text} opacity-90`}>{st}</Text>
            </View>
          ))}
        </>
      )}
    </View>
  );
}
