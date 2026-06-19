import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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

const iconMap: Record<string, any> = {
  'scenario': Icons.MessagesSquare,
  'writing': Icons.PenTool,
  'pronunciation': Icons.Mic,
  'vocabulary': Icons.BookOpen,
  'error-decoding': Icons.Terminal,
  'grammar-lab': Icons.CheckSquare,
  'grammar': Icons.CheckSquare,
  'behavioral': Icons.Users,
  'listening': Icons.Headphones,
};

const getLabel = (session: { type: string; scenario?: string }) => {
  const raw = session.scenario ?? session.type;
  return labelMap[raw] ?? raw;
};

export type Session = {
  id: string;
  type: string;
  score?: number;
  createdAt: string;
  feedback?: any;
  scenario?: string;
};

export function SessionItem({ session, onPress, onDelete }: { session: Session; onPress: () => void; onDelete?: () => void }) {
  const IconComp = iconMap[session.type] || Icons.FileText;
  const hasScore = typeof session.score === 'number';

  return (
    <View style={styles.row}>
      <TouchableOpacity 
        onPress={onPress}
        style={styles.card}
      >
        <View style={styles.cardLeft}>
          <View style={styles.iconBox}>
            <IconComp size={20} color="#64748b" />
          </View>
          <View>
            <Text style={styles.sessionType}>{getLabel(session)}</Text>
            <Text style={styles.sessionDate}>
              {new Date(session.createdAt).toLocaleDateString(undefined, { 
                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
              })}
            </Text>
          </View>
        </View>
        <View style={styles.scoreSection}>
          {hasScore ? (
            <>
              <Text style={[styles.scoreValue, session.score !== undefined ? (session.score >= 80 ? styles.scoreGreen : session.score >= 60 ? styles.scoreAmber : styles.scoreRed) : undefined]}>
                {session.score !== undefined ? `${Math.round(session.score)}%` : ''}
              </Text>
              <Text style={styles.scoreLabel}>Accuracy Match</Text>
            </>
          ) : (
            <Text style={styles.noScoreText}>COMPLETE</Text>
          )}
        </View>
      </TouchableOpacity>
      
      {onDelete && (
        <TouchableOpacity 
          onPress={onDelete}
          style={styles.deleteButton}
        >
          <Icons.Trash2 size={20} color="#ef4444" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate200,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadow.sm,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.slate100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sessionType: {
    fontWeight: '700',
    color: colors.slate800,
    fontSize: 14,
  },
  sessionDate: {
    fontSize: 10,
    color: colors.slate500,
    marginTop: 4,
  },
  scoreSection: {
    alignItems: 'flex-end',
  },
  scoreValue: {
    fontWeight: '900',
    fontSize: 18,
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
  scoreLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  noScoreText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#cbd5e1',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  deleteButton: {
    backgroundColor: '#fef2f2',
    width: 48,
    height: 72,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
});
