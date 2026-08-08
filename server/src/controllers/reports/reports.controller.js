import { getReportsStats } from '../../services/reports/reports.service.js'
import { asyncHandler } from '../../utils/asyncHandler.js'
import { successResponse } from '../../utils/apiResponse.js'

export const getReports = asyncHandler(async (req, res) => {
  const stats = await getReportsStats({
    from: req.query.from,
    to: req.query.to,
    status: req.query.status,
  })
  return successResponse(res, 'Reports fetched successfully', stats)
})
