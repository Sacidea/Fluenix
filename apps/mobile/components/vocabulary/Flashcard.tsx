import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Pressable } from 'react-native';
import * as Icons from 'lucide-react-native';
import * as Speech from 'expo-speech';
import { VocabWord } from '../../hooks/useVocabularySession';

interface FlashcardProps {
  word: VocabWord;
  isFlipped: boolean;
  setIsFlipped: (flipped: boolean) => void;
}

export function Flashcard({ word, isFlipped, setIsFlipped }: FlashcardProps) {
  const flipAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(flipAnim, {
      toValue: isFlipped ? 180 : 0,
      friction: 8,
      tension: 40,
      useNativeDriver: false,
    }).start();
  }, [isFlipped]);

  const playAudio = () => {
    Speech.stop();
    Speech.speak(word.word, {
      language: 'en-US',
      rate: 0.9,
    });
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }]
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }]
  };

  const getDifficultyStyles = (diff: string) => {
    switch(diff.toLowerCase()) {
      case 'easy': return { bg: '#dcfce7', text: '#15803d' };
      case 'medium': return { bg: '#fef9c3', text: '#a16207' };
      case 'hard': return { bg: '#ffedd5', text: '#c2410c' };
      case 'expert': return { bg: '#fee2e2', text: '#b91c1c' };
      default: return { bg: '#f1f5f9', text: '#334155' };
    }
  };

  const diffStyle = getDifficultyStyles(word.difficulty);

  return (
    <View className="w-full" style={{ minHeight: 380 }}>
      <Pressable onPress={() => setIsFlipped(!isFlipped)} className="w-full h-full relative">
        
        {/* FRONT */}
        <Animated.View 
          style={[frontAnimatedStyle, styles.card, { position: 'absolute', width: '100%', height: '100%' }]}
        >
          <View className="flex-1 bg-white rounded-3xl p-8 items-center justify-center border border-slate-200 shadow-sm">
            <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
              Click to reveal definition
            </Text>
            <Text className="text-5xl font-black text-slate-800 mb-6 text-center">
              {word.word}
            </Text>
            <View style={{ backgroundColor: diffStyle.bg, paddingHorizontal: 16, paddingVertical: 6, borderRadius: 9999 }}>
              <Text style={{ color: diffStyle.text, fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 }}>
                {word.difficulty}
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* BACK */}
        <Animated.View 
          style={[backAnimatedStyle, styles.card, styles.cardBack, { position: 'absolute', width: '100%', height: '100%' }]}
        >
          <View className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm flex-col">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-3xl font-black text-slate-800 flex-1 mr-4">{word.word}</Text>
              <TouchableOpacity 
                onPress={playAudio} 
                className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center"
              >
                <Icons.Volume2 size={24} color="#3b82f6" />
              </TouchableOpacity>
            </View>

            <Text className="text-base font-mono text-slate-400 tracking-widest mb-4">/{word.phonetic}/</Text>

            <View className="flex-row items-center bg-indigo-50 self-start px-3 py-1.5 rounded-lg mb-4">
              <View className="bg-indigo-600 px-1.5 py-0.5 rounded mr-2">
                <Text className="text-[10px] font-bold text-white">TR</Text>
              </View>
              <Text className="text-sm font-bold text-indigo-900">{word.turkishMeaning}</Text>
            </View>

            <View className="self-start px-3 py-1 bg-slate-100 rounded-md border border-slate-200 mb-4">
              <Text className="text-xs font-bold text-slate-600 italic">{word.type}</Text>
            </View>

            <Text className="text-base text-slate-700 leading-relaxed mb-4">
              {word.definition}
            </Text>

            <View className="mt-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <Text className="text-[10px] font-black text-slate-400 tracking-wider mb-2">ENGINEERING CONTEXT</Text>
              <Text className="text-sm text-slate-700 italic leading-relaxed">
                "{word.contextSentence}"
              </Text>
            </View>
          </View>
        </Animated.View>

      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});
