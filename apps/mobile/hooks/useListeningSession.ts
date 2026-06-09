import { useState, useEffect, useCallback } from 'react';
import { Platform } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { apiClient } from '../utils/apiClient';



export interface ListeningScenario {
  id: string;
  level: string;
  title: string;
  context: string;
  dialogue: unknown[];
  questions: unknown[];
  dictation: unknown;
  shadowing: unknown;
}

export function useListeningSession() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  
  const [activeScenario, setActiveScenario] = useState<ListeningScenario | null>(null);
  const [isLoadingScenario, setIsLoadingScenario] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadNextScenario = useCallback(async () => {
    if (!isLoaded || !user) return;
    setIsLoadingScenario(true);
    setError(null);
    try {
      const level = (user.publicMetadata.level as string) || 'B2';
      const token = await getToken();
      const res = await apiClient.post(
        `/api/listening/next`,
        { level },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      if (res.data.success) {
        setActiveScenario(res.data.data);
      } else {
        throw new Error('Failed to load next scenario');
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch next listening task. Please try again.");
    } finally {
      setIsLoadingScenario(false);
    }
  }, [isLoaded, user]);

  useEffect(() => {
    if (isLoaded) {
      loadNextScenario();
    }
  }, [loadNextScenario, isLoaded]);

  return {
    activeScenario,
    isLoadingScenario,
    loadNextScenario,
    error
  };
}
