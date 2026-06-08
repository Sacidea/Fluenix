import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import * as Icons from 'lucide-react-native';
import { useVocabularySession } from '../../hooks/useVocabularySession';
import { Flashcard } from './Flashcard';
import { useRouter } from 'expo-router';

const SESSION_SIZE = 10;
const { width } = Dimensions.get('window');

export function FlashcardWorkspace() {
  const { sessionWords, loading, error, fetchSession, completeSession } = useVocabularySession(SESSION_SIZE);
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [needsReviewIds, setNeedsReviewIds] = useState<string[]>([]);

  const handleNext = async (status: 'review' | 'got_it') => {
    const wordId = sessionWords[currentIndex].id;
    let newMastered = [...masteredIds];
    let newReview = [...needsReviewIds];

    if (status === 'review') {
      newReview.push(wordId);
      setNeedsReviewIds(newReview);
    } else {
      newMastered.push(wordId);
      setMasteredIds(newMastered);
    }

    setIsFlipped(false);

    setTimeout(async () => {
      if (currentIndex < sessionWords.length - 1) {
        setCurrentIndex(p => p + 1);
      } else {
        setIsFinished(true);
        await completeSession(newMastered, newReview);
      }
    }, 350); // wait for flip animation to finish
  };

  const handleRestart = () => {
    fetchSession();
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsFinished(false);
    setMasteredIds([]);
    setNeedsReviewIds([]);
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center p-8">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text className="text-slate-500 font-medium mt-4">Loading vocabulary session...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-8">
        <Icons.AlertTriangle size={32} color="#EF4444" />
        <Text className="text-red-500 font-medium mt-4 text-center">{error}</Text>
      </View>
    );
  }

  if (sessionWords.length === 0) return null;

  if (isFinished) {
    const masteredCount = masteredIds.length;
    const reviewCount = needsReviewIds.length;
    const masteredPct = Math.round((masteredCount / sessionWords.length) * 100);
    
    return (
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-20 h-20 bg-yellow-50 rounded-full items-center justify-center mb-6">
          <Icons.Trophy size={40} color="#EAB308" />
        </View>
        <Text className="text-3xl font-black text-slate-800 mb-2">Session Complete</Text>
        <Text className="text-slate-500 text-center mb-10 leading-relaxed">
          You reviewed {sessionWords.length} FAANG-level technical terms.
        </Text>

        <View className="flex-row justify-between w-full mb-10">
          <View className="items-center bg-white p-4 rounded-2xl flex-1 mx-2 border border-slate-100 shadow-sm">
            <Text className="text-3xl font-black text-emerald-600 mb-1">{masteredCount}</Text>
            <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mastered</Text>
          </View>
          <View className="items-center bg-white p-4 rounded-2xl flex-1 mx-2 border border-slate-100 shadow-sm">
            <Text className="text-3xl font-black text-purple-600 mb-1">{masteredPct}%</Text>
            <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Score</Text>
          </View>
          <View className="items-center bg-white p-4 rounded-2xl flex-1 mx-2 border border-slate-100 shadow-sm">
            <Text className="text-3xl font-black text-red-600 mb-1">{reviewCount}</Text>
            <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Review</Text>
          </View>
        </View>

        <TouchableOpacity 
          onPress={handleRestart}
          className="w-full bg-slate-900 py-4 rounded-2xl items-center shadow-md mb-4"
        >
          <Text className="text-white font-bold text-lg">Start New Session</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => router.replace('/dashboard')}
          className="w-full bg-slate-100 py-4 rounded-2xl items-center"
        >
          <Text className="text-slate-600 font-bold">Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentWord = sessionWords[currentIndex];

  return (
    <View className="px-5 pt-4 pb-8">
      {/* Progress */}
      <View className="mb-4">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="font-mono text-xs font-black text-purple-600 tracking-widest">
            {currentIndex + 1} / {sessionWords.length}
          </Text>
          <Text className="font-mono text-[10px] font-bold text-slate-400 uppercase">
            {currentWord.difficulty}
          </Text>
        </View>
        <View className="h-1.5 bg-slate-200 rounded-full overflow-hidden mb-2">
          <View 
            className="h-full bg-purple-500 rounded-full" 
            style={{ width: `${(currentIndex / sessionWords.length) * 100}%` }}
          />
        </View>
        <View className="flex-row justify-between w-full px-1">
          {sessionWords.map((_, i) => (
            <View 
              key={i} 
              className={`h-1 flex-1 mx-0.5 rounded-full ${i < currentIndex ? 'bg-purple-500' : i === currentIndex ? 'bg-purple-300' : 'bg-slate-200'}`}
            />
          ))}
        </View>
      </View>

      {/* Flashcard */}
      <Flashcard 
        word={currentWord} 
        isFlipped={isFlipped} 
        setIsFlipped={setIsFlipped} 
      />

      {/* Action Buttons */}
      <View className="mt-2 mb-4">
        {isFlipped ? (
          <View className="flex-row gap-3">
            <TouchableOpacity 
              onPress={() => handleNext('review')}
              className="flex-1 flex-row items-center justify-center bg-red-50 border border-red-200 py-4 rounded-2xl"
            >
              <Icons.X size={20} color="#DC2626" />
              <Text className="ml-2 font-bold text-red-700">Needs Review</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => handleNext('got_it')}
              className="flex-1 flex-row items-center justify-center bg-green-500 py-4 rounded-2xl shadow-sm"
            >
              <Icons.Check size={20} color="#ffffff" />
              <Text className="ml-2 font-bold text-white">Got It</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-row justify-center items-center py-4">
            <Text className="text-slate-400 font-medium text-sm">Tap the card to reveal the definition</Text>
          </View>
        )}
      </View>
    </View>
  );
}
