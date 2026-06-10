import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-expo';
import * as Icons from 'lucide-react-native';
import { API_URL } from '../../utils/apiClient';
import { colors, shadow } from '../../utils/theme';

type GrammarRule = {
  id: string;
  category: string;
  title: string;
  explanation: string;
  correctExample: string;
  wrongExample: string;
  lessonContent?: string | null;
  level: string;
};

// --- Custom Lightweight Markdown Parser ---
const renderMarkdown = (text: string) => {
  if (!text) return null;
  
  // Split by line to handle headers and lists
  const lines = text.split('\n');
  
  return lines.map((line, lineIndex) => {
    // 1. Headers (e.g. ### Header or ## Header)
    const headerMatch = line.match(/^(#{1,3})\s+(.*)/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const content = headerMatch[2];
      const headerStyle = level === 1 ? markdownStyles.heading1 
                        : level === 2 ? markdownStyles.heading2 
                        : markdownStyles.heading3;
      return <Text key={lineIndex} style={headerStyle}>{parseInlineStyles(content)}</Text>;
    }
    
    // 2. Lists (e.g. - item or * item)
    const listMatch = line.match(/^[\-\*]\s+(.*)/);
    if (listMatch) {
      return (
        <View key={lineIndex} style={styles.listItem}>
          <View style={styles.listBullet} />
          <Text style={[markdownStyles.body, styles.listItemText]}>
            {parseInlineStyles(listMatch[1])}
          </Text>
        </View>
      );
    }

    // 3. Normal paragraph
    if (line.trim() === '') return <View key={lineIndex} style={styles.emptyLine} />;
    return (
      <Text key={lineIndex} style={[markdownStyles.body, markdownStyles.paragraph]}>
        {parseInlineStyles(line)}
      </Text>
    );
  });
};

const parseInlineStyles = (text: string) => {
  // Regex to match **bold**
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const content = part.slice(2, -2);
      return <Text key={i} style={markdownStyles.strong}>{content}</Text>;
    }
    return part;
  });
};
// ------------------------------------------

