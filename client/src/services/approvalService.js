import { api } from '../api/axios.js'

export const approvalService = {
  async listPending() {
    const response = await api.get('/approvals/pending')
    return response.data.data
  },

  async listHistory() {
    const response = await api.get('/approvals/history')
    return response.data.data
  },

  async approve(id, remarks = '') {
    const response = await api.patch(`/approvals/${id}/approve`, { remarks })
    return response.data.data
  },

  async reject(id, remarks = '') {
    const response = await api.patch(`/approvals/${id}/reject`, { remarks })
    return response.data.data
  },
}
