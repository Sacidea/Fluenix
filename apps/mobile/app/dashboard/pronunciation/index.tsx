import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as Icons from 'lucide-react-native';
import { usePronunciationSession } from '../../../hooks/usePronunciationSession';
import { WordIndexSidebar } from '../../../components/pronunciation/WordIndexSidebar';
import { AnalysisWorkspace } from '../../../components/pronunciation/AnalysisWorkspace';

export default function PronunciationLabScreen() {
  const session = usePronunciationSession();
  const router = useRouter();

  return (
    <View className="flex-1 bg-slate-50">
      {/* Global Header Area */}
      <View className="px-6 pt-10 pb-4 bg-white border-b border-slate-200">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="flex-row items-center mb-4"
        >
          <Icons.ChevronLeft size={16} color="#64748b" />
          <Text className="text-slate-500 font-bold ml-1 text-sm">Return to Dashboard</Text>
        </TouchableOpacity>

        <View className="flex-row items-center justify-between">
          <View>
            <View className="flex-row items-center gap-2 mb-1">
              <View className="w-6 h-px bg-indigo-500" />
              <Text className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Acoustic Analysis Lab</Text>
            </View>
            <Text className="font-black text-2xl text-slate-800">Pronunciation Lab</Text>
          </View>
        </View>
      </View>
      <WordIndexSidebar 
        paginatedWords={session.paginatedWords}
        allWords={session.words}
        categories={session.categories}
        selectedCategory={session.selectedCategory}
        setSelectedCategory={session.setSelectedCategory}
        currentPage={session.currentPage}
        totalPages={session.totalPages}
        setCurrentPage={session.setCurrentPage}
        currentIndex={session.currentIndex}
        setWordByIndex={session.setWordByIndex}
        onGenerateWords={session.generateWords}
      />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <AnalysisWorkspace 
          supported={session.supported}
          currentWord={session.currentWord}
          listening={session.listening}
          transcript={session.transcript}
          result={session.result}
          loading={session.loading}
          startListening={session.startListening}
          stopListening={session.stopListening}
          speakWord={session.speakWord}
          nextWord={session.nextWord}
        />
      </ScrollView>
    </View>
  );
}
