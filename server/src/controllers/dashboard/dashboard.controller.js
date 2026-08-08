import { getDashboardStatistics } from '../../services/dashboard/dashboard.service.js'
import { asyncHandler } from '../../utils/asyncHandler.js'
import { successResponse } from '../../utils/apiResponse.js'

export const getStatistics = asyncHandler(async (req, res) => {
  const statistics = await getDashboardStatistics(req.user)
  return successResponse(res, 'Dashboard statistics fetched successfully', statistics)
})
