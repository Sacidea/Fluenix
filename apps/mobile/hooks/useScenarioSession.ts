import { useState, useRef, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import * as Speech from 'expo-speech';
import { Message, ScenarioType, ScenarioMission, scenarios } from '@fluenix/shared';
import { parseAIResponse, createSessionPayload, formatDuration, API_ROUTES, AI_ROUTES } from '@fluenix/shared';
import { apiClient, aiClient } from '../utils/apiClient';

export function useScenarioSession() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const level = 'B2';
  
  const [scenario, setScenario] = useState<ScenarioType>('interview');
  const [activeMission, setActiveMission] = useState<ScenarioMission | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [durationStr, setDurationStr] = useState('00:00');
  const [isLoadingMission, setIsLoadingMission] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<unknown>(null);

  const bottomRef = useRef<unknown>(null);

  useEffect(() => {
    if (!started || !startTime) return;
    const interval = setInterval(() => {
      const diff = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
      setDurationStr(formatDuration(diff));
    }, 1000);
    return () => clearInterval(interval);
  }, [started, startTime]);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  const speakAIResponse = (text: string) => {
    Speech.stop();
    setTimeout(() => {
      const cleanText = text
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/^(Interviewer|AI|User|Candidate|You|System):\s*/gmi, '')
        .replace(/[-*_]{2,}/g, '') // Remove 2 or more consecutive dashes/asterisks (e.g. ---)
        .replace(/^[-*#>]\s+/gm, '') // Remove bullet points and headers at start of line
        .replace(/[*#_~>|]/g, '') // Remove any remaining stray markdown symbols
        .replace(/`/g, '')
        .replace(/\[([^\]]+)\]/g, '$1')
        .replace(/[:;]/g, ',')
        .trim();
        
      Speech.speak(cleanText, {
        language: 'en-US',
        rate: 0.95,
        pitch: 1.0,
      });
    }, 100);
  };

  const startScenario = async () => {
    setStarted(true);
    setLoading(true);
    setMessages([]);
    setStartTime(new Date());
    setDurationStr('00:00');
    setIsLoadingMission(true);
    
    try {
      const token = await getToken();
      
      const missionRes = await apiClient.post(
        API_ROUTES.SCENARIO_NEXT,
        { category: scenario, level },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      let missionContent = 'Conduct a React Native technical interview.';
      if (missionRes.data && missionRes.data.success && missionRes.data.data) {
        setActiveMission(missionRes.data.data);
        missionContent = missionRes.data.data.content;
      }
      
      const scenarioLabel = scenarios.find(s => s.id === scenario)?.label || 'Scenario';
      const initialMessages: Message[] = [{ role: 'user', content: `Begin ${scenarioLabel} simulation.` }];
      
      const res = await aiClient.post(AI_ROUTES.SCENARIO_CHAT, {
        scenario,
        level,
        context: missionContent,
        messages: initialMessages
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const reply = res.data.reply;
      // Don't display the hidden initial message on screen, only show the AI's response.
      setMessages([{ role: 'assistant', content: reply }]);
      speakAIResponse(reply);
      setLoading(false);
      setIsLoadingMission(false);
      
    } catch (err) {
      console.error(err);
      Alert.alert('Connection Error', 'Cannot reach the AI or backend server.');
      setLoading(false);
      setIsLoadingMission(false);
    }
  };

  const sendMessage = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || loading) return;
    
    const newMessages: Message[] = [...messages, { role: 'user', content: textToSend }];
    setMessages(newMessages);
    if (!overrideInput) setInput('');
    setLoading(true);
    
    try {
      const token = await getToken();
      
      const res = await aiClient.post(AI_ROUTES.SCENARIO_CHAT, {
        scenario,
        level,
        context: activeMission?.content || '',
        messages: newMessages
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const reply = res.data.reply;
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
      speakAIResponse(reply);
      setLoading(false);
      
    } catch (err) {
      console.error(err);
      Alert.alert('Connection Error', 'Cannot reach the AI server (Backend may be down).');
      setLoading(false);
    }
  };

  const endSession = () => {
    setStarted(false);
    setMessages([]);
    setStartTime(null);
    setActiveMission(null);
    setAnalysisResult(null);
    Speech.stop();
  };

  const endAndAnalyzeSession = async () => {
    if (!started || messages.length <= 1) {
      Alert.alert("Error", "Not enough conversation to analyze. Session ended.");
      endSession();
      return;
    }

    setLoading(true);
    Speech.stop();
    try {
      const token = await getToken();
      const res = await aiClient.post(AI_ROUTES.SCENARIO_ANALYZE, {
        scenario,
        level,
        messages
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const raw = res.data.analysis;
      let parsedAnalysis;
      try {
        parsedAnalysis = parseAIResponse<Record<string, unknown>>(raw);
      } catch (e) {
        // Fallback: try to extract JSON object with regex
        const match = raw.match(/\{[\s\S]*\}/);
        try {
          parsedAnalysis = match ? JSON.parse(match[0]) : null;
        } catch {
          parsedAnalysis = null;
        }
        if (!parsedAnalysis) {
          parsedAnalysis = {
            overall_score: 0,
            fluency_score: 0,
            vocabulary_score: 0,
            technical_accuracy: 0,
            strengths: [],
            improvements: ["Not enough data."],
            overall_feedback: "Error parsing analysis."
          };
        }
      }

      if (user) {
        const diffSeconds = startTime ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000) : 0;
        const sessionPayload = createSessionPayload({
          userId: user.id,
          type: 'scenario',
          scenario: scenario,
          duration: diffSeconds,
          score: parsedAnalysis.overall_score || 0,
          feedback: {
            fluency: parsedAnalysis.fluency_score,
            vocabulary: parsedAnalysis.vocabulary_score,
            technical: parsedAnalysis.technical_accuracy,
            strengths: parsedAnalysis.strengths,
            improvements: parsedAnalysis.improvements,
            overall: parsedAnalysis.overall_feedback,
            context: activeMission?.content || ''
          }
        });
        await apiClient.post(
          API_ROUTES.SESSIONS,
          sessionPayload,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (activeMission?.id) {
          await apiClient.post(
            API_ROUTES.SCENARIO_COMPLETE,
            { userId: user.id, missionId: activeMission.id },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      }

      setAnalysisResult(parsedAnalysis);
      setStarted(false);

    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Analysis failed. Check the console.");
      endSession();
    } finally {
      setLoading(false);
    }
  };

  const activeScenarioObj = scenarios?.find((s) => s.id === scenario) || { title: 'Scenario', description: '' };

  return {
    scenario, setScenario,
    activeMission,
    messages,
    input, setInput,
    loading, started, durationStr,
    isLoadingMission,
    startScenario,
    sendMessage,
    endSession,
    endAndAnalyzeSession,
    analysisResult,
    setAnalysisResult,
    activeScenario: activeScenarioObj,
    bottomRef
  };
}
