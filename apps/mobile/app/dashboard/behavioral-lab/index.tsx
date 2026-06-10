import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import * as Icons from 'lucide-react-native';

import { BehavioralHandbook } from '../../../components/behavioral/BehavioralHandbook';
import { BehavioralReading } from '../../../components/behavioral/BehavioralReading';
import { BehavioralWorkspace } from '../../../components/behavioral/BehavioralWorkspace';
import { colors, shadow } from '../../../utils/theme';

export default function BehavioralLabScreen() {
  const [activeTab, setActiveTab] = useState<'reading'|'handbook'|'workspace'>('handbook');

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ 
        title: "Behavioral Lab",
        headerStyle: { backgroundColor: colors.white },
        headerShadowVisible: false,
      }} />

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TabButton 
          icon={<Icons.BookOpen size={18} color={activeTab === 'handbook' ? '#3b82f6' : '#94a3b8'} />}
          label="Methodology" 
          isActive={activeTab === 'handbook'} 
          onPress={() => setActiveTab('handbook')} 
        />
        <TabButton 
          icon={<Icons.BookText size={18} color={activeTab === 'reading' ? '#3b82f6' : '#94a3b8'} />}
          label="Reading" 
          isActive={activeTab === 'reading'} 
          onPress={() => setActiveTab('reading')} 
        />
        <TabButton 
          icon={<Icons.Sparkles size={18} color={activeTab === 'workspace' ? '#3b82f6' : '#94a3b8'} />}
          label="Simulator" 
          isActive={activeTab === 'workspace'} 
          onPress={() => setActiveTab('workspace')} 
        />
      </View>

      {/* Content Area */}
      <View style={styles.contentArea}>
        {activeTab === 'handbook' && <BehavioralHandbook onStartSimulator={() => setActiveTab('workspace')} />}
        {activeTab === 'reading' && <BehavioralReading />}
        {activeTab === 'workspace' && <BehavioralWorkspace />}
      </View>
      
    </View>
  );
}

function TabButton({ icon, label, isActive, onPress }: { icon: React.ReactNode, label: string, isActive: boolean, onPress: () => void }) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[
        styles.tabButton,
        isActive ? styles.tabButtonActive : styles.tabButtonInactive,
      ]}
    >
      {icon}
      <Text style={[styles.tabLabel, isActive ? styles.tabLabelActive : styles.tabLabelInactive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.slate200,
    backgroundColor: colors.white,
  },
  contentArea: {
    flex: 1,
    backgroundColor: colors.slate50,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderBottomWidth: 2,
    gap: 8,
  },
  tabButtonActive: {
    borderBottomColor: colors.blue500,
    backgroundColor: 'rgba(59,130,246,0.05)',
  },
  tabButtonInactive: {
    borderBottomColor: 'transparent',
  },
  tabLabel: {
    fontWeight: '700',
    fontSize: 12,
  },
  tabLabelActive: {
    color: colors.blue500,
  },
  tabLabelInactive: {
    color: colors.slate500,
  },
});
