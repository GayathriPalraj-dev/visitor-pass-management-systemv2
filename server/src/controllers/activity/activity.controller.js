import { listActivityLogs } from '../../services/activity/activity.service.js'
import { asyncHandler } from '../../utils/asyncHandler.js'
import { successResponse } from '../../utils/apiResponse.js'

export const getActivityLogs = asyncHandler(async (req, res) => {
  const logs = await listActivityLogs({
    page: req.query.page,
    limit: req.query.limit,
  })
  return successResponse(res, 'Activity logs fetched successfully', logs)
})
