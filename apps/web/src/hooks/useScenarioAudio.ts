import { useState, useRef, useEffect } from 'react'

export function useScenarioAudio() {
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('')
  const [listening, setListening] = useState(false)
  
  const recognitionRef = useRef<any>(null)
  const isMounted = useRef<boolean>(true)
  const speakTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    isMounted.current = true
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices().filter(v => {
        return v.lang.startsWith('en') && !v.name.toLowerCase().includes('us english')
      })
      setAvailableVoices(voices)
      if (voices.length > 0 && !selectedVoiceURI) {
        const defaultVoice = voices.find(v => v.name.includes('Google') && v.lang === 'en-US') || voices[0]
        setSelectedVoiceURI(defaultVoice.voiceURI)
      }
    }

    loadVoices()
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }

    return () => {
      isMounted.current = false
      if (speakTimeoutRef.current) clearTimeout(speakTimeoutRef.current)
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [selectedVoiceURI])

  const speakAIResponse = (text: string) => {
    if (!isMounted.current) return
    window.speechSynthesis.cancel()
    if (speakTimeoutRef.current) clearTimeout(speakTimeoutRef.current)
    
    speakTimeoutRef.current = setTimeout(() => {
      if (!isMounted.current) return
      const cleanText = ", " + text
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/`/g, '')
        .replace(/[-*_]{3,}/g, '')
        .replace(/^#+\s+/gm, '')
        .replace(/^[-*]\s+/gm, '')
        .replace(/\[([^\]]+)\]/g, '$1')
        .trim()
        
      const utterance = new SpeechSynthesisUtterance(cleanText)
      utterance.lang = 'en-US'
      utterance.rate = 1.05

      if (selectedVoiceURI) {
        const selectedVoice = availableVoices.find(v => v.voiceURI === selectedVoiceURI)
        if (selectedVoice) {
          utterance.voice = selectedVoice
        }
      }
      
      window.speechSynthesis.speak(utterance)
    }, 50)
  }

  const startListening = (onResult: (text: string) => void) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => setListening(true)
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      onResult(transcript)
    }

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error)
      setListening(false)
    }

    recognition.onend = () => setListening(false)

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setListening(false)
    }
  }

  return {
    availableVoices,
    selectedVoiceURI,
    setSelectedVoiceURI,
    listening,
    startListening,
    stopListening,
    speakAIResponse
  }
}
