import { useState, useEffect, useRef } from 'react';
import { Platform, Alert } from 'react-native';
import { useAuth, useUser } from '@clerk/clerk-expo';
import * as Speech from 'expo-speech';
import type { Word, PronunciationResult } from '@fluenix/shared';
import { parseAIResponse, API_ROUTES, AI_ROUTES } from '@fluenix/shared';
import { apiClient, aiClient } from '../utils/apiClient';
import { offlineStorage } from '../utils/offlineStorage';
import { usePermissions } from './usePermissions';

let ExpoSpeechRecognitionModule: any = null;
let useSpeechRecognitionEvent: any = (_event: string, _handler: any) => {};

try {
  const speechRecognition = require('expo-speech-recognition');
  ExpoSpeechRecognitionModule = speechRecognition.ExpoSpeechRecognitionModule;
  useSpeechRecognitionEvent = speechRecognition.useSpeechRecognitionEvent;
} catch (e) {
  console.warn('expo-speech-recognition not available, voice features disabled');
}



export function usePronunciationSession() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const { requestMicrophonePermission } = usePermissions();
  const userLevel = 'B2'; // Hardcoded for now
  
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [result, setResult] = useState<PronunciationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [supported, setSupported] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 20;

  useEffect(() => {
    // Fetch Words
    const fetchWords = async () => {
      try {
        const token = await getToken();
        const res = await apiClient.get(API_ROUTES.PRONUNCIATION_WORDS, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        setWords(res.data);
        await offlineStorage.cacheWords(res.data);
      } catch (e: unknown) {
        console.error("Failed to fetch words", e);
        // Offline fallback: try to load cached words
        const cached = await offlineStorage.getCachedWords();
        if (cached) {
          setWords(cached as Word[]);
        }
      }
    };

    fetchWords();

    // Check support using ExpoSpeechRecognitionModule
    if (Platform.OS === 'web') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) setSupported(false);
    }
  }, [getToken, selectedCategory]);

  const generateWords = async (topic: string) => {
    try {
      const token = await getToken();
      await apiClient.post(API_ROUTES.PRONUNCIATION_GENERATE, { topic }, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      // Fetch words again to update list
      const res = await apiClient.get(API_ROUTES.PRONUNCIATION_WORDS, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setWords(res.data);
      await offlineStorage.cacheWords(res.data);
    } catch (e: unknown) {
      console.error("Failed to generate words", e);
    }
  };

  const markWordAsMastered = async (wordId: string) => {
    try {
      const token = await getToken();
      await apiClient.post(API_ROUTES.PRONUNCIATION_MASTER, { wordId }, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      
      // Save session to backend
      if (user?.id) {
        const masteredWord = words.find(w => w.id === wordId);
        await apiClient.post(API_ROUTES.SESSIONS, {
          userId: user.id,
          type: 'pronunciation',
          scenario: masteredWord?.category || 'General',
          duration: 30, // mock duration
          score: 100
        }, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
      }
      
      // We don't remove it from the local list immediately so the user can still see their score.
      // It will be filtered out on the next full page reload.
    } catch (e: unknown) {
      console.error("Failed to mark mastered", e);
    }
  };

  const filteredWords = words.filter(w => selectedCategory === 'All' || w.category === selectedCategory);
  const totalPages = Math.ceil(filteredWords.length / pageSize) || 1;
  const paginatedWords = filteredWords.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    if (filteredWords.length > 0 && !filteredWords.find(w => w.id === words[currentIndex]?.id)) {
      const newIndex = words.findIndex(w => w.id === filteredWords[0].id);
      setCurrentIndex(newIndex >= 0 ? newIndex : 0);
    }
  }, [selectedCategory, filteredWords, words, currentIndex]);

  // Setup Native Voice Listeners
  useSpeechRecognitionEvent('start', () => setListening(true));
  useSpeechRecognitionEvent('end', () => setListening(false));
  useSpeechRecognitionEvent('error', (e: any) => {
    console.error("Voice error", e.error);
    setListening(false);
  });
  useSpeechRecognitionEvent('result', (e: any) => {
    if (e.results && e.results.length > 0) {
      // Get the most confident final transcript
      const finalResult = e.results.find((r: any) => r.isFinal);
      const heard = finalResult ? finalResult.transcript : e.results[0].transcript;
      
      setTranscript(heard);
      if (finalResult || !(e as any).isSpeechDetected) {
        setListening(false);
        ExpoSpeechRecognitionModule?.stop();
        analyzeResult(heard);
      }
    }
  });

  const startListening = async () => {
    if (!ExpoSpeechRecognitionModule) {
      Alert.alert(
        'Ses Tanıma Kullanılamıyor',
        'Bu cihazda ses tanıma desteklenmiyor. Lütfen emülatör yerine gerçek cihaz kullanın.'
      );
      return;
    }
    const hasPerm = await requestMicrophonePermission();
    if (!hasPerm) return;
    try {
      setTranscript('');
      await ExpoSpeechRecognitionModule.start({
        lang: 'en-US',
        interimResults: false,
        maxAlternatives: 1,
        continuous: true
      });
      setListening(true);
    } catch (e) {
      console.error(e);
      setListening(false);
    }
  };

  const stopListening = async () => {
    if (ExpoSpeechRecognitionModule) {
      await ExpoSpeechRecognitionModule.stop();
    }
    setListening(false);
  };

  const analyzeResult = async (heard: string) => {
    if (!words[currentIndex]) return;
    setLoading(true);
    setResult(null);
    try {
      const token = await getToken();
      // 1. Get AI Analysis
      const res = await aiClient.post(AI_ROUTES.PRONUNCIATION_ANALYZE, {
        transcript: heard,
        target_word: words[currentIndex].word,
        level: userLevel
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const parsedResult = parseAIResponse<PronunciationResult>(res.data.result || res.data);
      setResult(parsedResult);
      
      // Auto-master if they passed
      if (parsedResult.is_correct && words[currentIndex]) {
        markWordAsMastered(words[currentIndex].id);
      }

    } catch (err) {
      console.error('Failed to analyze pronunciation:', err);
    } finally {
      setLoading(false);
    }
  };

  const speakWord = () => {
    if (!words[currentIndex]) return;
    Speech.stop();
    Speech.speak(`, ${words[currentIndex].word}`, {
      language: 'en-US',
      rate: 0.8
    });
  };

  const nextWord = () => {
    if (filteredWords.length === 0) return;
    const currentFilteredIndex = filteredWords.findIndex(w => w.id === words[currentIndex]?.id);
    const nextFilteredIndex = (currentFilteredIndex + 1) % filteredWords.length;
    
    const nextWordPage = Math.floor(nextFilteredIndex / pageSize) + 1;
    if (nextWordPage !== currentPage) {
      setCurrentPage(nextWordPage);
    }

    const globalNextIndex = words.findIndex(w => w.id === filteredWords[nextFilteredIndex].id);
    setCurrentIndex(globalNextIndex >= 0 ? globalNextIndex : 0);
    resetSession();
  };

  const setWordByIndex = (index: number) => {
    setCurrentIndex(index);
    resetSession();
  };

  const resetSession = () => {
    setTranscript('');
    setResult(null);
  };

  const categories = ['All', ...Array.from(new Set(words.map(w => w.category)))];

  return {
    words,
    filteredWords,
    paginatedWords,
    categories,
    selectedCategory,
    setSelectedCategory,
    currentPage,
    setCurrentPage,
    totalPages,
    currentIndex,
    currentWord: words[currentIndex] || null,
    listening,
    transcript,
    result,
    loading,
    supported,
    startListening,
    stopListening,
    speakWord,
    nextWord,
    setWordByIndex,
    generateWords,
    markWordAsMastered
  };
}
