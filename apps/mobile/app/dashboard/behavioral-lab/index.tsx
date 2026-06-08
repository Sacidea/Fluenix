import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Stack } from 'expo-router';
import * as Icons from 'lucide-react-native';

import { BehavioralHandbook } from '../../../components/behavioral/BehavioralHandbook';
import { BehavioralReading } from '../../../components/behavioral/BehavioralReading';
import { BehavioralWorkspace } from '../../../components/behavioral/BehavioralWorkspace';

export default function BehavioralLabScreen() {
  const [activeTab, setActiveTab] = useState<'reading'|'handbook'|'workspace'>('handbook');

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ 
        title: "Behavioral Lab",
        headerStyle: { backgroundColor: '#ffffff' },
        headerShadowVisible: false,
      }} />

      {/* Tabs */}
      <View className="flex-row border-b border-slate-200 bg-white">
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
      <View className="flex-1 bg-slate-50">
        {activeTab === 'handbook' && <BehavioralHandbook />}
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
      className={`flex-1 flex-row items-center justify-center py-4 border-b-2 gap-2 ${
        isActive ? 'border-blue-500 bg-blue-50/50' : 'border-transparent'
      }`}
    >
      {icon}
      <Text className={`font-bold text-sm ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
