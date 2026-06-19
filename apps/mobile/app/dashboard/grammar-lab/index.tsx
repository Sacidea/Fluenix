import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform, StyleSheet } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import * as Icons from 'lucide-react-native';
import { GrammarWorkspace } from '../../../components/grammar-lab/GrammarWorkspace';
import { GrammarHandbook } from '../../../components/grammar-lab/GrammarHandbook';
import { colors, shadow } from '../../../utils/theme';

export default function GrammarLabScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'linter' | 'handbook'>('handbook');

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      {/* Global Header Area */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.replace('/dashboard')} 
          style={styles.backButton}
        >
          <Icons.ChevronLeft size={16} color="#64748b" />
          <Text style={styles.backText}>Return to Dashboard</Text>
        </TouchableOpacity>

        <View style={styles.titleRow}>
          <View>
            <View style={styles.labelRow}>
              <View style={styles.labelAccentGreen} />
              <Text style={styles.labelText}>Structural Refinement</Text>
            </View>
            <Text style={styles.title}>Grammar Intelligence</Text>
          </View>
        </View>

        {/* Custom Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'linter' && styles.tabButtonActive]}
            onPress={() => setActiveTab('linter')}
          >
            <Icons.CheckSquare size={16} color={activeTab === 'linter' ? '#10b981' : '#64748b'} />
            <Text style={[styles.tabText, activeTab === 'linter' ? styles.tabTextActive : styles.tabTextInactive]}>Linter Lab</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'handbook' && styles.tabButtonActive]}
            onPress={() => setActiveTab('handbook')}
          >
            <Icons.BookOpen size={16} color={activeTab === 'handbook' ? '#3b82f6' : '#64748b'} />
            <Text style={[styles.tabText, activeTab === 'handbook' ? styles.tabTextActive : styles.tabTextInactive]}>FAANG Handbook</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content Area */}
      <View style={styles.contentArea}>
        {activeTab === 'linter' ? <GrammarWorkspace /> : <GrammarHandbook />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.slate50,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate200,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    color: colors.slate500,
    fontWeight: '700',
    marginLeft: 4,
    fontSize: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  labelAccentGreen: {
    width: 24,
    height: 1,
    backgroundColor: colors.green500,
  },
  labelText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 4,
    color: colors.slate400,
  },
  title: {
    fontWeight: '900',
    fontSize: 24,
    color: colors.slate800,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.slate100,
    padding: 4,
    borderRadius: 12,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: colors.white,
    ...shadow.sm,
  },
  tabText: {
    marginLeft: 8,
    fontWeight: '700',
    fontSize: 12,
  },
  tabTextActive: {
    color: colors.slate800,
  },
  tabTextInactive: {
    color: colors.slate500,
  },
  contentArea: {
    flex: 1,
  },
});
