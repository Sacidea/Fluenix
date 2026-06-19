import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';
import type { Word, PronunciationResult } from '@fluenix/shared';
import { colors, shadow } from '../../utils/theme';

interface AnalysisWorkspaceProps {
  supported: boolean;
  currentWord: Word | null;
  listening: boolean;
  transcript: string;
  result: PronunciationResult | null;
  loading: boolean;
  startListening: () => void;
  stopListening: () => void;
  speakWord: () => void;
  nextWord: () => void;
}

export function AnalysisWorkspace({
  supported,
  currentWord,
  listening,
  transcript,
  result,
  loading,
  startListening,
  stopListening,
  speakWord,
  nextWord
}: AnalysisWorkspaceProps) {
  if (!supported) {
    return (
      <View style={styles.unsupportedContainer}>
        <Icons.AlertCircle size={48} color={colors.red500} />
        <Text style={styles.unsupportedTitle}>Environment Error</Text>
        <Text style={styles.unsupportedDesc}>
          Acoustic analysis requires Web Speech API or Expo Speech Recognition support. Please test in a supported environment or rebuild the dev client.
        </Text>
      </View>
    );
  }

  if (!currentWord) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.blue500} />
        <Text style={styles.loadingText}>Initializing Phonetic Engine...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{currentWord.category} Analysis</Text>
          </View>
          <View style={styles.statusDot} />
        </View>

        {/* Word Display */}
        <View style={styles.wordDisplay}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 16 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.wordText}>{currentWord.word}</Text>
              <Text style={styles.phoneticText}>/{currentWord.phonetic}/</Text>
            </View>
          </ScrollView>
        </View>

        {/* Action Row */}
        <View style={styles.actionRow}>
          <TouchableOpacity 
            onPress={speakWord}
            style={styles.referenceBtn}
          >
            <Icons.Volume2 size={20} color={colors.slate600} />
            <Text style={styles.referenceBtnText}>Reference</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={listening ? stopListening : startListening}
            style={[styles.recordBtn, listening ? styles.recordBtnActive : styles.recordBtnDefault]}
          >
            {listening ? <Icons.Square size={20} color={colors.white} /> : <Icons.Mic size={20} color={colors.white} />}
            <Text style={styles.recordBtnText}>{listening ? 'Stop' : 'Record'}</Text>
          </TouchableOpacity>
        </View>

        {/* Transcript & Loader */}
        {Boolean(transcript) && !loading && (
          <View style={styles.transcriptBox}>
            <Text style={styles.transcriptLabel}>RECOGNIZED INPUT</Text>
            <Text style={styles.transcriptText}>"{transcript}"</Text>
          </View>
        )}

        {loading && (
          <View style={styles.loaderBox}>
            <ActivityIndicator size="small" color={colors.blue500} />
            <Text style={styles.loaderText}>Analyzing Acoustic Signature...</Text>
          </View>
        )}

        {/* Result Report */}
        {result && (
          <View style={styles.resultContainer}>
            <View style={[styles.resultHeader, result.is_correct ? styles.resultHeaderPass : styles.resultHeaderFail]}>
              <View style={styles.resultRow}>
                {result.is_correct ? <Icons.CheckCircle size={20} color={colors.green600} /> : <Icons.AlertCircle size={20} color={colors.red600} />}
                <Text style={[styles.resultLabel, result.is_correct ? styles.resultLabelPass : styles.resultLabelFail]}>
                  {result.is_correct ? 'ANALYSIS PASSED' : 'RETRY REQUIRED'}
                </Text>
              </View>
              <View style={styles.resultScoreBox}>
                <Text style={[styles.resultScore, result.is_correct ? styles.resultScorePass : styles.resultScoreFail]}>{result.accuracy_score}</Text>
                <Text style={[styles.resultScoreLabel, result.is_correct ? styles.resultScoreLabelPass : styles.resultScoreLabelFail]}>MATCH %</Text>
              </View>
            </View>

            <View style={styles.feedbackBox}>
              <Text style={styles.feedbackLabel}>TECHNICAL FEEDBACK</Text>
              <Text style={styles.feedbackText}>{result.feedback}</Text>
            </View>

            <View style={styles.tipBox}>
              <Text style={styles.tipLabel}>CALIBRATION TIP</Text>
              <Text style={styles.tipText}>{result.tip}</Text>
            </View>

            <TouchableOpacity 
              onPress={nextWord}
              style={styles.nextBtn}
            >
              <Text style={styles.nextBtnText}>Proceed to Next Word</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  unsupportedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  unsupportedTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.slate800,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  unsupportedDesc: {
    color: colors.slate600,
    textAlign: 'center',
    lineHeight: 22,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  loadingText: {
    color: colors.slate500,
    marginTop: 16,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.slate200,
    ...shadow.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  categoryBadge: {
    backgroundColor: colors.slate100,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.slate600,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 9999,
    backgroundColor: colors.blue500,
  },
  wordDisplay: {
    alignItems: 'center',
    marginBottom: 40,
  },
  wordText: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.slate800,
    marginBottom: 8,
  },
  phoneticText: {
    fontSize: 18,
    fontFamily: 'monospace',
    color: colors.slate400,
    letterSpacing: 4,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  referenceBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.slate100,
    paddingVertical: 16,
    borderRadius: 16,
  },
  referenceBtnText: {
    marginLeft: 8,
    fontWeight: '700',
    color: colors.slate700,
  },
  recordBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
  },
  recordBtnActive: {
    backgroundColor: colors.red500,
  },
  recordBtnDefault: {
    backgroundColor: '#2563eb',
  },
  recordBtnText: {
    marginLeft: 8,
    fontWeight: '700',
    color: colors.white,
  },
  transcriptBox: {
    backgroundColor: colors.slate50,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate100,
    marginBottom: 16,
    alignItems: 'center',
  },
  transcriptLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.slate400,
    marginBottom: 4,
    letterSpacing: 2,
  },
  transcriptText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.slate700,
  },
  loaderBox: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  loaderText: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.slate500,
    marginTop: 8,
  },
  resultContainer: {
    marginTop: 8,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  resultHeaderPass: {
    backgroundColor: '#f0fdf4',
  },
  resultHeaderFail: {
    backgroundColor: '#fef2f2',
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultLabel: {
    marginLeft: 8,
    fontWeight: '900',
  },
  resultLabelPass: {
    color: colors.green700,
  },
  resultLabelFail: {
    color: '#b91c1c',
  },
  resultScoreBox: {
    alignItems: 'flex-end',
  },
  resultScore: {
    fontSize: 20,
    fontWeight: '900',
  },
  resultScorePass: {
    color: colors.green700,
  },
  resultScoreFail: {
    color: '#b91c1c',
  },
  resultScoreLabel: {
    fontSize: 10,
    fontWeight: '700',
  },
  resultScoreLabelPass: {
    color: colors.green600,
  },
  resultScoreLabelFail: {
    color: colors.red600,
  },
  feedbackBox: {
    backgroundColor: colors.slate50,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate100,
    marginBottom: 12,
  },
  feedbackLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.slate400,
    letterSpacing: 2,
    marginBottom: 8,
  },
  feedbackText: {
    fontSize: 12,
    lineHeight: 20,
    color: colors.slate700,
  },
  tipBox: {
    backgroundColor: '#eff6ff',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#dbeafe',
    marginBottom: 24,
  },
  tipLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#60a5fa',
    letterSpacing: 2,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 12,
    lineHeight: 20,
    color: '#1e40af',
  },
  nextBtn: {
    backgroundColor: colors.slate900,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    ...shadow.md,
  },
  nextBtnText: {
    color: colors.white,
    fontWeight: '700',
  },
});
