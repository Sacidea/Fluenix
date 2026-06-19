import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import * as Icons from 'lucide-react-native';
import { Message } from '@fluenix/shared';
import { colors, shadow } from '../../utils/theme';
import { usePermissions } from '../../hooks/usePermissions';

let ExpoSpeechRecognitionModule: any = null;
let useSpeechRecognitionEvent: any = (_event: string, _handler: any) => {};

try {
  const speechRecognition = require('expo-speech-recognition');
  ExpoSpeechRecognitionModule = speechRecognition.ExpoSpeechRecognitionModule;
  useSpeechRecognitionEvent = speechRecognition.useSpeechRecognitionEvent;
} catch (e) {
  // Speech recognition not available
}

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
  const [isRecording, setIsRecording] = useState(false);
  const { requestMicrophonePermission, handleVoiceError } = usePermissions();

  // Speech recognition event handlers
  useSpeechRecognitionEvent('result', (e: any) => {
    if (e.results && e.results.length > 0) {
      const finalResult = e.results.find((r: any) => r.isFinal);
      const heard = finalResult ? finalResult.transcript : e.results[0].transcript;
      setInput(heard);
      if (finalResult) {
        setIsRecording(false);
        ExpoSpeechRecognitionModule?.stop();
      }
    }
  });

  useSpeechRecognitionEvent('end', () => setIsRecording(false));
  useSpeechRecognitionEvent('error', (e: any) => {
    setIsRecording(false);
    handleVoiceError(e?.error);
  });

  const toggleRecording = async () => {
    if (!ExpoSpeechRecognitionModule) {
      Alert.alert(
        'Ses Tanıma Kullanılamıyor',
        'Bu cihazda ses tanıma desteklenmiyor. Lütfen mesajınızı yazarak gönderin.'
      );
      return;
    }
    
    try {
      if (isRecording) {
        await ExpoSpeechRecognitionModule.stop();
        setIsRecording(false);
      } else {
        const hasPerm = await requestMicrophonePermission();
        if (!hasPerm) return;
        setInput('');
        await ExpoSpeechRecognitionModule.start({
          lang: 'en-US',
          interimResults: true,
          maxAlternatives: 1,
          continuous: true,
        });
        setIsRecording(true);
      }
    } catch (e) {
      console.error('Speech recognition error:', e);
      setIsRecording(false);
    }
  };

  const voiceAvailable = !!ExpoSpeechRecognitionModule;

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
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
        {isRecording && (
          <View style={styles.recordingIndicator}>
            <View style={styles.recordingDot} />
            <Text style={styles.recordingText}>Listening...</Text>
          </View>
        )}
        <View style={styles.inputRow}>
          {voiceAvailable && (
            <TouchableOpacity 
              style={[styles.micBtn, isRecording && styles.micBtnActive]}
              onPress={toggleRecording}
              disabled={loading}
            >
              {isRecording ? (
                <Icons.MicOff size={20} color={colors.white} />
              ) : (
                <Icons.Mic size={20} color={colors.slate500} />
              )}
            </TouchableOpacity>
          )}
          <TextInput
            style={styles.textInput}
            placeholder={isRecording ? "Listening..." : "Type or speak your response..."}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => sendMessage()}
            editable={!loading && !isRecording}
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
    paddingBottom: 60,
    paddingTop: 12,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.red500,
  },
  recordingText: {
    fontSize: 12,
    color: colors.red500,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  micBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.slate100,
    borderWidth: 1,
    borderColor: colors.slate200,
  },
  micBtnActive: {
    backgroundColor: colors.red500,
    borderColor: colors.red500,
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
