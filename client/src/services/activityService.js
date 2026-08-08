import { api } from '../api/axios.js'

export const activityService = {
  async list({ page = 1, limit = 10 } = {}) {
    const response = await api.get('/activity', { params: { page, limit } })
    return response.data.data
  },
}
