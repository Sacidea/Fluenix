import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Icons from 'lucide-react-native';

const labelMap: Record<string, string> = {
  'scenario': 'Scenario Simulation',
  'writing': 'Technical Writing',
  'pronunciation': 'Pronunciation Lab',
  'vocabulary': 'Vocabulary Builder',
  'error-decoding': 'Error Decoder',
  'grammar-lab': 'Grammar Linter'
};

const iconMap: Record<string, any> = {
  'scenario': Icons.MessagesSquare,
  'writing': Icons.PenTool,
  'pronunciation': Icons.Mic,
  'vocabulary': Icons.BookOpen,
  'error-decoding': Icons.Terminal,
  'grammar-lab': Icons.CheckSquare
};

export type Session = {
  id: string;
  type: string;
  score?: number;
  createdAt: string;
  feedback?: any;
  scenario?: string;
};

export function SessionItem({ session, onPress, onDelete }: { session: Session; onPress: () => void; onDelete?: () => void }) {
  const IconComp = iconMap[session.type] || Icons.FileText;
  const hasScore = typeof session.score === 'number';

  return (
    <View className="flex-row items-center gap-2 mb-3">
      <TouchableOpacity 
        onPress={onPress}
        className="flex-1 bg-white border border-slate-200 rounded-2xl p-4 flex-row items-center justify-between shadow-sm active:bg-slate-50"
      >
        <View className="flex-row items-center gap-4">
          <View className="w-10 h-10 rounded-xl bg-slate-100 items-center justify-center">
            <IconComp size={20} color="#64748b" />
          </View>
          <View>
            <Text className="font-bold text-slate-800 text-base">{labelMap[session.type] || session.type}</Text>
            <Text className="text-xs text-slate-500 mt-1">
              {new Date(session.createdAt).toLocaleDateString(undefined, { 
                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
              })}
            </Text>
          </View>
        </View>
        <View className="items-end">
          {hasScore ? (
            <>
              <Text className={`font-black text-lg ${session.score !== undefined ? (session.score >= 80 ? 'text-green-600' : 'text-indigo-600') : ''}`}>
                {session.score !== undefined ? Math.round(session.score) : ''}
              </Text>
              <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Score</Text>
            </>
          ) : (
            <View className="bg-slate-100 px-2 py-1 rounded">
              <Text className="text-[10px] font-bold text-slate-500 uppercase">No Score</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      
      {onDelete && (
        <TouchableOpacity 
          onPress={onDelete}
          className="bg-red-50 w-12 h-[72px] rounded-2xl items-center justify-center border border-red-100"
        >
          <Icons.Trash2 size={20} color="#ef4444" />
        </TouchableOpacity>
      )}
    </View>
  );
}
