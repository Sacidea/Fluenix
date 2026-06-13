import { useState, useEffect, useCallback } from 'react';
import { Platform } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import type { ListeningScenario } from '@fluenix/shared';
import { API_ROUTES } from '@fluenix/shared';
import { apiClient } from '../utils/apiClient';

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
        API_ROUTES.LISTENING_NEXT,
        { level },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      if (res.data.success) {
        const scenario = res.data.data;
        if (scenario && scenario.questions) {
          scenario.questions.forEach((q: any) => {
            if (q.options) {
              q.options = [...q.options].sort(() => Math.random() - 0.5);
            }
          });
        }
        setActiveScenario(scenario);
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

  const saveSession = async (score: number) => {
    if (!user || !activeScenario) return;
    try {
      const token = await getToken();
      await apiClient.post(API_ROUTES.SESSIONS, {
        userId: user.id,
        type: 'listening',
        scenario: activeScenario.title,
        duration: 0,
        score: score,
        feedback: null
      }, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
    } catch (err) {
      console.error("Failed to save session", err);
    }
  };

  return {
    activeScenario,
    isLoadingScenario,
    loadNextScenario,
    saveSession,
    error
  };
}
