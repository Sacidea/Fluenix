import axios from 'axios'
import { Platform } from 'react-native'

const getApiUrl = () => {
  if (Platform.OS === 'web') return 'http://localhost:3001'
  return process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:3001'
}

const getAiUrl = () => {
  if (Platform.OS === 'web') return 'http://localhost:8000'
  return process.env.EXPO_PUBLIC_AI_URL || 'http://10.0.2.2:8000'
}

export const API_URL = getApiUrl()
export const AI_URL = getAiUrl()

export const apiClient = axios.create({
  baseURL: API_URL,
})

export const aiClient = axios.create({
  baseURL: AI_URL,
})

// Optionally, you can set auth headers per request by using:
// apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
// But it's usually better to inject token per request or via an interceptor if you have the token context.
