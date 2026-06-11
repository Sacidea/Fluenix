import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import * as Icons from 'lucide-react-native';
import { useScenarioSession } from '../../../hooks/useScenarioSession';
import { ScenarioSelector } from '../../../components/scenario/ScenarioSelector';
import { SimulationWorkspace } from '../../../components/scenario/SimulationWorkspace';
import { AnalysisResultView } from '../../../components/scenario/AnalysisResultView';
import { colors, shadow } from '../../../utils/theme';

export default function ScenarioPage() {
  const router = useRouter();
  const {
    scenario, setScenario,
    messages, input, setInput,
    loading, started, durationStr,
    startScenario, sendMessage, endAndAnalyzeSession,
    analysisResult, setAnalysisResult,
    activeScenario,
  } = useScenarioSession();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        
        {/* WEB-STYLE HEADER */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.replace('/dashboard')} 
            style={styles.backButton}
          >
            <Icons.ChevronLeft size={16} color="#475569" />
            <Text style={styles.backButtonText}>Dashboard</Text>
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <Text style={styles.headerSubtitle}>{activeScenario?.label?.toUpperCase() || 'SIMULATION'}</Text>
            <Text style={styles.headerTitle}>Scenario Cockpit</Text>
          </View>
        </View>

        <View style={styles.content}>
          {analysisResult ? (
            <AnalysisResultView 
              analysisResult={analysisResult as any} 
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.slate50,
    paddingTop: 48,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.slate50,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.slate200,
    borderRadius: 8,
    ...shadow.sm,
  },
  backButtonText: {
    fontWeight: '700',
    color: colors.slate600,
    fontSize: 14,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 4,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.slate800,
    fontFamily: 'serif',
  },
  content: {
    flex: 1,
  },
});
