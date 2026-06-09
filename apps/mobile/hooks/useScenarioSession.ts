import { useState, useRef, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import * as Speech from 'expo-speech';
import { Message, ScenarioType, ScenarioMission, scenarios } from '@fluenix/shared';
import EventSource from 'react-native-sse';
import { apiClient, aiClient, AI_URL } from '../utils/apiClient';

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
  const [listening, setListening] = useState(false);
  const [isLoadingMission, setIsLoadingMission] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<unknown>(null);

  const bottomRef = useRef<unknown>(null);

  useEffect(() => {
    if (!started || !startTime) return;
    const interval = setInterval(() => {
      const diff = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
      const m = String(Math.floor(diff / 60)).padStart(2, '0');
      const s = String(diff % 60).padStart(2, '0');
      setDurationStr(`${m}:${s}`);
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
        .replace(/`/g, '')
        .replace(/[-*_]{3,}/g, '')
        .replace(/^#+\s+/gm, '')
        .replace(/^[-*]\s+/gm, '')
        .replace(/\[([^\]]+)\]/g, '$1')
        .trim();
        
      Speech.speak(cleanText, {
        language: 'en-US',
        rate: 0.95,
        pitch: 1.0,
      });
    }, 100);
  };

  const executeStream = (
    token: string | null,
    payload: Record<string, unknown>,
    currentMessages: Message[],
    onComplete: (fullText: string) => void
  ) => {
    // Start with an empty assistant message
    setMessages([...currentMessages, { role: 'assistant', content: '' }]);
    
    let fullText = '';
    
    // Add stream flag to payload
    payload.stream = true;

    const es = new EventSource(`${AI_URL}/scenario/chat`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      method: 'POST',
      body: JSON.stringify(payload)
    });

    es.addEventListener('message', (event) => {
      if (event.data) {
        fullText += event.data;
        setMessages([...currentMessages, { role: 'assistant', content: fullText }]);
      }
    });

    es.addEventListener('error', (err) => {
      console.error('SSE Error:', err);
      es.close();
      setLoading(false);
      setIsLoadingMission(false);
      onComplete(fullText);
    });

    es.addEventListener('close', () => {
      es.close();
      setLoading(false);
      setIsLoadingMission(false);
      onComplete(fullText);
    });
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
        `/api/scenario/next`,
        { category: scenario, level },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      let missionContent = 'Conduct a React Native technical interview.';
      if (missionRes.data && missionRes.data.success && missionRes.data.data) {
        setActiveMission(missionRes.data.data);
        missionContent = missionRes.data.data.content;
      }
      
      const initialMessages: Message[] = [{ role: 'user', content: 'Begin terminal session.' }];
      
      executeStream(token, {
        scenario,
        level,
        context: missionContent,
        messages: initialMessages
      }, initialMessages, (fullText) => {
        speakAIResponse(fullText);
      });
      
    } catch (err) {
      console.error(err);
      Alert.alert('Bağlantı Hatası', 'Yapay zeka veya backend sunucusuna ulaşılamıyor.');
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
      
      executeStream(token, {
        scenario,
        level,
        context: activeMission?.content || '',
        messages: newMessages
      }, newMessages, (fullText) => {
        speakAIResponse(fullText);
      });
      
    } catch (err) {
      console.error(err);
      Alert.alert('Bağlantı Hatası', 'Yapay zeka sunucusuna ulaşılamıyor (Backend kapalı olabilir).');
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
      Alert.alert("Hata", "Analiz edilecek kadar konuşma yapılmadı. Oturum sonlandırıldı.");
      endSession();
      return;
    }

    setLoading(true);
    Speech.stop();
    try {
      const token = await getToken();
      const res = await aiClient.post(`/scenario/analyze`, {
        scenario,
        level,
        messages
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const raw = res.data.analysis;
      const match = raw.match(/\{[\s\S]*\}/);
      const clean = match ? match[0] : raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      
      let parsedAnalysis;
      try {
        parsedAnalysis = JSON.parse(clean);
      } catch (e) {
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

      if (user) {
        const diffSeconds = startTime ? Math.floor((new Date().getTime() - startTime.getTime()) / 1000) : 0;
        await apiClient.post(
          `/api/sessions`,
          {
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
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (activeMission?.id) {
          await apiClient.post(
            `/api/scenario/complete`,
            { userId: user.id, missionId: activeMission.id },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      }

      setAnalysisResult(parsedAnalysis);
      setStarted(false);

    } catch (err) {
      console.error(err);
      Alert.alert("Hata", "Analiz edilemedi. Konsolu kontrol edin.");
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
    listening,
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
