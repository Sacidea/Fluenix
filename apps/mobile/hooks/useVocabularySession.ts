import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import axios from 'axios';
import { useAuth, useUser } from '@clerk/clerk-expo';

export type VocabWord = {
  id: string;
  word: string;
  difficulty: string;
  type: string;
  definition: string;
  phonetic: string;
  turkishMeaning: string;
  contextSentence: string;
};

const getApiUrl = () => {
  if (Platform.OS === 'web') return 'http://localhost:3001';
  return process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:3001';
};

const API_URL = getApiUrl();

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
      const res = await axios.get(`${API_URL}/api/vocabulary/session?count=${sessionSize}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setSessionWords(res.data);
    } catch (err: any) {
      console.error('Failed to fetch vocabulary session:', err);
      setError(err.message || 'Error fetching words');
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
        await axios.post(
          `${API_URL}/api/vocabulary/complete`,
          {
            userId: user.id,
            wordIds: allWordIds
          },
          { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        );
      }

      const score = Math.round((masteredWords.length / sessionSize) * 100);
      await axios.post(
        `${API_URL}/api/sessions`,
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
