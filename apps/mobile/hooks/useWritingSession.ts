import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { WritingExerciseId, writingExercises, WritingMission } from '@fluenix/shared';
import { Platform } from 'react-native';

const getBaseUrl = (port: number) => {
  if (Platform.OS === 'web') return `http://localhost:${port}`;
  return `http://10.0.2.2:${port}`;
};

const API_URL = process.env.EXPO_PUBLIC_API_URL || getBaseUrl(3001);
const AI_URL = process.env.EXPO_PUBLIC_AI_URL || getBaseUrl(8000);

export function useWritingSession() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const level = 'B2'; // Hardcoded for now, like Scenario
  
  const [exerciseId, setExerciseId] = useState<WritingExerciseId | null>(null);
  const [activeMission, setActiveMission] = useState<WritingMission | null>(null);
  const [isLoadingMission, setIsLoadingMission] = useState(false);

  const [userText, setUserText] = useState('');
  const [feedback, setFeedback] = useState<any>(null);
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
      const res = await axios.post(
        `${API_URL}/api/writing/next`,
        { level, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (res.data && res.data.success) {
        setActiveMission(res.data.data);
      } else {
        throw new Error('Failed to load next mission');
      }
    } catch (err: any) {
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
      
      const res = await axios.post(`${AI_URL}/writing/analyze`, {
        exercise: exerciseId,
        text: userText,
        context: activeMission.context,
        referenceData: activeMission.referenceData,
        level: level 
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const raw = res.data.feedback;
      const clean = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = typeof clean === 'string' ? JSON.parse(clean) : clean;
      setFeedback(parsed);

      if (user) {
        await axios.post(`${API_URL}/api/sessions`, {
          userId: user.id,
          type: 'writing',
          scenario: activeMission.title,
          duration: 0,
          score: parsed.overall_score ?? null,
          feedback: parsed 
        }, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined
        });
      }
    } catch (err: any) {
      console.error('Writing analysis failed:', err);
      setError(err.response?.data?.detail || 'Analysis failed. Please try again.');
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
