import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { ListeningScenario } from '../../hooks/useListeningSession';
import { colors, shadow } from '../../utils/theme';

interface Props {
  scenario: ListeningScenario;
  dictationAnswers: string[];
  dictationChecked: boolean;
  onUpdateAnswer: (index: number, val: string) => void;
  onCheckSpelling: () => void;
}

export function ListeningDictation({ scenario, dictationAnswers, dictationChecked, onUpdateAnswer, onCheckSpelling }: Props) {
  if (!scenario.dictation) return null;

  const renderDictationLine = () => {
    const parts = (scenario.dictation as any).textWithBlanks.split('____');
    
    return (
      <View style={styles.lineWrap}>
        {parts.map((part: string, i: number) => (
          <React.Fragment key={i}>
            <Text style={styles.lineText}>{part}</Text>
            {i < parts.length - 1 && (
              <TextInput
                style={[
                  styles.blankInput,
                  dictationChecked 
                    ? (dictationAnswers[i]?.toLowerCase().trim() === (scenario.dictation as any).answers[i]?.toLowerCase() 
                        ? styles.blankCorrect 
                        : styles.blankIncorrect) 
                    : styles.blankDefault,
                ]}
                value={dictationAnswers[i] || ''}
                onChangeText={(val) => onUpdateAnswer(i, val)}
                placeholder="type"
                placeholderTextColor="#cbd5e1"
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          </React.Fragment>
        ))}
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.title}>Listen to the audio and fill in the missing words.</Text>
      <View style={styles.dictationBox}>
        {renderDictationLine()}
      </View>
      <TouchableOpacity 
        style={[styles.checkBtn, shadow.sm]}
        onPress={onCheckSpelling}
      >
        <Text style={styles.checkBtnText}>Check Spelling</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.slate800,
    marginBottom: 16,
  },
  dictationBox: {
    backgroundColor: colors.slate50,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate200,
    marginBottom: 16,
  },
  lineWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  lineText: {
    color: colors.slate700,
    fontSize: 14,
    lineHeight: 32,
  },
  blankInput: {
    borderBottomWidth: 2,
    paddingHorizontal: 8,
    fontSize: 14,
    marginHorizontal: 4,
    minWidth: 80,
    height: 32,
    padding: 0,
    textAlign: 'center',
  },
  blankDefault: {
    borderBottomColor: colors.slate300,
    color: colors.slate800,
  },
  blankCorrect: {
    borderBottomColor: colors.emerald500,
    color: '#047857',
    backgroundColor: '#ecfdf5',
  },
  blankIncorrect: {
    borderBottomColor: colors.rose500,
    color: '#be123c',
    backgroundColor: '#fff1f2',
  },
  checkBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkBtnText: {
    color: colors.white,
    fontWeight: '700',
  },
});
