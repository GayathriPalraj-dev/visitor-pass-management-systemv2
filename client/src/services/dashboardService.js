import { api } from '../api/axios.js'

export const dashboardService = {
  async getStatistics() {
    const response = await api.get('/dashboard/statistics')
    return response.data.data
  },
}
