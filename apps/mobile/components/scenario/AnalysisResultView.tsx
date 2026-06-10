import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';
import { colors, shadow } from '../../utils/theme';

export type AnalysisResult = {
  overall_score: number;
  fluency_score: number;
  vocabulary_score: number;
  technical_accuracy: number;
  strengths: string[];
  improvements: string[];
  overall_feedback: string;
};

interface Props {
  analysisResult: AnalysisResult;
  setAnalysisResult: (a: AnalysisResult | null) => void;
}

export function AnalysisResultView({ analysisResult, setAnalysisResult }: Props) {
  if (!analysisResult) return null;

  const getScoreBgColor = (score: number) => score >= 80 ? '#dcfce7' : score >= 60 ? '#fef3c7' : '#fee2e2';
  const getScoreTextColor = (score: number) => score >= 80 ? colors.green600 : score >= 60 ? colors.amber600 : colors.red600;

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
      <View style={styles.card}>
        
        <View style={[styles.scoreBubble, { backgroundColor: getScoreBgColor(analysisResult.overall_score) }]}>
          <Text style={[styles.scoreText, { color: getScoreTextColor(analysisResult.overall_score) }]}>{analysisResult.overall_score}</Text>
        </View>
        
        <Text style={styles.title}>Simulation Complete</Text>
        <Text style={styles.subtitle}>Here is your comprehensive FAANG evaluation.</Text>

        <View style={styles.metricsRow}>
          <View style={[styles.metricCard, { marginRight: 8 }]}>
            <Text style={styles.metricLabel}>Fluency</Text>
            <Text style={[styles.metricValue, { color: colors.primary }]}>{analysisResult.fluency_score}</Text>
          </View>
          <View style={[styles.metricCard, { marginHorizontal: 4 }]}>
            <Text style={styles.metricLabel}>Vocab</Text>
            <Text style={[styles.metricValue, { color: colors.purple500 }]}>{analysisResult.vocabulary_score}</Text>
          </View>
          <View style={[styles.metricCard, { marginLeft: 8 }]}>
            <Text style={styles.metricLabel}>Tech</Text>
            <Text style={[styles.metricValue, { color: colors.amber500 }]}>{analysisResult.technical_accuracy}</Text>
          </View>
        </View>

        <View style={styles.feedbackSection}>
          <Text style={styles.feedbackTitle}>Manager's Note</Text>
          <Text style={styles.feedbackText}>
            {analysisResult.overall_feedback}
          </Text>
        </View>

        <View style={styles.strengthsSection}>
          <View style={styles.sectionHeader}>
             <Icons.TrendingUp size={16} color={colors.emerald500} />
             <Text style={styles.strengthsTitle}>Strengths</Text>
          </View>
          {analysisResult.strengths?.map((s: string, i: number) => (
            <View key={i} style={styles.strengthItem}>
               <Icons.CheckCircle2 size={18} color={colors.emerald500} />
               <Text style={styles.strengthText}>{s}</Text>
            </View>
          ))}
        </View>

        <View style={styles.improvementsSection}>
          <View style={styles.sectionHeader}>
             <Icons.AlertTriangle size={16} color={colors.red500} />
             <Text style={styles.improvementsTitle}>Areas to Improve</Text>
          </View>
          {analysisResult.improvements?.map((s: string, i: number) => (
            <View key={i} style={styles.improvementItem}>
               <Icons.AlertCircle size={18} color={colors.red500} />
               <Text style={styles.improvementText}>{s}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.returnBtn}
          onPress={() => setAnalysisResult(null)}
        >
          <Text style={styles.returnBtnText}>Return to Cockpit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.slate50,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingTop: 40,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 24,
    ...shadow.sm,
    borderWidth: 1,
    borderColor: colors.slate100,
    marginBottom: 48,
    alignItems: 'center',
  },
  scoreBubble: {
    width: 96,
    height: 96,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  scoreText: {
    fontSize: 36,
    fontWeight: '900',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.slate800,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  subtitle: {
    color: colors.slate500,
    textAlign: 'center',
    marginBottom: 32,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 32,
  },
  metricCard: {
    flex: 1,
    backgroundColor: colors.slate50,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate100,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.slate400,
    textTransform: 'uppercase',
    letterSpacing: 4,
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '900',
  },
  feedbackSection: {
    width: '100%',
    marginBottom: 32,
  },
  feedbackTitle: {
    fontWeight: '700',
    color: colors.slate800,
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 4,
  },
  feedbackText: {
    color: colors.slate600,
    lineHeight: 22,
    fontSize: 12,
    backgroundColor: colors.slate50,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate100,
  },
  strengthsSection: {
    width: '100%',
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    marginLeft: 4,
  },
  strengthsTitle: {
    fontWeight: '700',
    color: colors.green600,
    fontSize: 12,
  },
  strengthItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 8,
    backgroundColor: 'rgba(240, 253, 244, 0.5)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#dcfce7',
  },
  strengthText: {
    flex: 1,
    color: colors.slate700,
    fontSize: 12,
    lineHeight: 20,
  },
  improvementsSection: {
    width: '100%',
    marginBottom: 40,
  },
  improvementsTitle: {
    fontWeight: '700',
    color: colors.red600,
    fontSize: 12,
  },
  improvementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 8,
    backgroundColor: 'rgba(254, 242, 242, 0.5)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  improvementText: {
    flex: 1,
    color: colors.slate700,
    fontSize: 12,
    lineHeight: 20,
  },
  returnBtn: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    ...shadow.sm,
  },
  returnBtnText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 18,
  },
});
