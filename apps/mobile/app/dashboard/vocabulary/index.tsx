import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import * as Icons from 'lucide-react-native';
import { FlashcardWorkspace } from '../../../components/vocabulary/FlashcardWorkspace';

export default function VocabularyLabScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-slate-50">
      {/* HEADER */}
      <View className="px-6 pt-10 pb-6 bg-white border-b border-slate-200">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="flex-row items-center mb-4"
        >
          <Icons.ChevronLeft size={16} color="#64748b" />
          <Text className="text-slate-500 font-bold ml-1 text-sm">Return to Dashboard</Text>
        </TouchableOpacity>
        
        <View className="flex-row items-center gap-2 mb-2">
          <View className="w-6 h-px bg-purple-600" />
          <Text className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Language Lab</Text>
        </View>
        <Text className="font-black text-3xl text-slate-800 mb-1">Tech Lexicon</Text>
        <Text className="text-slate-500 leading-relaxed text-sm">
          Advanced terminology tailored for FAANG communications.
        </Text>
      </View>

      {/* WORKSPACE */}
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40, flexGrow: 1 }}>
        <FlashcardWorkspace />
      </ScrollView>
    </View>
  );
}
