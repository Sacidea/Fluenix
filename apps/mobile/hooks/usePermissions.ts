import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { Audio } from 'expo-av';
export function usePermissions() {
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState<boolean | null>(null);

  const requestMicrophonePermission = useCallback(async (): Promise<boolean> => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      const granted = status === 'granted';
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
      setHasMicrophonePermission(false);
      return false;
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
