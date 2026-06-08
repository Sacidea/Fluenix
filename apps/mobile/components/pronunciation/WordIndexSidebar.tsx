import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import * as Icons from 'lucide-react-native';
import { Word } from '../../hooks/usePronunciationSession';

interface WordIndexSidebarProps {
  paginatedWords: Word[];
  allWords: Word[];
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  currentIndex: number;
  setWordByIndex: (index: number) => void;
  onGenerateWords?: (topic: string) => void;
}

export function WordIndexSidebar({
  paginatedWords,
  allWords,
  categories,
  selectedCategory,
  setSelectedCategory,
  currentPage,
  totalPages,
  setCurrentPage,
  currentIndex,
  setWordByIndex,
  onGenerateWords
}: WordIndexSidebarProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [topic, setTopic] = useState('');
  return (
    <View className="bg-white border-b border-slate-200">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-slate-100">
        <View className="flex-row items-center">
          <Icons.List size={16} color="#64748b" />
          <Text className="text-xs font-bold text-slate-500 ml-2 tracking-wider">TERMINOLOGY INDEX</Text>
        </View>
        <TouchableOpacity 
          onPress={() => setModalVisible(true)}
          className="flex-row items-center bg-blue-50 px-2 py-1 rounded-md border border-blue-100"
        >
          <Icons.Sparkles size={12} color="#3B82F6" />
          <Text className="text-[10px] font-bold text-blue-600 ml-1">Generate</Text>
        </TouchableOpacity>
      </View>

      {/* Category Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 py-3 border-b border-slate-100">
        <View className="flex-row gap-2 pr-8">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-full ${isSelected ? 'bg-blue-600' : 'bg-slate-100'}`}
              >
                <Text className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-600'}`}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Word List */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 py-3">
        <View className="flex-row gap-3 pr-8">
          {paginatedWords.map((w) => {
            const globalIndex = allWords.findIndex((aw) => aw.id === w.id);
            const isActive = currentIndex === globalIndex;
            return (
              <TouchableOpacity
                key={w.id}
                onPress={() => setWordByIndex(globalIndex)}
                className={`px-4 py-3 rounded-xl border ${isActive ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-200'}`}
              >
                <Text className={`text-[10px] font-black mb-1 ${isActive ? 'text-blue-500' : 'text-slate-400'}`}>
                  {String(globalIndex + 1).padStart(2, '0')}
                </Text>
                <Text className={`text-sm font-bold ${isActive ? 'text-blue-900' : 'text-slate-700'}`}>
                  {w.word}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Pagination */}
      {totalPages > 1 && (
        <View className="flex-row items-center justify-between px-4 py-3 border-t border-slate-100">
          <TouchableOpacity
            disabled={currentPage === 1}
            onPress={() => setCurrentPage(currentPage - 1)}
            className={`px-3 py-1.5 rounded-md border border-slate-200 ${currentPage === 1 ? 'opacity-50' : 'bg-white'}`}
          >
            <Text className="text-[10px] font-bold text-slate-600">PREV</Text>
          </TouchableOpacity>

          <Text className="text-[10px] font-black text-slate-500">
            PAGE {currentPage} / {totalPages}
          </Text>

          <TouchableOpacity
            disabled={currentPage === totalPages}
            onPress={() => setCurrentPage(currentPage + 1)}
            className={`px-3 py-1.5 rounded-md border border-slate-200 ${currentPage === totalPages ? 'opacity-50' : 'bg-white'}`}
          >
            <Text className="text-[10px] font-bold text-slate-600">NEXT</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Generate Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View className="flex-1 bg-black/50 justify-center items-center px-6">
          <View className="bg-white w-full rounded-2xl p-6 shadow-xl">
            <View className="flex-row items-center mb-4">
              <Icons.Sparkles size={20} color="#3B82F6" />
              <Text className="text-lg font-bold text-slate-800 ml-2">Generate New Words</Text>
            </View>
            <Text className="text-sm text-slate-500 mb-4 leading-relaxed">
              Enter a technical topic (e.g. AWS, React Hooks, Security) and the AI will generate new vocabulary for you to practice.
            </Text>
            
            <TextInput
              value={topic}
              onChangeText={setTopic}
              placeholder="e.g. System Design"
              placeholderTextColor="#94a3b8"
              className="border border-slate-200 rounded-xl px-4 py-3 text-slate-800 mb-6 bg-slate-50 font-medium"
              autoFocus
            />
            
            <View className="flex-row justify-end gap-3">
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                className="px-4 py-2 rounded-lg"
              >
                <Text className="text-sm font-bold text-slate-500">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => {
                  if (topic.trim() && onGenerateWords) {
                    onGenerateWords(topic.trim());
                    setModalVisible(false);
                    setTopic('');
                  }
                }}
                className="bg-blue-600 px-6 py-2 rounded-lg items-center justify-center shadow-sm"
              >
                <Text className="text-sm font-bold text-white">Generate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
