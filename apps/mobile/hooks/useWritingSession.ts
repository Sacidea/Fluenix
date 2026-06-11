import { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { WritingExerciseId, writingExercises, WritingMission } from '@fluenix/shared';
import { parseAIResponse, createSessionPayload, API_ROUTES, AI_ROUTES } from '@fluenix/shared';
import { apiClient, aiClient } from '../utils/apiClient';

export function useWritingSession() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const level = 'B2'; // Hardcoded for now, like Scenario
  
  const [exerciseId, setExerciseId] = useState<WritingExerciseId | null>(null);
  const [activeMission, setActiveMission] = useState<WritingMission | null>(null);
  const [isLoadingMission, setIsLoadingMission] = useState(false);

  const [userText, setUserText] = useState('');
  const [feedback, setFeedback] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentExercise = exerciseId ? writingExercises.find(e => e.id === exerciseId) : null;

  const loadNextMission = async (category: WritingExerciseId) => {
    if (!category) return;
    setIsLoadingMission(true);
    setError(null);
    setUserText('');
    setFeedback(null);
    
    try {
      const token = await getToken();
      const res = await apiClient.post(
        API_ROUTES.WRITING_NEXT,
        { level, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (res.data && res.data.success) {
        setActiveMission(res.data.data);
      } else {
        throw new Error('Failed to load next mission');
      }
    } catch (err: unknown) {
      console.error("Failed to fetch next writing task", err);
      setError("Failed to fetch next writing task. Please try again.");
    } finally {
      setIsLoadingMission(false);
    }
  };

  useEffect(() => {
    if (exerciseId) {
      loadNextMission(exerciseId);
    }
  }, [exerciseId, level]);

  const changeExercise = (id: WritingExerciseId | null) => {
    setExerciseId(id);
  };

  const analyzeWriting = async () => {
    if (!userText.trim() || !activeMission) return;
    setLoading(true);
    setFeedback(null);
    setError(null);

    try {
      const token = await getToken();
      
      const res = await aiClient.post(AI_ROUTES.WRITING_ANALYZE, {
        exercise: exerciseId,
        text: userText,
        context: activeMission.context,
        referenceData: activeMission.referenceData,
        level: level 
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const raw = res.data.feedback;
      const parsed = parseAIResponse<Record<string, unknown>>(raw);
      setFeedback(parsed);

      if (user) {
        const sessionPayload = createSessionPayload({
          userId: user.id,
          type: 'writing',
          scenario: activeMission.title,
          duration: 0,
          score: (parsed as any).overall_score ?? 0,
          feedback: parsed
        });
        await apiClient.post(API_ROUTES.SESSIONS, sessionPayload, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined
        });
      }
    } catch (err: unknown) {
      console.error('Writing analysis failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Analysis failed. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    exercise: currentExercise,
    activeMission,
    isLoadingMission,
    loadNextMission,
    userText,
    setUserText,
    feedback,
    loading,
    error,
    analyzeWriting,
    changeExercise,
    exerciseId
  };
}
