import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import * as Icons from 'lucide-react-native';
import { starReadingData } from '@fluenix/shared';
import { ReadingQuiz } from './ReadingQuiz';
import { colors, shadow } from '../../utils/theme';

// A simple custom markdown renderer for the mobile reading component
function SimpleMarkdown({ content }: { content: string }) {
  const lines = content.split('\n');
  
  return (
    <View style={styles.markdownContainer}>
      {lines.map((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return <View key={index} style={styles.spacer} />;
        
        if (trimmed.startsWith('# ')) {
          return <Text key={index} style={styles.heading1}>{trimmed.substring(2)}</Text>;
        }
        if (trimmed.startsWith('## ')) {
          return <Text key={index} style={styles.heading2}>{trimmed.substring(3)}</Text>;
        }
        if (trimmed.startsWith('* ')) {
          return (
            <View key={index} style={styles.bulletRow}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>{renderBoldParts(trimmed.substring(2))}</Text>
            </View>
          );
        }
        if (trimmed.match(/^[0-9]+\./)) {
           return (
            <View key={index} style={styles.bulletRow}>
              <Text style={styles.numberedBullet}>{trimmed.split('.')[0]}.</Text>
              <Text style={styles.bulletText}>{renderBoldParts(trimmed.substring(trimmed.indexOf('.') + 1).trim())}</Text>
            </View>
          );
        }
        
        return <Text key={index} style={styles.paragraph}>{renderBoldParts(trimmed)}</Text>;
      })}
    </View>
  );
}

// Helper to render **bold** text within a line
function renderBoldParts(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <Text key={i} style={styles.boldSlate800}>{part.slice(2, -2)}</Text>;
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
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.chapterScrollContent}>
        <View>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedChapterId(null)}
          >
            <Icons.ChevronLeft size={24} color="#3b82f6" />
            <Text style={styles.backButtonText}>Back to Chapters</Text>
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
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.listScrollContent}>
      <View style={styles.headerRow}>
        <Icons.BookText size={28} color="#8b5cf6" />
        <Text style={styles.headerTitle}>Reading Practice</Text>
      </View>
      <Text style={styles.introText}>
        Select a chapter to read about the STAR method and test your knowledge with interactive quizzes.
      </Text>

      <View style={styles.chapterList}>
        {chapters.map((chapter) => (
          <TouchableOpacity 
            key={chapter.id}
            style={[styles.chapterCard, shadow.sm]}
            onPress={() => setSelectedChapterId(chapter.id)}
          >
            <View style={styles.chapterTextContainer}>
              <Text style={styles.chapterTitle}>{chapter.title}</Text>
              <Text style={styles.chapterPreview} numberOfLines={1}>
                {chapter.content.substring(0, 80).replace(/[#*]/g, '').trim()}...
              </Text>
            </View>
            <View style={styles.chapterIcon}>
              <Icons.ChevronRight size={20} color="#8b5cf6" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.slate50,
  },
  chapterScrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    paddingBottom: 48,
  },
  listScrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 48,
  },
  headerRow: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.slate800,
    fontFamily: 'serif',
  },
  introText: {
    color: colors.slate600,
    marginBottom: 32,
    lineHeight: 26,
  },
  chapterList: {
    gap: 12,
    paddingBottom: 48,
  },
  chapterCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate200,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chapterTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  chapterTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.slate800,
    marginBottom: 4,
  },
  chapterPreview: {
    fontSize: 12,
    color: colors.slate500,
  },
  chapterIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#faf5ff',
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 8,
  },
  backButtonText: {
    color: '#3b82f6',
    fontWeight: '700',
    marginLeft: 4,
    fontSize: 14,
  },
  // SimpleMarkdown styles
  markdownContainer: {
    gap: 8,
  },
  spacer: {
    height: 8,
  },
  heading1: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.slate800,
    fontFamily: 'serif',
    marginTop: 16,
    marginBottom: 8,
  },
  heading2: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.slate800,
    marginTop: 12,
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingRight: 16,
    marginBottom: 4,
  },
  bulletDot: {
    color: colors.slate600,
    marginRight: 8,
  },
  numberedBullet: {
    color: colors.slate600,
    fontWeight: '700',
    marginRight: 8,
  },
  bulletText: {
    color: colors.slate600,
    fontSize: 14,
    lineHeight: 26,
    flex: 1,
  },
  paragraph: {
    color: colors.slate600,
    fontSize: 14,
    lineHeight: 26,
    marginBottom: 8,
  },
  boldSlate800: {
    fontWeight: '700',
    color: colors.slate800,
  },
});
