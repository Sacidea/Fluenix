import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';
import { Message } from '@fluenix/shared';
import { colors, shadow } from '../../utils/theme';

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
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.topBar}>
        <View style={styles.timerRow}>
          <View style={styles.liveDot} />
          <Text style={styles.timerText}>{durationStr}</Text>
        </View>
        <TouchableOpacity 
          onPress={endAndAnalyzeSession} 
          style={styles.endBtn}
        >
          <Icons.Square size={12} color={colors.red500} fill={colors.red500} />
          <Text style={styles.endBtnText}>End Session</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesScroll}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg, idx) => (
          <View 
            key={idx} 
            style={[
              styles.messageBubble,
              msg.role === 'user' ? styles.userBubble : styles.aiBubble,
            ]}
          >
            <Text style={[styles.messageText, msg.role === 'user' ? styles.userText : styles.aiText]}>
              {msg.content.replace(/\*\*(.*?)\*\*/g, '$1')}
            </Text>
          </View>
        ))}
        {loading && (
          <View style={styles.loadingBubble}>
            <ActivityIndicator color={colors.primary} size="small" />
          </View>
        )}
      </ScrollView>

      <View style={styles.inputArea}>
        <View style={styles.hintRow}>
           <Icons.Info size={14} color={colors.slate400} />
           <Text style={styles.hintText}>Use your keyboard's mic icon to speak.</Text>
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            placeholder="Type your response..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => sendMessage()}
            editable={!loading}
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={[styles.sendBtn, (!input.trim() || loading) ? styles.sendBtnDisabled : styles.sendBtnActive]}
            onPress={() => sendMessage()}
            disabled={!input.trim() || loading}
          >
            <Icons.Send size={20} color={(!input.trim() || loading) ? colors.slate400 : colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.slate50,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate200,
    ...shadow.sm,
    zIndex: 10,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 9999,
    backgroundColor: colors.red500,
  },
  timerText: {
    fontWeight: '700',
    color: colors.slate800,
    letterSpacing: 4,
    fontFamily: 'serif',
  },
  endBtn: {
    backgroundColor: '#fef2f2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fecaca',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  endBtnText: {
    color: colors.red600,
    fontWeight: '700',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  messagesScroll: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  messageBubble: {
    marginBottom: 16,
    maxWidth: '85%',
    borderRadius: 16,
    padding: 16,
    ...shadow.sm,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate100,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 22,
  },
  userText: {
    color: colors.white,
  },
  aiText: {
    color: colors.slate800,
  },
  loadingBubble: {
    marginBottom: 16,
    maxWidth: '85%',
    borderRadius: 16,
    padding: 16,
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate100,
    borderBottomLeftRadius: 4,
    width: 64,
    alignItems: 'center',
    ...shadow.sm,
  },
  inputArea: {
    padding: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.slate200,
    paddingBottom: 32,
    paddingTop: 16,
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  hintText: {
    fontSize: 10,
    color: colors.slate400,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.slate100,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 16,
    color: colors.slate800,
    fontSize: 14,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.5)',
    maxHeight: 100,
  },
  sendBtn: {
    width: 48,
    height: 48,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.sm,
  },
  sendBtnDisabled: {
    backgroundColor: colors.slate200,
  },
  sendBtnActive: {
    backgroundColor: colors.primary,
  },
});
