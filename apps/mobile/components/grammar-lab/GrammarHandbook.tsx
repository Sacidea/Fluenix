import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Platform } from 'react-native';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-expo';
import * as Icons from 'lucide-react-native';

const getApiUrl = () => {
  if (Platform.OS === 'web') return 'http://localhost:3001';
  return process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:3001';
};
const API_URL = getApiUrl();

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
        <View key={lineIndex} className="flex-row items-start mb-2 pl-2">
          <View className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 mr-2" />
          <Text style={markdownStyles.body} className="flex-1">
            {parseInlineStyles(listMatch[1])}
          </Text>
        </View>
      );
    }

    // 3. Normal paragraph
    if (line.trim() === '') return <View key={lineIndex} className="h-3" />;
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
      <View className="flex-1 items-center justify-center p-8 mt-6 mx-5 bg-white rounded-2xl border border-slate-200">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-slate-500 font-medium mt-4">Loading Handbook...</Text>
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
    <View className="flex-1">
      {/* Category Horizontal Scroll */}
      <View className="bg-white border-b border-slate-200 pb-2">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}>
          {Object.keys(groupedRules).map(category => (
            <View key={category} className="mr-2">
              <Text className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-2 mt-4">{category}</Text>
              <View className="flex-row gap-2">
                {groupedRules[category].map(rule => (
                  <TouchableOpacity
                    key={rule.id}
                    onPress={() => setActiveRuleId(rule.id)}
                    className={`px-4 py-2 rounded-full border ${activeRuleId === rule.id ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'}`}
                  >
                    <Text className={`font-bold text-sm ${activeRuleId === rule.id ? 'text-blue-700' : 'text-slate-600'}`}>{rule.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Main Content Area */}
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        {activeRule ? (
          <View className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 mb-6">
            <View className="self-start bg-blue-50 px-3 py-1 rounded-full mb-4">
              <Text className="text-xs font-bold text-blue-700">{activeRule.category}</Text>
            </View>
            
            <Text className="text-2xl font-black text-slate-800 mb-4">{activeRule.title}</Text>
            
            <View className="mb-6">
              <View className="flex-row items-center gap-2 mb-2">
                <Icons.AlertCircle size={18} color="#1e40af" />
                <Text className="font-bold text-blue-900">The Rule</Text>
              </View>
              <Text className="text-slate-600 leading-relaxed">{activeRule.explanation}</Text>
            </View>

            <View className="flex-col gap-3 mb-6">
              {/* Incorrect Example */}
              <View className="bg-rose-50 p-4 rounded-xl border border-rose-100">
                <View className="flex-row items-center gap-2 mb-2">
                  <Icons.XCircle size={16} color="#e11d48" />
                  <Text className="font-bold text-rose-800 text-sm">Incorrect</Text>
                </View>
                <Text className="text-rose-900 line-through decoration-rose-300">- {activeRule.wrongExample}</Text>
              </View>

              {/* Correct Example */}
              <View className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <View className="flex-row items-center gap-2 mb-2">
                  <Icons.CheckCircle2 size={16} color="#10b981" />
                  <Text className="font-bold text-emerald-800 text-sm">Correct</Text>
                </View>
                <Text className="text-emerald-900">+ {activeRule.correctExample}</Text>
              </View>
            </View>

            {/* Lesson Content Toggle */}
            {activeRule.lessonContent && (
              <View className="mt-2 border-t border-slate-100 pt-6">
                <TouchableOpacity 
                  onPress={() => setShowLesson(!showLesson)}
                  className="flex-row items-center justify-between bg-slate-50 border border-slate-200 p-4 rounded-xl"
                >
                  <View className="flex-row items-center gap-2">
                    <Icons.BookOpen size={20} color="#3b82f6" />
                    <Text className="font-bold text-slate-700">{showLesson ? 'Close Lesson' : 'Read Full Lesson'}</Text>
                  </View>
                  <View style={{ transform: [{ rotate: showLesson ? '90deg' : '0deg' }] }}>
                    <Icons.ChevronRight size={20} color="#64748b" />
                  </View>
                </TouchableOpacity>

                {showLesson && (
                  <View className="mt-4 p-5 bg-white border border-slate-200 rounded-xl">
                    {renderMarkdown(activeRule.lessonContent || '')}
                  </View>
                )}
              </View>
            )}
          </View>
        ) : (
          <Text className="text-slate-500 text-center">Select a rule from the top menu to view details.</Text>
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
