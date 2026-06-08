import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import * as Icons from 'lucide-react-native';
import { useScenarioSession } from '../../../hooks/useScenarioSession';
import { ScenarioSelector } from '../../../components/scenario/ScenarioSelector';
import { SimulationWorkspace } from '../../../components/scenario/SimulationWorkspace';
import { AnalysisResultView } from '../../../components/scenario/AnalysisResultView';

export default function ScenarioPage() {
  const router = useRouter();
  const {
    scenario, setScenario,
    messages, input, setInput,
    loading, started, durationStr,
    startScenario, sendMessage, endAndAnalyzeSession,
    analysisResult, setAnalysisResult,
  } = useScenarioSession();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-slate-50 pt-12">
        
        {/* WEB-STYLE HEADER */}
        <View className="px-4 pb-4 border-b border-slate-200 flex-row items-center justify-between bg-slate-50">
          <TouchableOpacity 
            onPress={() => router.replace('/dashboard')} 
            className="flex-row items-center gap-1.5 bg-white px-3 py-2 border border-slate-200 rounded-lg shadow-sm"
          >
            <Icons.ChevronLeft size={16} color="#475569" />
            <Text className="font-bold text-slate-600 text-sm">Dashboard</Text>
          </TouchableOpacity>
          <View className="items-end">
            <Text className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-widest mb-1">Simulation Environment</Text>
            <Text className="text-lg font-black text-slate-800 font-serif leading-none">Scenario Cockpit</Text>
          </View>
        </View>

        <View className="flex-1">
          {analysisResult ? (
            <AnalysisResultView 
              analysisResult={analysisResult} 
              setAnalysisResult={setAnalysisResult} 
            />
          ) : !started ? (
            <ScenarioSelector 
              scenario={scenario} 
              setScenario={setScenario} 
              startScenario={startScenario} 
              loading={loading}
            />
          ) : (
            <SimulationWorkspace 
              durationStr={durationStr}
              messages={messages}
              input={input}
              setInput={setInput}
              loading={loading}
              sendMessage={sendMessage}
              endAndAnalyzeSession={endAndAnalyzeSession}
            />
          )}
        </View>
      </View>
    </>
  );
}
