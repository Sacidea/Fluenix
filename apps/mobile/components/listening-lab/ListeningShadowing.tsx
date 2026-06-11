import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';
import type { ListeningScenario } from '@fluenix/shared';
import { colors, shadow } from '../../utils/theme';

interface Props {
  scenario: ListeningScenario;
  isRecording: boolean;
  shadowScore: number | null;
  spokenText: string;
  onToggleRecording: () => void;
}

export function ListeningShadowing({ scenario, isRecording, shadowScore, spokenText, onToggleRecording }: Props) {
  if (!scenario.shadowing) return null;

  return (
    <View>
      <Text style={styles.title}>Listen and Repeat</Text>
      <Text style={styles.subtitle}>Read the exact sentence below into the microphone.</Text>

      <View style={styles.targetContainer}>
        <Text style={styles.targetText}>"{(scenario.shadowing as any).targetText}"</Text>
      </View>

      <TouchableOpacity 
        style={[styles.recordButton, isRecording ? styles.recordingActive : styles.recordingInactive]}
        onPress={onToggleRecording}
      >
        {isRecording ? <Icons.Square size={24} color="white" /> : <Icons.Mic size={24} color="white" />}
      </TouchableOpacity>

      {shadowScore !== null && (
        <View style={styles.resultContainer}>
          <Text style={[
            styles.scoreText,
            shadowScore > 80 ? styles.scoreGood : shadowScore > 50 ? styles.scoreMedium : styles.scoreBad
          ]}>
            {shadowScore}% Accuracy
          </Text>
          <Text style={styles.spokenText}>
            You said: "{spokenText}"
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.slate800,
    marginBottom: 4,
  },
  subtitle: {
    color: colors.slate500,
    marginBottom: 16,
  },
  targetContainer: {
    backgroundColor: '#fdf2f8',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#fce7f3',
    marginBottom: 24,
  },
  targetText: {
    color: '#831843',
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  recordButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 24,
    ...shadow.md,
  },
  recordingActive: {
    backgroundColor: colors.rose500,
  },
  recordingInactive: {
    backgroundColor: '#ec4899',
  },
  resultContainer: {
    backgroundColor: colors.slate50,
    borderWidth: 1,
    borderColor: colors.slate200,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  scoreText: {
    fontWeight: '900',
    fontSize: 24,
  },
  scoreGood: {
    color: colors.emerald500,
  },
  scoreMedium: {
    color: colors.amber500,
  },
  scoreBad: {
    color: colors.rose500,
  },
  spokenText: {
    color: colors.slate500,
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});
