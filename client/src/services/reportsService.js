import { api } from '../api/axios.js'

export const reportsService = {
  async getReports({ from, to, status } = {}) {
    const response = await api.get('/reports', { params: { from, to, status } })
    return response.data.data
  },
}
