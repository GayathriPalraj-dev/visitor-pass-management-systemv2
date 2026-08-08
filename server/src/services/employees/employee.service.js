import { Employee } from '../../models/Employee.js'

export const listActiveEmployees = async () =>
  Employee.find({ isActive: true })
    .select('_id employeeId name department designation')
    .sort({ name: 1 })
