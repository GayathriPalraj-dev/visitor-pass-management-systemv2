import { api } from '../api/axios.js'

export const checkinService = {
  async checkIn(id) {
    const response = await api.patch(`/checkin/${id}`)
    return response.data.data
  },

  async checkOut(id) {
    const response = await api.patch(`/checkin/${id}/checkout`)
    return response.data.data
  },
}
