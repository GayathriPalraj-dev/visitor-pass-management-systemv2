import { listActiveEmployees } from '../../services/employees/employee.service.js'
import { asyncHandler } from '../../utils/asyncHandler.js'
import { successResponse } from '../../utils/apiResponse.js'

export const getEmployees = asyncHandler(async (_req, res) => {
  const employees = await listActiveEmployees()
  return successResponse(res, 'Employees fetched successfully', employees)
})
