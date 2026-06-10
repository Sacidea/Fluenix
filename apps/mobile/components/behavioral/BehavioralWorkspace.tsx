import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';
import { useBehavioralSession } from '../../hooks/useBehavioralSession';
import { useUser } from '@clerk/clerk-expo';
import { colors, shadow } from '../../utils/theme';

export function BehavioralWorkspace() {
  const {
    activeQuestion,
    isLoadingQuestion,
    loadNextQuestion,
    situation, setSituation,
    task, setTask,
    action, setAction,
    result, setResult,
    isAnalyzing,
    feedback,
    error,
    analyzeAnswer
  } = useBehavioralSession();

  const { user } = useUser();
  const level = (user?.publicMetadata?.level as string) || 'B2';

  const [activeTab, setActiveTab] = useState<'S'|'T'|'A'|'R'>('S');

  if (isLoadingQuestion) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0ea5e9" />
        <Text style={styles.loadingText}>Loading interview question...</Text>
      </View>
    );
  }

  if (!activeQuestion) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.noQuestionText}>No question available.</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.flex1Bg}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.flex1Bg} contentContainerStyle={styles.scrollContent}>
        
        {/* Question Header */}
        <View style={styles.questionHeader}>
          <View style={styles.categoryRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{activeQuestion.category}</Text>
            </View>
          </View>
          <Text style={styles.questionText}>
            {activeQuestion.question}
          </Text>
          <Text style={styles.contextText}>
            <Text style={styles.contextLabel}>Context:</Text> {activeQuestion.context}
          </Text>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Icons.AlertCircle size={20} color="#dc2626" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* Feedback Section */}
        {feedback && (
          <View style={styles.feedbackSection}>
            <View style={styles.feedbackHeader}>
              <Text style={styles.feedbackTitle}>AI Analysis</Text>
              <TouchableOpacity onPress={loadNextQuestion} style={styles.nextQuestionBtn}>
                <Icons.ArrowRight size={16} color="#0369a1" style={{ marginRight: 8 }} />
                <Text style={styles.nextQuestionText}>Next Question</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.feedbackCard, shadow.sm]}>
              <View style={styles.scoreRow}>
                <View>
                  <Text style={styles.scoreLabel}>Overall Score</Text>
                  <Text style={styles.scoreValue}>{feedback.overall_score}<Text style={styles.scoreMax}>/100</Text></Text>
                </View>
                <View style={styles.leadershipCol}>
                  <Text style={styles.subScoreLabel}>Leadership</Text>
                  <View style={styles.leadershipBadge}>
                    <Text style={styles.leadershipValue}>{feedback.leadership_alignment}/100</Text>
                  </View>
                </View>
              </View>

              <View style={styles.scoreRow}>
                <View>
                  <Text style={styles.subScoreLabel}>English Quality</Text>
                  <Text style={styles.englishLevelText}>Level: {level}</Text>
                </View>
                <View style={styles.leadershipCol}>
                  <View style={styles.englishBadge}>
                    <Text style={styles.englishValue}>{feedback.english_quality}/100</Text>
                  </View>
                </View>
              </View>

              <View style={styles.feedbackDetails}>
                <View>
                  <Text style={styles.strengthsTitle}><Icons.ThumbsUp size={16} color="#059669" /> Strengths</Text>
                  {feedback.strengths.map((s: string, i: number) => (
                    <Text key={i} style={styles.feedbackItem}>• {s}</Text>
                  ))}
                </View>
                <View>
                  <Text style={styles.improvementsTitle}><Icons.TrendingUp size={16} color="#e11d48" /> Areas to Improve</Text>
                  {feedback.improvements.map((s: string, i: number) => (
                    <Text key={i} style={styles.feedbackItem}>• {s}</Text>
                  ))}
                </View>
              </View>
            </View>
            
            <View style={styles.divider} />
            <Text style={styles.retryHint}>You can edit your answer below and try again to improve your score.</Text>
          </View>
        )}

        {/* STAR Input Section */}
        <View style={[styles.starInputContainer, shadow.sm]}>
          {/* Tab Bar */}
          <View style={styles.tabBar}>
            <StarTab label="S" title="Situation" isActive={activeTab === 'S'} onPress={() => setActiveTab('S')} hasValue={!!situation} />
            <StarTab label="T" title="Task" isActive={activeTab === 'T'} onPress={() => setActiveTab('T')} hasValue={!!task} />
            <StarTab label="A" title="Action" isActive={activeTab === 'A'} onPress={() => setActiveTab('A')} hasValue={!!action} />
            <StarTab label="R" title="Result" isActive={activeTab === 'R'} onPress={() => setActiveTab('R')} hasValue={!!result} />
          </View>

          {/* Active Input Area */}
          <View style={styles.inputArea}>
            {activeTab === 'S' && (
              <InputArea 
                label="Situation" 
                placeholder="Where were you working? What was the general context? (Keep it brief, 10-20% of your story)"
                value={situation}
                onChange={setSituation}
                analysis={feedback?.detailed_analysis?.situation}
              />
            )}
            {activeTab === 'T' && (
              <InputArea 
                label="Task" 
                placeholder="What was your specific responsibility? What goal did you need to achieve?"
                value={task}
                onChange={setTask}
                analysis={feedback?.detailed_analysis?.task}
              />
            )}
            {activeTab === 'A' && (
              <InputArea 
                label="Action" 
                placeholder="What exact steps did YOU take? Use 'I', not 'we'. Explain your thought process and technical decisions. (50-60% of your story)"
                value={action}
                onChange={setAction}
                analysis={feedback?.detailed_analysis?.action}
              />
            )}
            {activeTab === 'R' && (
              <InputArea 
                label="Result" 
                placeholder="What was the final outcome? Use numbers, percentages, or time saved. What did you learn?"
                value={result}
                onChange={setResult}
                analysis={feedback?.detailed_analysis?.result}
              />
            )}
          </View>
        </View>

        <TouchableOpacity
          onPress={() => analyzeAnswer(level)}
          disabled={isAnalyzing}
          style={[
            styles.analyzeButton,
            isAnalyzing ? styles.analyzeButtonDisabled : styles.analyzeButtonActive,
            shadow.sm,
          ]}
        >
          {isAnalyzing ? (
            <ActivityIndicator color="white" style={{ marginRight: 12 }} />
          ) : (
            <Icons.Sparkles size={20} color="white" style={{ marginRight: 12 }} />
          )}
          <Text style={styles.analyzeButtonText}>{isAnalyzing ? 'Analyzing Response...' : 'Evaluate Answer'}</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function StarTab({ label, title, isActive, onPress, hasValue }: { label: string, title: string, isActive: boolean, onPress: () => void, hasValue: boolean }) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[
        styles.starTab,
        isActive ? styles.starTabActive : styles.starTabInactive,
      ]}
    >
      <View style={styles.starTabLabelRow}>
        <Text style={[styles.starTabLabel, isActive ? styles.starTabLabelActive : styles.starTabLabelInactive]}>{label}</Text>
        {hasValue && !isActive && <View style={styles.starTabDot} />}
      </View>
      <Text style={[styles.starTabTitle, isActive ? styles.starTabTitleActive : styles.starTabTitleInactive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

function InputArea({ label, placeholder, value, onChange, analysis }: { label: string, placeholder: string, value: string, onChange: (t: string) => void, analysis?: string }) {
  return (
    <View>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        multiline
        value={value}
        onChangeText={onChange}
      />
      {analysis && (
        <View style={styles.analysisBox}>
          <Text style={styles.analysisLabel}>AI Feedback for {label}</Text>
          <Text style={styles.analysisText}>{analysis}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex1Bg: {
    flex: 1,
    backgroundColor: colors.slate50,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 80,
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.slate50,
  },
  loadingText: {
    marginTop: 16,
    color: colors.slate500,
    fontWeight: '500',
  },
  noQuestionText: {
    color: colors.slate500,
    fontWeight: '500',
  },
  questionHeader: {
    marginBottom: 24,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#bae6fd',
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#075985',
  },
  questionText: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.slate800,
    fontFamily: 'serif',
    lineHeight: 30,
  },
  contextText: {
    color: colors.slate500,
    fontSize: 12,
    marginTop: 12,
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.slate200,
    lineHeight: 20,
    ...shadow.sm,
  },
  contextLabel: {
    fontWeight: '700',
    color: colors.slate700,
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  errorText: {
    flex: 1,
    color: '#991b1b',
    fontWeight: '500',
  },
  feedbackSection: {
    marginBottom: 32,
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  feedbackTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.slate800,
  },
  nextQuestionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  nextQuestionText: {
    color: '#075985',
    fontWeight: '700',
    fontSize: 12,
  },
  feedbackCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate200,
    padding: 20,
    marginBottom: 16,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate100,
    paddingBottom: 16,
  },
  scoreLabel: {
    color: colors.slate500,
    fontWeight: '500',
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.slate800,
  },
  scoreMax: {
    fontSize: 18,
    color: colors.slate400,
  },
  leadershipCol: {
    alignItems: 'flex-end',
  },
  subScoreLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.slate500,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 4,
  },
  leadershipBadge: {
    backgroundColor: '#f0f9ff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0f2fe',
  },
  leadershipValue: {
    color: '#0369a1',
    fontWeight: '700',
  },
  englishLevelText: {
    fontSize: 12,
    color: colors.slate500,
    fontWeight: '500',
  },
  englishBadge: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1fae5',
  },
  englishValue: {
    color: '#047857',
    fontWeight: '700',
  },
  feedbackDetails: {
    gap: 16,
  },
  strengthsTitle: {
    fontWeight: '700',
    color: '#047857',
    marginBottom: 8,
  },
  improvementsTitle: {
    fontWeight: '700',
    color: '#be123c',
    marginBottom: 8,
  },
  feedbackItem: {
    fontSize: 12,
    color: colors.slate600,
    marginBottom: 4,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: colors.slate200,
    marginVertical: 16,
  },
  retryHint: {
    textAlign: 'center',
    fontWeight: '500',
    color: colors.slate500,
    marginBottom: 16,
  },
  starInputContainer: {
    backgroundColor: colors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.slate200,
    overflow: 'hidden',
    marginBottom: 48,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.slate200,
    backgroundColor: colors.slate50,
  },
  inputArea: {
    padding: 20,
  },
  analyzeButton: {
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 48,
  },
  analyzeButtonActive: {
    backgroundColor: '#0284c7',
  },
  analyzeButtonDisabled: {
    backgroundColor: '#7dd3fc',
  },
  analyzeButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 18,
  },
  // StarTab styles
  starTab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  starTabActive: {
    borderBottomColor: '#0ea5e9',
    backgroundColor: colors.white,
  },
  starTabInactive: {
    borderBottomColor: 'transparent',
  },
  starTabLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  starTabLabel: {
    fontWeight: '900',
    fontSize: 18,
  },
  starTabLabelActive: {
    color: '#0284c7',
  },
  starTabLabelInactive: {
    color: colors.slate400,
  },
  starTabDot: {
    width: 6,
    height: 6,
    borderRadius: 9999,
    backgroundColor: colors.emerald500,
  },
  starTabTitle: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: 2,
  },
  starTabTitleActive: {
    color: '#075985',
  },
  starTabTitleInactive: {
    color: colors.slate400,
  },
  // InputArea styles
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.slate700,
    marginBottom: 12,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  textInput: {
    backgroundColor: colors.slate50,
    borderWidth: 1,
    borderColor: colors.slate200,
    borderRadius: 12,
    padding: 16,
    color: colors.slate700,
    fontSize: 14,
    lineHeight: 22,
    minHeight: 180,
    textAlignVertical: 'top',
  },
  analysisBox: {
    marginTop: 16,
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0f2fe',
  },
  analysisLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#075985',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  analysisText: {
    color: '#0c4a6e',
    fontSize: 12,
    lineHeight: 20,
  },
});
