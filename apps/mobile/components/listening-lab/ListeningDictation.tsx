import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { ListeningScenario } from '../../hooks/useListeningSession';

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
      <View className="flex-row flex-wrap items-center">
        {parts.map((part: string, i: number) => (
          <React.Fragment key={i}>
            <Text className="text-slate-700 text-base leading-8">{part}</Text>
            {i < parts.length - 1 && (
              <TextInput
                className={`border-b-2 px-2 text-base mx-1 min-w-[80px] h-8 p-0 text-center ${dictationChecked ? (dictationAnswers[i]?.toLowerCase().trim() === (scenario.dictation as any).answers[i]?.toLowerCase() ? 'border-emerald-500 text-emerald-700 bg-emerald-50' : 'border-rose-500 text-rose-700 bg-rose-50') : 'border-slate-300 text-slate-800'}`}
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
      <Text className="text-lg font-black text-slate-800 mb-4">Listen to the audio and fill in the missing words.</Text>
      <View className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-4">
        {renderDictationLine()}
      </View>
      <TouchableOpacity 
        className="bg-indigo-600 py-3.5 rounded-xl items-center shadow-sm"
        onPress={onCheckSpelling}
      >
        <Text className="text-white font-bold">Check Spelling</Text>
      </TouchableOpacity>
    </View>
  );
}
