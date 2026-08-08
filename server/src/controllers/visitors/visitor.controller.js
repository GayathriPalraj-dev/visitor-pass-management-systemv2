import { asyncHandler } from '../../utils/asyncHandler.js'
import { successResponse } from '../../utils/apiResponse.js'
import {
  cancelVisitorRequest,
  createVisitorRequest,
  getVisitorRequestById,
  listVisitorRequests,
  updateVisitorRequest,
} from '../../services/visitors/visitor.service.js'

export const createVisitor = asyncHandler(async (req, res) => {
  const payload = await createVisitorRequest({
    ...req.body,
    createdBy: req.user._id || req.user.id,
  })

  return successResponse(res, 'Visitor registered successfully', payload, 201)
})

export const listVisitors = asyncHandler(async (req, res) => {
  const visitors = await listVisitorRequests({
    search: req.query.search,
    status: req.query.status,
    date: req.query.date,
    user: req.user,
  })

  return successResponse(res, 'Visitors fetched successfully', visitors)
})

export const getVisitor = asyncHandler(async (req, res) => {
  const visitor = await getVisitorRequestById(req.params.id)
  return successResponse(res, 'Visitor fetched successfully', visitor)
})

export const updateVisitor = asyncHandler(async (req, res) => {
  const visitor = await updateVisitorRequest(req.params.id, req.body, req.user)
  return successResponse(res, 'Visitor updated successfully', visitor)
})

export const cancelVisitor = asyncHandler(async (req, res) => {
  const visitor = await cancelVisitorRequest(req.params.id, req.user)
  return successResponse(res, 'Visitor cancelled successfully', visitor)
})
