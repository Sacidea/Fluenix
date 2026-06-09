import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import Voice from '@react-native-voice/voice';

export function usePermissions() {
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState<boolean | null>(null);

  const requestMicrophonePermission = useCallback(async (): Promise<boolean> => {
    try {
      // In iOS, Voice.start() automatically triggers the permission dialog if not granted.
      // But we can check via a dummy call or rely on Voice's error handling to guide the user.
      // Since @react-native-voice/voice does not have a direct `requestPermission` method,
      // we will handle the error gracefully here.
      
      return true; // Assume true until Voice throws a 'not allowed' error during start
    } catch (e) {
      return false;
    }
  }, []);

  const handleVoiceError = useCallback((error: any) => {
    if (error?.message?.includes('not allowed') || error?.message?.includes('permission')) {
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
