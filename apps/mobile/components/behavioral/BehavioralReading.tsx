import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import * as Icons from 'lucide-react-native';
import { starReadingData } from '@fluenix/shared';
import { ReadingQuiz } from './ReadingQuiz';

// A simple custom markdown renderer for the mobile reading component
function SimpleMarkdown({ content }: { content: string }) {
  const lines = content.split('\n');
  
  return (
    <View className="gap-2">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return <View key={index} className="h-2" />;
        
        if (trimmed.startsWith('# ')) {
          return <Text key={index} className="text-2xl font-black text-slate-800 font-serif mt-4 mb-2">{trimmed.substring(2)}</Text>;
        }
        if (trimmed.startsWith('## ')) {
          return <Text key={index} className="text-xl font-bold text-slate-800 mt-3 mb-1">{trimmed.substring(3)}</Text>;
        }
        if (trimmed.startsWith('* ')) {
          return (
            <View key={index} className="flex-row items-start pr-4 mb-1">
              <Text className="text-slate-600 mr-2">•</Text>
              <Text className="text-slate-600 text-base leading-relaxed flex-1">{renderBoldParts(trimmed.substring(2))}</Text>
            </View>
          );
        }
        if (trimmed.match(/^[0-9]+\./)) {
           return (
            <View key={index} className="flex-row items-start pr-4 mb-1">
              <Text className="text-slate-600 font-bold mr-2">{trimmed.split('.')[0]}.</Text>
              <Text className="text-slate-600 text-base leading-relaxed flex-1">{renderBoldParts(trimmed.substring(trimmed.indexOf('.') + 1).trim())}</Text>
            </View>
          );
        }
        
        return <Text key={index} className="text-slate-600 text-base leading-relaxed mb-2">{renderBoldParts(trimmed)}</Text>;
      })}
    </View>
  );
}

// Helper to render **bold** text within a line
function renderBoldParts(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <Text key={i} className="font-bold text-slate-800">{part.slice(2, -2)}</Text>;
    }
    return <Text key={i}>{part}</Text>;
  });
}

export function BehavioralReading() {
  const level = 'B2'; // Hardcoded for now
  const chapters = starReadingData[level] || starReadingData['B1']; // Fallback
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);

  const activeChapter = chapters.find(c => c.id === selectedChapterId);

  if (activeChapter) {
    return (
      <ScrollView style={{ flex: 1 }} className="bg-slate-50" contentContainerClassName="px-4 py-6 pb-12">
        <View>
          <TouchableOpacity 
            className="flex-row items-center mb-6 py-2"
            onPress={() => setSelectedChapterId(null)}
          >
            <Icons.ChevronLeft size={24} color="#3b82f6" />
            <Text className="text-blue-500 font-bold ml-1 text-base">Back to Chapters</Text>
          </TouchableOpacity>

          <SimpleMarkdown content={activeChapter.content} />
          
          <ReadingQuiz 
            vocabulary={activeChapter.vocabulary}
            fillInBlank={activeChapter.fillInBlank}
            scenario={activeChapter.scenario}
          />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }} className="bg-slate-50" contentContainerClassName="px-4 pt-6 pb-12">
      <View className="mb-6 flex-row items-center gap-3">
        <Icons.BookText size={28} color="#8b5cf6" />
        <Text className="text-2xl font-black text-slate-800 font-serif">Reading Practice</Text>
      </View>
      <Text className="text-slate-600 mb-8 leading-relaxed">
        Select a chapter to read about the STAR method and test your knowledge with interactive quizzes.
      </Text>

      <View className="gap-3 pb-12">
        {chapters.map((chapter) => (
          <TouchableOpacity 
            key={chapter.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 flex-row items-center justify-between shadow-sm"
            onPress={() => setSelectedChapterId(chapter.id)}
          >
            <View className="flex-1 mr-4">
              <Text className="text-base font-bold text-slate-800 mb-1">{chapter.title}</Text>
              <Text className="text-sm text-slate-500 line-clamp-1" numberOfLines={1}>
                {chapter.content.substring(0, 80).replace(/[#*]/g, '').trim()}...
              </Text>
            </View>
            <View className="w-10 h-10 bg-purple-50 rounded-full items-center justify-center">
              <Icons.ChevronRight size={20} color="#8b5cf6" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
