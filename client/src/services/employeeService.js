import { api } from '../api/axios.js'

export const employeeService = {
  async list() {
    const response = await api.get('/employees')
    return response.data.data
  },
}
