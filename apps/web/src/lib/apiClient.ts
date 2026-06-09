import axios from 'axios'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
})

export const aiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AI_URL || 'http://localhost:8000',
})
