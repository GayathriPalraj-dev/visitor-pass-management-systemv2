import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

const getHealthUrl = () => {
  const baseURL = api.defaults.baseURL

  if (baseURL?.startsWith('http')) {
    return new URL('/health', baseURL).toString()
  }

  return '/health'
}

export const prewarmApi = async () => {
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), 8000)

  try {
    await fetch(getHealthUrl(), {
      cache: 'no-store',
      signal: controller.signal,
    })
  } catch {
    // The login request still shows the real API error if warm-up fails.
  } finally {
    window.clearTimeout(timeoutId)
  }
}
