import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Icons from 'lucide-react-native';
import { ListeningScenario } from '../../hooks/useListeningSession';

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
    <View className="bg-white rounded-[20px] p-6 mb-6 shadow-sm border border-slate-200 overflow-hidden">
      <View className="absolute top-0 left-0 right-0 h-1.5 bg-cyan-500" />
      
      <Text className="text-slate-900 text-xl font-black mb-1 mt-2 text-center">{scenario.title}</Text>
      <Text className="text-slate-500 text-sm mb-6 text-center italic">{scenario.context}</Text>

      <View className="flex-row items-center justify-between">
        <TouchableOpacity 
          className="w-16 h-16 bg-cyan-500 rounded-full items-center justify-center shadow-md"
          onPress={onPlayPause}
        >
          {isPlaying ? <Icons.Square size={24} color="white" /> : <Icons.Play size={24} color="white" style={{ marginLeft: 4 }} />}
        </TouchableOpacity>
        
        <View className="flex-1 flex-row items-center justify-between mx-4 h-10 overflow-hidden gap-1">
          {[...Array(15)].map((_, i) => (
            <View 
              key={i} 
              className={`w-1.5 rounded-full ${isPlaying ? 'bg-cyan-400' : 'bg-cyan-100'}`} 
              style={{ height: isPlaying ? 16 + Math.random() * 24 : 8 }} 
            />
          ))}
        </View>
      </View>

      <TouchableOpacity 
        className="mt-6 flex-row items-center justify-center py-2 rounded-xl"
        onPress={onToggleTranscript}
      >
        {showTranscript ? <Icons.EyeOff size={14} color="#06b6d4" /> : <Icons.Eye size={14} color="#06b6d4" />}
        <Text className="text-cyan-600 font-bold ml-2 text-xs uppercase tracking-widest">{showTranscript ? 'Hide Transcript' : 'Show Transcript'}</Text>
      </TouchableOpacity>

      {showTranscript && (
        <View className="mt-4 pt-4 border-t border-slate-200 border-dashed">
          {(scenario.dialogue as unknown[]).map((line: unknown, idx: number) => {
            const typedLine = line as DialogueLine;
            return (
            <View key={idx} className="mb-4">
              <Text className="font-bold text-[11px] uppercase text-slate-400 tracking-widest mb-1">{typedLine.speaker}</Text>
              {renderLineWithIdioms(typedLine)}
            </View>
          )})}
        </View>
      )}
    </View>
  );
}
