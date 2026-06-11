import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';
import type { ListeningScenario } from '@fluenix/shared';
import { colors, shadow } from '../../utils/theme';

type DialogueLine = {
  text: string;
  speaker?: string;
  idiomHighlight?: {
    word: string;
    meaning: string;
  };
};

interface Props {
  scenario: ListeningScenario;
  isPlaying: boolean;
  onPlayPause: () => void;
  showTranscript: boolean;
  onToggleTranscript: () => void;
  renderLineWithIdioms: (line: DialogueLine) => React.ReactNode;
}

export function ListeningPlayer({ scenario, isPlaying, onPlayPause, showTranscript, onToggleTranscript, renderLineWithIdioms }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.topBar} />
      
      <Text style={styles.title}>{scenario.title}</Text>
      <Text style={styles.context}>{scenario.context}</Text>

      <View style={styles.playerRow}>
        <TouchableOpacity 
          style={styles.playButton}
          onPress={onPlayPause}
        >
          {isPlaying ? <Icons.Square size={24} color="white" /> : <Icons.Play size={24} color="white" style={{ marginLeft: 4 }} />}
        </TouchableOpacity>
        
        <View style={styles.waveformContainer}>
          {[...Array(15)].map((_, i) => (
            <View 
              key={i} 
              style={[
                styles.waveformBar, 
                { 
                  backgroundColor: isPlaying ? colors.cyan500 : '#cffafe',
                  height: isPlaying ? 16 + Math.random() * 24 : 8 
                }
              ]} 
            />
          ))}
        </View>
      </View>

      <TouchableOpacity 
        style={styles.toggleButton}
        onPress={onToggleTranscript}
      >
        {showTranscript ? <Icons.EyeOff size={14} color={colors.cyan500} /> : <Icons.Eye size={14} color={colors.cyan500} />}
        <Text style={styles.toggleButtonText}>{showTranscript ? 'Hide Transcript' : 'Show Transcript'}</Text>
      </TouchableOpacity>

      {showTranscript && (
        <View style={styles.transcriptContainer}>
          {(scenario.dialogue as unknown[]).map((line: unknown, idx: number) => {
            const typedLine = line as DialogueLine;
            return (
            <View key={idx} style={styles.dialogueLine}>
              <Text style={styles.speakerText}>{typedLine.speaker}</Text>
              {renderLineWithIdioms(typedLine)}
            </View>
          )})}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.slate200,
    overflow: 'hidden',
    ...shadow.sm,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: colors.cyan500,
  },
  title: {
    color: colors.slate900,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 4,
    marginTop: 8,
    textAlign: 'center',
  },
  context: {
    color: colors.slate500,
    fontSize: 14,
    marginBottom: 24,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playButton: {
    width: 64,
    height: 64,
    backgroundColor: colors.cyan500,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.md,
  },
  waveformContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    height: 40,
    overflow: 'hidden',
    gap: 4,
  },
  waveformBar: {
    width: 6,
    borderRadius: 9999,
  },
  toggleButton: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 12,
  },
  toggleButtonText: {
    color: colors.cyan500,
    fontWeight: '700',
    marginLeft: 8,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  transcriptContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.slate200,
    borderStyle: 'dashed',
  },
  dialogueLine: {
    marginBottom: 16,
  },
  speakerText: {
    fontWeight: '700',
    fontSize: 11,
    textTransform: 'uppercase',
    color: colors.slate400,
    letterSpacing: 2,
    marginBottom: 4,
  },
});