export function GrammarHandbook() {
  const [groupedRules, setGroupedRules] = useState<Record<string, GrammarRule[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeRuleId, setActiveRuleId] = useState<string | null>(null);
  const [showLesson, setShowLesson] = useState(false);
  const { getToken } = useAuth();

  useEffect(() => {
    setShowLesson(false);
  }, [activeRuleId]);

  useEffect(() => {
    const loadRules = async () => {
      const token = await getToken();
      if (!token) return;
      setIsLoading(true);
      axios.get(`${API_URL}/api/handbook/rules`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        if (res.data.success) {
          const rules = res.data.data;
          setGroupedRules(rules);
          const firstCategory = Object.keys(rules)[0];
          if (firstCategory && rules[firstCategory].length > 0) {
            setActiveRuleId(rules[firstCategory][0].id);
          }
        }
      })
      .catch(err => console.error("Failed to load grammar rules", err))
      .finally(() => setIsLoading(false));
    };
    loadRules();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Loading Handbook...</Text>
      </View>
    );
  }

  let activeRule: GrammarRule | null = null;
  for (const category in groupedRules) {
    const found = groupedRules[category].find(r => r.id === activeRuleId);
    if (found) {
      activeRule = found;
      break;
    }
  }

  return (
    <View style={styles.flex1}>
      {/* Category Horizontal Scroll */}
      <View style={styles.categoryBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}>
          {Object.keys(groupedRules).map(category => (
            <View key={category} style={styles.categoryGroup}>
              <Text style={styles.categoryLabel}>{category}</Text>
              <View style={styles.categoryPills}>
                {groupedRules[category].map(rule => (
                  <TouchableOpacity
                    key={rule.id}
                    onPress={() => setActiveRuleId(rule.id)}
                    style={[
                      styles.rulePill,
                      activeRuleId === rule.id ? styles.rulePillActive : styles.rulePillInactive,
                    ]}
                  >
                    <Text style={[
                      styles.rulePillText,
                      activeRuleId === rule.id ? styles.rulePillTextActive : styles.rulePillTextInactive,
                    ]}>{rule.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Main Content Area */}
      <ScrollView style={styles.flex1} contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        {activeRule ? (
          <View style={[styles.ruleCard, shadow.sm]}>
            <View style={styles.ruleCategoryBadge}>
              <Text style={styles.ruleCategoryText}>{activeRule.category}</Text>
            </View>
            
            <Text style={styles.ruleTitle}>{activeRule.title}</Text>
            
            <View style={styles.ruleSection}>
              <View style={styles.ruleSectionHeader}>
                <Icons.AlertCircle size={18} color="#1e40af" />
                <Text style={styles.ruleSectionTitle}>The Rule</Text>
              </View>
              <Text style={styles.ruleExplanation}>{activeRule.explanation}</Text>
            </View>

            <View style={styles.examplesSection}>
              {/* Incorrect Example */}
              <View style={styles.wrongExampleCard}>
                <View style={styles.exampleHeader}>
                  <Icons.XCircle size={16} color="#e11d48" />
                  <Text style={styles.wrongExampleLabel}>Incorrect</Text>
                </View>
                <Text style={styles.wrongExampleText}>- {activeRule.wrongExample}</Text>
              </View>

              {/* Correct Example */}
              <View style={styles.correctExampleCard}>
                <View style={styles.exampleHeader}>
                  <Icons.CheckCircle2 size={16} color="#10b981" />
                  <Text style={styles.correctExampleLabel}>Correct</Text>
                </View>
                <Text style={styles.correctExampleText}>+ {activeRule.correctExample}</Text>
              </View>
            </View>

            {/* Lesson Content Toggle */}
            {activeRule.lessonContent && (
              <View style={styles.lessonContainer}>
                <TouchableOpacity 
                  onPress={() => setShowLesson(!showLesson)}
                  style={styles.lessonToggle}
                >
                  <View style={styles.lessonToggleLeft}>
                    <Icons.BookOpen size={20} color="#3b82f6" />
                    <Text style={styles.lessonToggleText}>{showLesson ? 'Close Lesson' : 'Read Full Lesson'}</Text>
                  </View>
                  <View style={{ transform: [{ rotate: showLesson ? '90deg' : '0deg' }] }}>
                    <Icons.ChevronRight size={20} color="#64748b" />
                  </View>
                </TouchableOpacity>

                {showLesson && (
                  <View style={styles.lessonContent}>
                    {renderMarkdown(activeRule.lessonContent || '')}
                  </View>
                )}
              </View>
            )}
          </View>
        ) : (
          <Text style={styles.emptyText}>Select a rule from the top menu to view details.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const markdownStyles = {
  body: {
    color: '#334155',
    fontSize: 15,
    lineHeight: 24,
  },
  heading1: {
    color: '#0f172a',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 10,
    marginTop: 16,
  },
  heading2: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
    marginTop: 14,
  },
  heading3: {
    color: '#1e293b',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 10,
  },
  paragraph: {
    marginBottom: 12,
  },
  strong: {
    fontWeight: '900',
    color: '#0f172a',
  },
  em: {
    fontStyle: 'italic',
  }
} as any;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 24,
    marginHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate200,
  },
  loadingText: {
    color: colors.slate500,
    fontWeight: '500',
    marginTop: 16,
  },
  categoryBar: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate200,
    paddingBottom: 8,
  },
  categoryGroup: {
    marginRight: 8,
  },
  categoryLabel: {
    fontWeight: '700',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 4,
    color: colors.slate400,
    marginBottom: 8,
    marginTop: 16,
  },
  categoryPills: {
    flexDirection: 'row',
    gap: 8,
  },
  rulePill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
  },
  rulePillActive: {
    backgroundColor: '#eff6ff',
    borderColor: '#bfdbfe',
  },
  rulePillInactive: {
    backgroundColor: colors.slate50,
    borderColor: colors.slate200,
  },
  rulePillText: {
    fontWeight: '700',
    fontSize: 12,
  },
  rulePillTextActive: {
    color: '#1d4ed8',
  },
  rulePillTextInactive: {
    color: colors.slate600,
  },
  ruleCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.slate200,
    padding: 24,
    marginBottom: 24,
  },
  ruleCategoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    marginBottom: 16,
  },
  ruleCategoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1d4ed8',
  },
  ruleTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.slate800,
    marginBottom: 16,
  },
  ruleSection: {
    marginBottom: 24,
  },
  ruleSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  ruleSectionTitle: {
    fontWeight: '700',
    color: '#1e3a5f',
  },
  ruleExplanation: {
    color: colors.slate600,
    lineHeight: 26,
  },
  examplesSection: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 24,
  },
  wrongExampleCard: {
    backgroundColor: '#fff1f2',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffe4e6',
  },
  exampleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  wrongExampleLabel: {
    fontWeight: '700',
    color: '#9f1239',
    fontSize: 12,
  },
  wrongExampleText: {
    color: '#881337',
    textDecorationLine: 'line-through',
  },
  correctExampleCard: {
    backgroundColor: '#ecfdf5',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d1fae5',
  },
  correctExampleLabel: {
    fontWeight: '700',
    color: '#065f46',
    fontSize: 12,
  },
  correctExampleText: {
    color: '#064e3b',
  },
  lessonContainer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.slate100,
    paddingTop: 24,
  },
  lessonToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.slate50,
    borderWidth: 1,
    borderColor: colors.slate200,
    padding: 16,
    borderRadius: 12,
  },
  lessonToggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  lessonToggleText: {
    fontWeight: '700',
    color: colors.slate700,
  },
  lessonContent: {
    marginTop: 16,
    padding: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate200,
    borderRadius: 12,
  },
  emptyText: {
    color: colors.slate500,
    textAlign: 'center',
  },
  // Markdown list items
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingLeft: 8,
  },
  listBullet: {
    width: 6,
    height: 6,
    borderRadius: 9999,
    backgroundColor: colors.slate400,
    marginTop: 8,
    marginRight: 8,
  },
  listItemText: {
    flex: 1,
  },
  emptyLine: {
    height: 12,
  },
});
