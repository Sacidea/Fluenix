import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';

export type WritingFeedbackType = {
  overall_score: number;
  grammar_score: number;
  vocabulary_score: number;
  task_achievement: number;
  strengths: string[];
  improvements: string[];
  detailed_analysis: {
    original: string;
    correction: string;
    explanation: string;
  }[];
  overall_feedback?: string;
  feedback?: string;
};

interface Props {
  feedback: WritingFeedbackType;
  theme?: 'lilac' | 'yellow' | 'blue';
}

export function WritingFeedback({ feedback, theme = 'blue' }: Props) {
  if (!feedback) return null;

  const score = feedback.overall_score ?? 0;
  
  let colors = { bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af', icon: '#3b82f6' };
  if (theme === 'lilac') colors = { bg: '#eef2ff', border: '#c7d2fe', text: '#3730a3', icon: '#6366f1' };
  if (theme === 'yellow') colors = { bg: '#fffbeb', border: '#fde68a', text: '#92400e', icon: '#f59e0b' };
  if (score >= 90) colors = { bg: '#ecfdf5', border: '#a7f3d0', text: '#065f46', icon: '#10b981' };
  else if (score < 60) colors = { bg: '#fff1f2', border: '#fecdd3', text: '#9f1239', icon: '#f43f5e' };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg, borderColor: colors.border }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icons.Activity size={18} color={colors.icon} />
          <Text style={[styles.headerTitle, { color: colors.text }]}>AI Analysis Complete</Text>
        </View>
        <Text style={[styles.scoreText, { color: colors.text }]}>{score}/100</Text>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Feedback</Text>
      <Text style={[styles.feedbackText, { color: colors.text }]}>
        {feedback.overall_feedback || feedback.feedback || "Good job."}
      </Text>

      {feedback.improvements && feedback.improvements.length > 0 && (
        <>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Areas to Improve</Text>
          {feedback.improvements.map((imp: string, i: number) => (
            <View key={i} style={styles.listItem}>
              <View style={styles.listIcon}>
                <Icons.AlertCircle size={14} color={colors.icon} />
              </View>
              <Text style={[styles.listText, { color: colors.text }]}>{imp}</Text>
            </View>
          ))}
        </>
      )}

      {feedback.strengths && feedback.strengths.length > 0 && (
        <>
          <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 16 }]}>Strengths</Text>
          {feedback.strengths.map((st: string, i: number) => (
            <View key={i} style={styles.listItem}>
              <View style={styles.listIcon}>
                <Icons.CheckCircle2 size={14} color={colors.icon} />
              </View>
              <Text style={[styles.listText, { color: colors.text }]}>{st}</Text>
            </View>
          ))}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.4)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontSize: 10,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: '900',
    fontFamily: 'serif',
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
    opacity: 0.9,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  listIcon: {
    marginTop: 4,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    opacity: 0.9,
  },
});
