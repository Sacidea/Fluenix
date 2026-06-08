import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import * as Icons from 'lucide-react-native';
import { Message } from '@fluenix/shared';

interface Props {
  durationStr: string;
  messages: Message[];
  input: string;
  setInput: (t: string) => void;
  loading: boolean;
  sendMessage: (override?: string) => void;
  endAndAnalyzeSession: () => void;
}

export function SimulationWorkspace({
  durationStr,
  messages,
  input,
  setInput,
  loading,
  sendMessage,
  endAndAnalyzeSession,
}: Props) {
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-slate-50" 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="flex-row items-center justify-between p-4 bg-white border-b border-slate-200 shadow-sm z-10">
        <View className="flex-row items-center gap-2">
          <View className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <Text className="font-bold text-slate-800 tracking-widest font-serif">{durationStr}</Text>
        </View>
        <TouchableOpacity 
          onPress={endAndAnalyzeSession} 
          className="bg-red-50 px-4 py-2 rounded-lg border border-red-100 flex-row items-center gap-1"
        >
          <Icons.Square size={12} color="#ef4444" fill="#ef4444" />
          <Text className="text-red-600 font-bold text-xs uppercase tracking-wider">End Session</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        className="flex-1 px-4 pt-4"
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg, idx) => (
          <View 
            key={idx} 
            className={`mb-4 max-w-[85%] rounded-2xl p-4 shadow-sm ${
              msg.role === 'user' 
                ? 'self-end bg-indigo-600 rounded-br-sm' 
                : 'self-start bg-white border border-slate-100 rounded-bl-sm'
            }`}
          >
            <Text className={`text-base leading-relaxed ${msg.role === 'user' ? 'text-white' : 'text-slate-800'}`}>
              {msg.content.replace(/\*\*(.*?)\*\*/g, '$1')}
            </Text>
          </View>
        ))}
        {loading && (
          <View className="mb-4 max-w-[85%] rounded-2xl p-4 self-start bg-white border border-slate-100 rounded-bl-sm w-16 items-center shadow-sm">
            <ActivityIndicator color="#4f46e5" size="small" />
          </View>
        )}
      </ScrollView>

      <View className="p-4 bg-white border-t border-slate-200 pb-8 pt-4">
        <View className="flex-row items-center gap-2 mb-2 px-2">
           <Icons.Info size={14} color="#94a3b8" />
           <Text className="text-xs text-slate-400">Use your keyboard's mic icon to speak.</Text>
        </View>
        <View className="flex-row items-center gap-3">
          <TextInput
            className="flex-1 bg-slate-100 px-5 py-3.5 rounded-2xl text-slate-800 text-base border border-slate-200/50"
            placeholder="Type your response..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => sendMessage()}
            editable={!loading}
            multiline
            maxLength={500}
            style={{ maxHeight: 100 }}
          />
          <TouchableOpacity 
            className={`w-12 h-12 rounded-full items-center justify-center shadow-sm ${(!input.trim() || loading) ? 'bg-slate-200' : 'bg-indigo-600'}`}
            onPress={() => sendMessage()}
            disabled={!input.trim() || loading}
          >
            <Icons.Send size={20} color={(!input.trim() || loading) ? '#94a3b8' : 'white'} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
