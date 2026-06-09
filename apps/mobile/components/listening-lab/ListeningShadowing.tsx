import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Icons from 'lucide-react-native';
import { ListeningScenario } from '../../hooks/useListeningSession';

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
      <Text className="text-lg font-black text-slate-800 mb-1">Listen and Repeat</Text>
      <Text className="text-slate-500 mb-4">Read the exact sentence below into the microphone.</Text>

      <View className="bg-pink-50 p-5 rounded-2xl border border-pink-100 mb-6">
        <Text className="text-pink-900 font-medium text-lg text-center italic">"{(scenario.shadowing as any).targetText}"</Text>
      </View>

      <TouchableOpacity 
        className={`w-16 h-16 rounded-full items-center justify-center self-center shadow-md mb-6 ${isRecording ? 'bg-rose-500' : 'bg-pink-500'}`}
        onPress={onToggleRecording}
      >
        {isRecording ? <Icons.Square size={24} color="white" /> : <Icons.Mic size={24} color="white" />}
      </TouchableOpacity>

      {shadowScore !== null && (
        <View className="bg-slate-50 border border-slate-200 rounded-xl p-4 items-center">
          <Text className={`font-black text-2xl ${shadowScore > 80 ? 'text-emerald-500' : shadowScore > 50 ? 'text-amber-500' : 'text-rose-500'}`}>
            {shadowScore}% Accuracy
          </Text>
          <Text className="text-slate-500 text-sm mt-2 text-center">
            You said: "{spokenText}"
          </Text>
        </View>
      )}
    </View>
  );
}
