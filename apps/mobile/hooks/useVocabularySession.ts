import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import type { VocabWord } from '@fluenix/shared';
import { API_ROUTES } from '@fluenix/shared';
import { apiClient } from '../utils/apiClient';
import { offlineStorage } from '../utils/offlineStorage';



export function useVocabularySession(sessionSize: number = 10) {
  const { getToken } = useAuth();
  const { user } = useUser();
  
  const [sessionWords, setSessionWords] = useState<VocabWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSession = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken();
      const res = await apiClient.get(`${API_ROUTES.VOCABULARY_SESSION}?count=${sessionSize}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setSessionWords(res.data);
      await offlineStorage.cacheVocabulary(res.data);
    } catch (err: unknown) {
      console.error('Failed to fetch vocabulary session:', err);
      // Offline fallback: try to load cached vocabulary
      const cached = await offlineStorage.getCachedVocabulary();
      if (cached) {
        setSessionWords(cached as VocabWord[]);
      } else {
        const errorMessage = err instanceof Error ? err.message : 'Error fetching words';
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, [user?.id, sessionSize]);

  const completeSession = async (masteredWords: string[], needsReviewWords: string[]) => {
    if (!user) return;

    try {
      const token = await getToken();
      const allWordIds = [...masteredWords, ...needsReviewWords];
      
      if (allWordIds.length > 0) {
        await apiClient.post(
          API_ROUTES.VOCABULARY_COMPLETE,
          {
            userId: user.id,
            wordIds: allWordIds
          },
          { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        );
      }

      const score = Math.round((masteredWords.length / sessionSize) * 100);
      await apiClient.post(
        API_ROUTES.SESSIONS,
        {
          userId: user.id,
          type: 'vocabulary',
          scenario: 'Flashcard Review',
          duration: 1,
          score: score,
          feedback: {
            mastered: masteredWords.length,
            needsReview: needsReviewWords.length
          }
        },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
    } catch (err) {
      console.error('Failed to save session:', err);
    }
  };

  return {
    sessionWords,
    loading,
    error,
    fetchSession,
    completeSession
  };
}
