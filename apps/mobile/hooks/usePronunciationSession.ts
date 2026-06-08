import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import axios from 'axios';
import { useAuth, useUser } from '@clerk/clerk-expo';
import * as Speech from 'expo-speech';

// Dynamic require to prevent breaking the web build
let Voice: any = null;
if (Platform.OS !== 'web') {
  try {
    Voice = require('@react-native-voice/voice').default;
  } catch (e) {
    console.warn("Voice module not available");
  }
}

export type Word = {
  id: string;
  word: string;
  category: string;
  phonetic: string;
};

export type PronunciationResult = {
  accuracy_score: number;
  is_correct: boolean;
  feedback: string;
  tip: string;
};

const getApiUrl = () => {
  if (Platform.OS === 'web') return 'http://localhost:3001';
  return process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:3001';
};

const getAiUrl = () => {
  if (Platform.OS === 'web') return 'http://localhost:8000';
  return process.env.EXPO_PUBLIC_AI_URL || 'http://10.0.2.2:8000';
};

const API_URL = getApiUrl();
const AI_URL = getAiUrl();

export function usePronunciationSession() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const userLevel = 'B2'; // Hardcoded for now
  
  const [words, setWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [result, setResult] = useState<PronunciationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [supported, setSupported] = useState(true);
  
  const recognitionRef = useRef<any>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 20;

  useEffect(() => {
    // Fetch Words
    const fetchWords = async () => {
      try {
        const token = await getToken();
        const res = await axios.get(`${API_URL}/api/pronunciation/words`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        setWords(res.data);
      } catch (e) {
        console.error("Failed to fetch words", e);
      }
    };

    fetchWords();

    if (Platform.OS === 'web') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) setSupported(false);
    } else {
      if (!Voice) setSupported(false);
    }
  }, [getToken, selectedCategory]);

  const generateWords = async (topic: string) => {
    try {
      const token = await getToken();
      await axios.post(`${API_URL}/api/pronunciation/generate`, { topic }, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      // Fetch words again to update list
      const res = await axios.get(`${API_URL}/api/pronunciation/words`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setWords(res.data);
    } catch (e) {
      console.error("Failed to generate words", e);
    }
  };

  const markWordAsMastered = async (wordId: string) => {
    try {
      const token = await getToken();
      await axios.post(`${API_URL}/api/pronunciation/master`, { wordId }, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      // We don't remove it from the local list immediately so the user can still see their score.
      // It will be filtered out on the next full page reload.
    } catch (e) {
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

  // Setup Native Voice Listeners if applicable
  useEffect(() => {
    if (Platform.OS !== 'web' && Voice) {
      Voice.onSpeechStart = () => setListening(true);
      Voice.onSpeechEnd = () => setListening(false);
      Voice.onSpeechResults = (e: any) => {
        if (e.value && e.value.length > 0) {
          const heard = e.value[0];
          setTranscript(heard);
          setListening(false);
          Voice.stop();
          analyzeResult(heard);
        }
      };
      Voice.onSpeechError = (e: any) => {
        console.error("Voice error", e);
        setListening(false);
      };
    }
    return () => {
      if (Platform.OS !== 'web' && Voice) {
        Voice.destroy().then(Voice.removeAllListeners);
      }
    };
  }, [currentIndex, words]);

  const startListening = async () => {
    if (Platform.OS === 'web') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) return;

      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setListening(true);
      recognition.onresult = async (event: any) => {
        const heard = event.results[0][0].transcript;
        setTranscript(heard);
        setListening(false);
        await analyzeResult(heard);
      };
      recognition.onerror = () => setListening(false);
      recognition.onend = () => setListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } else {
      if (!Voice) return;
      try {
        setTranscript('');
        await Voice.start('en-US');
        setListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const stopListening = async () => {
    if (Platform.OS === 'web') {
      recognitionRef.current?.stop();
    } else {
      if (Voice) await Voice.stop();
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
      const res = await axios.post(`${AI_URL}/pronunciation/analyze`, {
        transcript: heard,
        target_word: words[currentIndex].word,
        level: userLevel
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const parsedResult = JSON.parse(res.data.candidates[0].content.parts[0].text);
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
    Speech.speak(words[currentIndex].word, {
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
