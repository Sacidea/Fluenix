import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';
import { WritingExercise, WritingMission } from '@fluenix/shared';
import { WritingFeedback, WritingFeedbackType } from './WritingFeedback';
import { colors, shadow } from '../../utils/theme';

interface Props {
  exercise: WritingExercise;
  activeMission: WritingMission | null;
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  loading?: boolean;
  feedback?: WritingFeedbackType;
  error?: string | null;
  onNext?: () => void;
}

export function WritingCanvas({ 
  exercise, 
  activeMission, 
  value, 
  onChange, 
  onSubmit, 
  disabled, 
  loading, 
  feedback, 
  error, 
  onNext 
}: Props) {
  
  const renderReferenceData = (text: string) => {
    return text.split('\n').map((line, i) => {
      let color = '#cbd5e1'; // slate-300 for normal text
      let bgColor = 'transparent';
      let fontWeight: "normal" | "bold" | "600" = 'normal';
      
      if (line.startsWith('+') && !line.startsWith('+++')) {
        color = '#4ade80'; // green-400
        bgColor = 'rgba(74, 222, 128, 0.1)'; // faint green bg
      } else if (line.startsWith('-') && !line.startsWith('---')) {
        color = '#f87171'; // red-400
        bgColor = 'rgba(248, 113, 113, 0.1)'; // faint red bg
      } else if (line.startsWith('@@')) {
        color = '#a78bfa'; // violet-400
      } else if (line.startsWith('diff') || line.startsWith('index') || line.startsWith('---') || line.startsWith('+++')) {
        color = '#94a3b8'; // slate-400
        fontWeight = 'bold';
      }
      
      return (
        <View key={i} style={{ backgroundColor: bgColor, paddingHorizontal: 4, paddingVertical: 2 }}>
          <Text style={{ color, fontWeight, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace', fontSize: 12 }}>
            {line}
          </Text>
        </View>
      );
    });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        
        {/* Context Panel - JIRA Style */}
        <View style={styles.jiraCard}>
          {/* JIRA Header */}
          <View style={styles.jiraHeader}>
            <View style={styles.jiraHeaderLeft}>
              <View style={styles.jiraIconContainer}>
                <Icons.CheckSquare size={12} color="white" />
              </View>
              <Text style={styles.jiraIssueId}>
                {activeMission?.id ? `FLX-${activeMission.id.substring(0,4).toUpperCase()}` : 'FLX-101'}
              </Text>
            </View>
            <View style={styles.jiraStatusBadge}>
              <Text style={styles.jiraStatusText}>To Do</Text>
            </View>
          </View>
          
          <View style={styles.jiraBody}>
            {activeMission ? (
              <>
                <Text style={styles.jiraTitle}>{activeMission.title}</Text>
                
                {/* Meta details */}
                <View style={styles.jiraMetaContainer}>
                  <View>
                    <Text style={styles.jiraMetaLabel}>Priority</Text>
                    <View style={styles.jiraMetaValueRow}>
                      <Icons.ChevronUp size={14} color="#ef4444" />
                      <Text style={styles.jiraMetaValue}>High</Text>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.jiraMetaLabel}>Assignee</Text>
                    <View style={styles.jiraMetaValueRow}>
                      <View style={styles.assigneeAvatar}>
                        <Text style={styles.assigneeAvatarText}>ME</Text>
                      </View>
                      <Text style={styles.jiraMetaValue}>You</Text>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.jiraMetaLabel}>Status</Text>
                    <View style={styles.jiraMetaValueRow}>
                      <View style={styles.statusDot} />
                      <Text style={styles.jiraMetaValue}>In Progress</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.descriptionSection}>
                  <Text style={styles.descriptionLabel}>Description</Text>
                  <Text style={styles.descriptionText}>{activeMission.context}</Text>
                </View>
                
                {activeMission.referenceData ? (
                  <View style={styles.codeSnippetCard}>
                    <View style={styles.codeSnippetHeader}>
                      <Text style={styles.codeSnippetTitle}>Attached Code Snippet</Text>
                      <Icons.Code2 size={12} color="#94a3b8" />
                    </View>
                    <View style={styles.codeSnippetBody}>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View>
                          {renderReferenceData(activeMission.referenceData)}
                        </View>
                      </ScrollView>
                    </View>
                  </View>
                ) : null}
              </>
            ) : (
              <Text style={styles.loadingText}>Loading issue details...</Text>
            )}
          </View>
        </View>

        {/* Editor Panel */}
        <View style={styles.editorCard}>
          <View style={styles.editorHeader}>
            <Icons.PenLine size={16} color="#64748b" />
            <Text style={styles.editorTitle}>Draft Editor</Text>
          </View>
          
          <TextInput
            style={styles.textInput}
            multiline
            placeholder="Start typing your response here. Focus on clarity and technical accuracy..."
            placeholderTextColor="#94a3b8"
            value={value}
            onChangeText={onChange}
            editable={!disabled && !feedback}
            textAlignVertical="top"
          />

          <View style={styles.editorFooter}>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
            <View style={styles.actionRow}>
              {feedback && onNext ? (
                <TouchableOpacity
                  onPress={onNext}
                  style={styles.nextButton}
                >
                  <Text style={styles.nextButtonText}>NEXT TASK</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={onSubmit}
                  disabled={disabled || loading || !value.trim() || !!feedback}
                  style={[
                    styles.submitButton,
                    (disabled || !value.trim() || !!feedback) ? styles.submitButtonDisabled : styles.submitButtonEnabled
                  ]}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Icons.Send size={16} color={(disabled || !value.trim() || !!feedback) ? '#94a3b8' : '#fff'} />
                  )}
                  <Text style={[
                    styles.submitButtonText,
                    (disabled || !value.trim() || !!feedback) ? styles.submitButtonTextDisabled : styles.submitButtonTextEnabled
                  ]}>
                    {loading ? 'ANALYZING...' : 'SUBMIT DRAFT'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {feedback && (
              <WritingFeedback 
                feedback={feedback} 
                theme={exercise.id === 'pr_description' ? 'lilac' : exercise.id === 'commit_message' ? 'yellow' : 'blue'}
              />
            )}
          </View>
        </View>

        {/* Bottom padding for scroll */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.slate50,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  jiraCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.slate200,
    marginBottom: 16,
    overflow: 'hidden',
    ...shadow.sm,
  },
  jiraHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  jiraHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  jiraIconContainer: {
    backgroundColor: colors.blue500,
    padding: 4,
    borderRadius: 4,
  },
  jiraIssueId: {
    fontWeight: '700',
    color: colors.slate700,
    fontSize: 14,
  },
  jiraStatusBadge: {
    backgroundColor: colors.slate100,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  jiraStatusText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.slate500,
    textTransform: 'uppercase',
  },
  jiraBody: {
    padding: 16,
  },
  jiraTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.slate800,
    marginBottom: 16,
  },
  jiraMetaContainer: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 20,
  },
  jiraMetaLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.slate400,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  jiraMetaValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  jiraMetaValue: {
    fontSize: 12,
    color: colors.slate700,
  },
  assigneeAvatar: {
    width: 16,
    height: 16,
    backgroundColor: colors.primaryLight,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assigneeAvatarText: {
    fontSize: 8,
    fontWeight: '700',
    color: colors.primary,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.amber500,
  },
  descriptionSection: {
    marginBottom: 16,
  },
  descriptionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.slate700,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: colors.slate600,
    lineHeight: 22,
  },
  codeSnippetCard: {
    backgroundColor: colors.slate800,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.slate700,
  },
  codeSnippetHeader: {
    backgroundColor: colors.slate700,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  codeSnippetTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.slate300,
    textTransform: 'uppercase',
  },
  codeSnippetBody: {
    padding: 12,
  },
  loadingText: {
    fontSize: 14,
    color: colors.slate500,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 16,
  },
  editorCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate200,
    overflow: 'hidden',
    flex: 1,
    minHeight: 300,
    ...shadow.sm,
  },
  editorHeader: {
    backgroundColor: 'rgba(241, 245, 249, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate200,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  editorTitle: {
    fontWeight: '700',
    fontSize: 12,
    color: colors.slate500,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  textInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: colors.slate700,
    lineHeight: 24,
  },
  editorFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.slate100,
  },
  errorText: {
    color: colors.red500,
    fontSize: 12,
    marginBottom: 12,
    fontWeight: '500',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
  },
  nextButton: {
    backgroundColor: colors.emerald500,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.sm,
  },
  nextButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 14,
  },
  submitButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...shadow.sm,
  },
  submitButtonEnabled: {
    backgroundColor: colors.primary,
  },
  submitButtonDisabled: {
    backgroundColor: colors.slate200,
  },
  submitButtonText: {
    fontWeight: '700',
    fontSize: 14,
  },
  submitButtonTextEnabled: {
    color: colors.white,
  },
  submitButtonTextDisabled: {
    color: colors.slate400,
  },
});
