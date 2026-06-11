import { useState, useCallback } from 'react';
import { Alert } from 'react-native';

export function usePermissions() {
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState<boolean | null>(null);

  const requestMicrophonePermission = useCallback(async (): Promise<boolean> => {
    try {
      // Use expo-speech-recognition for microphone permissions
      const { ExpoSpeechRecognitionModule } = require('expo-speech-recognition');
      const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      const granted = result.status === 'granted';
      setHasMicrophonePermission(granted);
      
      if (!granted) {
        Alert.alert(
          'Microphone Access Required',
          'Please allow microphone access in your device settings to use speaking features.',
          [{ text: 'OK' }]
        );
      }
      return granted;
    } catch (e) {
      // Speech recognition not available (emulator) — assume granted
      console.warn('Could not request microphone permission:', e);
      setHasMicrophonePermission(true);
      return true;
    }
  }, []);

  const handleVoiceError = useCallback((error: any) => {
    if (error?.message?.includes('not allowed') || error?.message?.includes('permission') || error?.message?.includes('denied')) {
      setHasMicrophonePermission(false);
      Alert.alert(
        'Microphone Access Required',
        'Please allow microphone access in your device settings to use speaking features.',
        [{ text: 'OK' }]
      );
    }
  }, []);

  return {
    hasMicrophonePermission,
    requestMicrophonePermission,
    handleVoiceError,
  };
}
