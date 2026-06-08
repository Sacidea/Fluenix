import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import * as Icons from 'lucide-react-native';
import { ScenarioType, scenarios } from '@fluenix/shared';

interface Props {
  scenario: ScenarioType;
  setScenario: (sc: ScenarioType) => void;
  startScenario: () => void;
  loading: boolean;
}

const iconMap: Record<string, any> = {
  Terminal: Icons.Terminal,
  Users: Icons.Users,
  FileCode: Icons.FileCode,
};

export function ScenarioSelector({ scenario, setScenario, startScenario, loading }: Props) {
  const handleCardClick = (id: ScenarioType) => {
    setScenario(id);
    setTimeout(() => {
      startScenario();
    }, 50);
  };

  return (
    <ScrollView className="flex-1 px-4 pt-6">
      <View className="flex-row justify-between items-start mb-6">
        <View className="flex-1 pr-4">
          <Text className="text-2xl font-black text-slate-800 font-serif mb-2">Select Operational Context</Text>
          <Text className="text-slate-500 text-sm leading-relaxed">Click on a scenario below to immediately initialize the AI simulation.</Text>
        </View>
        <View className="items-end min-w-[100px]">
          <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">AI Voice Persona</Text>
          <View className="bg-white border border-slate-200 px-3 py-2 rounded-lg">
            <Text className="text-xs text-slate-600 font-medium">System Default</Text>
          </View>
        </View>
      </View>

      <View className="pb-12">
        {scenarios.map((s) => {
          const Icon = iconMap[s.icon] || Icons.Terminal;
          const isSelected = scenario === s.id;

          return (
            <TouchableOpacity
              key={s.id}
              disabled={loading}
              onPress={() => handleCardClick(s.id as ScenarioType)}
              className={`relative overflow-hidden mb-4 rounded-2xl bg-white border ${isSelected ? 'border-indigo-500' : 'border-slate-200'} shadow-sm flex-row items-start p-5`}
            >
              <View className="absolute top-0 bottom-0 left-0 w-1" style={{ backgroundColor: s.color }} />
              
              <View className="w-12 h-12 rounded-xl items-center justify-center mr-4" style={{ backgroundColor: `${s.color}15` }}>
                <Icon size={24} color={s.color} />
              </View>

              <View className="flex-1">
                <View className="flex-row justify-between items-center mb-1.5">
                  <Text className="text-lg font-black text-slate-800 font-serif">{s.label}</Text>
                  <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{s.id.replace('_', ' ')}</Text>
                </View>
                <Text className="text-sm text-slate-500 leading-relaxed">{s.desc}</Text>
              </View>

              {loading && isSelected && (
                <View className="absolute inset-0 bg-white/80 items-center justify-center rounded-2xl z-10">
                  <ActivityIndicator color={s.color} size="large" />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}
