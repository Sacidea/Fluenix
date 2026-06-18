import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Pressable } from 'react-native';
import * as Icons from 'lucide-react-native';
import * as Speech from 'expo-speech';
import type { VocabWord } from '@fluenix/shared';
import { colors, shadow } from '../../utils/theme';

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
      default: return { bg: colors.slate100, text: colors.slate700 };
    }
  };

  const diffStyle = getDifficultyStyles(word.difficulty);

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={() => setIsFlipped(!isFlipped)} style={styles.pressable}>
        
        {/* FRONT */}
        <Animated.View 
          style={[frontAnimatedStyle, styles.card, styles.cardAbsolute]}
        >
          <View style={styles.frontContent}>
            <Text style={styles.frontHint}>
              Click to reveal definition
            </Text>
            <Text style={styles.frontWord}>
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
          style={[backAnimatedStyle, styles.card]}
        >
          <View style={styles.backContent}>
            <View style={styles.backHeader}>
              <Text style={styles.backWord}>{word.word}</Text>
              <TouchableOpacity 
                onPress={playAudio} 
                style={styles.audioBtn}
              >
                <Icons.Volume2 size={24} color={colors.blue500} />
              </TouchableOpacity>
            </View>

            <Text style={styles.phonetic}>/{word.phonetic}/</Text>

            <View style={styles.trBadge}>
              <View style={styles.trLabel}>
                <Text style={styles.trLabelText}>TR</Text>
              </View>
              <Text style={styles.trMeaning}>{word.turkishMeaning}</Text>
            </View>

            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>{word.type}</Text>
            </View>

            <Text style={styles.definition}>
              {word.definition}
            </Text>

            <View style={styles.contextBox}>
              <Text style={styles.contextLabel}>ENGINEERING CONTEXT</Text>
              <Text style={styles.contextText}>
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
  wrapper: {
    width: '100%',
    minHeight: 380,
  },
  pressable: {
    width: '100%',
    height: '100%',
    position: 'relative',
    flex: 1,
  },
  card: {
    backfaceVisibility: 'hidden',
  },
  cardAbsolute: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  cardBack: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  frontContent: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.slate200,
    ...shadow.sm,
  },
  frontHint: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.slate400,
    textTransform: 'uppercase',
    letterSpacing: 4,
    marginBottom: 32,
  },
  frontWord: {
    fontSize: 48,
    fontWeight: '900',
    color: colors.slate800,
    marginBottom: 24,
    textAlign: 'center',
  },
  backContent: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.slate200,
    ...shadow.sm,
    flexDirection: 'column',
  },
  backHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backWord: {
    fontSize: 30,
    fontWeight: '900',
    color: colors.slate800,
    flex: 1,
    marginRight: 16,
  },
  audioBtn: {
    width: 48,
    height: 48,
    backgroundColor: '#eff6ff',
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phonetic: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: colors.slate400,
    letterSpacing: 4,
    marginBottom: 16,
  },
  trBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryBg,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 16,
  },
  trLabel: {
    backgroundColor: colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  trLabelText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.white,
  },
  trMeaning: {
    fontSize: 12,
    fontWeight: '700',
    color: '#312e81',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: colors.slate100,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.slate200,
    marginBottom: 16,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.slate600,
    fontStyle: 'italic',
  },
  definition: {
    fontSize: 14,
    color: colors.slate700,
    lineHeight: 22,
    marginBottom: 16,
  },
  contextBox: {
    marginTop: 12,
    backgroundColor: colors.slate50,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate100,
  },
  contextLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.slate400,
    letterSpacing: 2,
    marginBottom: 8,
  },
  contextText: {
    fontSize: 12,
    color: colors.slate700,
    fontStyle: 'italic',
    lineHeight: 20,
  },
});
