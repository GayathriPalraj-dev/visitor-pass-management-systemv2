import { api } from '../api/axios.js'

export const visitorService = {
  async list(params = {}) {
    const response = await api.get('/visitors', { params })
    return response.data.data
  },

  async get(id) {
    const response = await api.get(`/visitors/${id}`)
    return response.data.data
  },

  async create(payload) {
    const response = await api.post('/visitors', payload)
    return response.data.data
  },

  async update(id, payload) {
    const response = await api.put(`/visitors/${id}`, payload)
    return response.data.data
  },

  async cancel(id) {
    const response = await api.delete(`/visitors/${id}`)
    return response.data.data
  },
}
