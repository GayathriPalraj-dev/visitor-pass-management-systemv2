import { api } from '../api/axios.js'

export const authService = {
  async login(credentials) {
    const response = await api.post('/auth/login', credentials)
    return response.data.data
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me')
    return response.data.data.user
  },

  async logout() {
    const response = await api.post('/auth/logout')
    return response.data
  },
}
