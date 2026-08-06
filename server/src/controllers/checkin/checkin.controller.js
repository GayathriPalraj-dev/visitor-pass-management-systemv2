import { asyncHandler } from '../../utils/asyncHandler.js'
import { successResponse } from '../../utils/apiResponse.js'
import { checkInVisitor, checkOutVisitor } from '../../services/checkin/checkin.service.js'

export const checkIn = asyncHandler(async (req, res) => {
  const visit = await checkInVisitor(req.params.id, req.user)
  return successResponse(res, 'Visitor checked in successfully', visit)
})

export const checkOut = asyncHandler(async (req, res) => {
  const visit = await checkOutVisitor(req.params.id, req.user)
  return successResponse(res, 'Visitor checked out successfully', visit)
})
