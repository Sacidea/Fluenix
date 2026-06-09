declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
    _fluenixActiveUtterance: SpeechSynthesisUtterance
  }
}

export {}
