import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as Icons from 'lucide-react-native';
import { GrammarWorkspace } from '../../../components/grammar-lab/GrammarWorkspace';
import { GrammarHandbook } from '../../../components/grammar-lab/GrammarHandbook';

export default function GrammarLabScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'linter' | 'handbook'>('handbook');

  return (
    <View className="flex-1 bg-slate-50">
      {/* Global Header Area */}
      <View className="px-6 pt-10 pb-4 bg-white border-b border-slate-200">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="flex-row items-center mb-4"
        >
          <Icons.ChevronLeft size={16} color="#64748b" />
          <Text className="text-slate-500 font-bold ml-1 text-sm">Return to Dashboard</Text>
        </TouchableOpacity>

        <View className="flex-row items-center justify-between mb-4">
          <View>
            <View className="flex-row items-center gap-2 mb-1">
              <View className="w-6 h-px bg-green-500" />
              <Text className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Structural Refinement</Text>
            </View>
            <Text className="font-black text-2xl text-slate-800">Grammar Intelligence</Text>
          </View>
        </View>

        {/* Custom Tabs */}
        <View className="flex-row items-center bg-slate-100 p-1 rounded-xl">
          <TouchableOpacity 
            className={`flex-1 flex-row items-center justify-center py-2.5 rounded-lg ${activeTab === 'linter' ? 'bg-white shadow-sm' : ''}`}
            onPress={() => setActiveTab('linter')}
          >
            <Icons.CheckSquare size={16} color={activeTab === 'linter' ? '#10b981' : '#64748b'} />
            <Text className={`ml-2 font-bold text-sm ${activeTab === 'linter' ? 'text-slate-800' : 'text-slate-500'}`}>Linter Lab</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`flex-1 flex-row items-center justify-center py-2.5 rounded-lg ${activeTab === 'handbook' ? 'bg-white shadow-sm' : ''}`}
            onPress={() => setActiveTab('handbook')}
          >
            <Icons.BookOpen size={16} color={activeTab === 'handbook' ? '#3b82f6' : '#64748b'} />
            <Text className={`ml-2 font-bold text-sm ${activeTab === 'handbook' ? 'text-slate-800' : 'text-slate-500'}`}>FAANG Handbook</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content Area */}
      <View className="flex-1">
        {activeTab === 'linter' ? <GrammarWorkspace /> : <GrammarHandbook />}
      </View>
    </View>
  );
}
