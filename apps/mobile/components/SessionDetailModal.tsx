import React from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Platform, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';
import { colors, shadow } from '../utils/theme';

const labelMap: Record<string, string> = {
  'technical_interview': 'Technical Interview',
  'daily_standup': 'Daily Standup',
  'code_review': 'Code Review',
  'system_design': 'System Design',
  'pr_description': 'PR Description',
  'commit_message': 'Commit Message',
  'documentation': 'Documentation',
  'email_draft': 'Professional Email',
  'scenario': 'Simulation Transcript',
  'writing': 'Technical Ledger Entry',
  'pronunciation': 'Acoustic Report',
  'error-decoding': 'Error Decoder Log',
  'behavioral': 'Behavioral Interview',
  'listening': 'Listening Lab',
  'grammar': 'Grammar Lab',
  'grammar-lab': 'Grammar Lab',
  'vocabulary': 'Vocabulary Builder',
};

import { Session } from './SessionItem';

export function SessionDetailModal({ visible, session, onClose }: { visible: boolean; session: Session | null; onClose: () => void }) {
  if (!session) return null;

  const hasFeedback = session.feedback && typeof session.feedback === 'object';
  const fb = session.feedback || {};

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.root}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTag}>
              Operational Record
            </Text>
            <Text style={styles.headerTitle}>
              {labelMap[session.scenario ?? session.type] || session.type}
            </Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icons.X size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Main Info */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoLabel}>Type</Text>
                <Text style={styles.infoValue}>{session.type}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoLabel}>Scenario</Text>
                <Text style={styles.infoValue}>{session.scenario || '—'}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoLabel}>Date</Text>
                <Text style={styles.infoValue}>
                  {new Date(session.createdAt).toLocaleString('en-US')}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.infoLabel}>Duration</Text>
                <Text style={styles.infoValue}>{(session as any).duration ? `${(session as any).duration}s` : '—'}</Text>
              </View>
            </View>
            {typeof session.score === 'number' && (
              <View style={styles.scoreContainer}>
                <Text style={styles.infoLabel}>Accuracy Match</Text>
                <Text style={[styles.scoreValue, session.score >= 80 ? styles.scoreGreen : session.score >= 60 ? styles.scoreAmber : styles.scoreRed]}>
                  {Math.round(session.score)}%
                </Text>
              </View>
            )}
          </View>

          {hasFeedback ? (
            <View style={styles.feedbackContainer}>
              {fb.overall && (
                <View>
                  <Text style={styles.sectionTitleDefault}>Overall Assessment</Text>
                  <Text style={styles.feedbackText}>
                    {fb.overall}
                  </Text>
                </View>
              )}

              {fb.strengths && fb.strengths.length > 0 && (
                <View>
                  <Text style={styles.sectionTitleGreen}>Identified Strengths</Text>
                  <View style={styles.feedbackListCard}>
                    {fb.strengths.map((item: string, i: number) => (
                      <View key={i} style={styles.feedbackListItem}>
                        <Icons.CheckCircle2 size={16} color="#16a34a" style={{ marginTop: 2 }} />
                        <Text style={styles.feedbackItemText}>{item}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {fb.improvements && fb.improvements.length > 0 && (
                <View>
                  <Text style={styles.sectionTitleAmber}>Areas for Improvement</Text>
                  <View style={styles.feedbackListCard}>
                    {fb.improvements.map((item: string, i: number) => (
                      <View key={i} style={styles.feedbackListItem}>
                        <Icons.AlertCircle size={16} color="#d97706" style={{ marginTop: 2 }} />
                        <Text style={styles.feedbackItemText}>{item}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.noFeedbackContainer}>
              <Icons.FileQuestion size={40} color="#cbd5e1" style={{ marginBottom: 16 }} />
              <Text style={styles.noFeedbackTitle}>No detailed feedback available</Text>
              <Text style={styles.noFeedbackDesc}>This session was recorded without AI analysis.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.slate50,
  },
  header: {
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.slate200,
    backgroundColor: colors.white,
  },
  headerTag: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 4,
    color: colors.primary,
    marginBottom: 4,
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 18,
    color: colors.slate800,
  },
  closeButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.slate100,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    flex: 1,
    padding: 24,
  },
  infoCard: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate200,
    marginBottom: 24,
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 16,
  },
  infoLabel: {
    color: colors.slate500,
    fontSize: 10,
    marginBottom: 4,
  },
  infoValue: {
    fontWeight: '700',
    color: colors.slate800,
  },
  scoreContainer: {
    alignItems: 'flex-start',
  },
  scoreValue: {
    fontWeight: '900',
    fontSize: 24,
  },
  scoreGreen: {
    color: '#059669',
  },
  scoreAmber: {
    color: '#d97706',
  },
  scoreRed: {
    color: '#dc2626',
  },
  feedbackContainer: {
    gap: 24,
    marginBottom: 40,
  },
  sectionTitleDefault: {
    fontWeight: '700',
    fontSize: 12,
    color: colors.slate800,
    textTransform: 'uppercase',
    letterSpacing: 4,
    marginBottom: 12,
  },
  sectionTitleGreen: {
    fontWeight: '700',
    fontSize: 12,
    color: colors.green600,
    textTransform: 'uppercase',
    letterSpacing: 4,
    marginBottom: 12,
  },
  sectionTitleAmber: {
    fontWeight: '700',
    fontSize: 12,
    color: colors.amber600,
    textTransform: 'uppercase',
    letterSpacing: 4,
    marginBottom: 12,
  },
  feedbackText: {
    color: colors.slate600,
    lineHeight: 22,
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.slate200,
  },
  feedbackListCard: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.slate200,
    gap: 8,
  },
  feedbackListItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  feedbackItemText: {
    color: colors.slate600,
    flex: 1,
  },
  noFeedbackContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate200,
  },
  noFeedbackTitle: {
    fontWeight: '700',
    color: colors.slate600,
  },
  noFeedbackDesc: {
    color: colors.slate400,
    textAlign: 'center',
    marginTop: 8,
  },
});
