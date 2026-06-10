import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';
import { colors, shadow } from '../utils/theme';

const labelMap: Record<string, string> = {
  'scenario': 'Scenario Simulation',
  'writing': 'Technical Writing',
  'pronunciation': 'Pronunciation Lab',
  'vocabulary': 'Vocabulary Builder',
  'error-decoding': 'Error Decoder',
  'grammar-lab': 'Grammar Linter'
};

const iconMap: Record<string, any> = {
  'scenario': Icons.MessagesSquare,
  'writing': Icons.PenTool,
  'pronunciation': Icons.Mic,
  'vocabulary': Icons.BookOpen,
  'error-decoding': Icons.Terminal,
  'grammar-lab': Icons.CheckSquare
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
            <Text style={styles.sessionType}>{labelMap[session.type] || session.type}</Text>
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
              <Text style={[styles.scoreValue, session.score !== undefined ? (session.score >= 80 ? styles.scoreGreen : styles.scorePrimary) : undefined]}>
                {session.score !== undefined ? Math.round(session.score) : ''}
              </Text>
              <Text style={styles.scoreLabel}>Score</Text>
            </>
          ) : (
            <View style={styles.noScoreBadge}>
              <Text style={styles.noScoreText}>No Score</Text>
            </View>
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
    color: colors.green600,
  },
  scorePrimary: {
    color: colors.primary,
  },
  scoreLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.slate400,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  noScoreBadge: {
    backgroundColor: colors.slate100,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  noScoreText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.slate500,
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
