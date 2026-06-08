import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const createTokenCache = () => {
  if (Platform.OS === 'web') {
    return undefined;
  }
  return {
    async getToken(key: string) {
      try {
        const item = await SecureStore.getItemAsync(key);
        console.log(`[TokenCache] getToken(${key}) =`, item ? 'FOUND' : 'NULL');
        return item;
      } catch (err) {
        console.error(`[TokenCache] Error in getToken(${key}):`, err);
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        await SecureStore.setItemAsync(key, value);
        console.log(`[TokenCache] saveToken(${key}) = SUCCESS`);
      } catch (err) {
        console.error(`[TokenCache] Error in saveToken(${key}):`, err);
        return;
      }
    },
  };
};

export const tokenCache = createTokenCache();
