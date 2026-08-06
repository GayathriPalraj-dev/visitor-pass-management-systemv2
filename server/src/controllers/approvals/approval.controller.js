import { asyncHandler } from '../../utils/asyncHandler.js'
import { successResponse } from '../../utils/apiResponse.js'
import { approveRequest, listApprovalHistory, listPendingApprovals, rejectRequest } from '../../services/approvals/approval.service.js'

export const getPendingApprovals = asyncHandler(async (req, res) => {
  const approvals = await listPendingApprovals(req.user)
  return successResponse(res, 'Pending approvals fetched successfully', approvals)
})

export const getApprovalHistory = asyncHandler(async (req, res) => {
  const approvals = await listApprovalHistory(req.user)
  return successResponse(res, 'Approval history fetched successfully', approvals)
})

export const approveApproval = asyncHandler(async (req, res) => {
  const approval = await approveRequest(req.params.id, req.user, req.body?.remarks || '')
  return successResponse(res, 'Visitor approved successfully', approval)
})

export const rejectApproval = asyncHandler(async (req, res) => {
  const approval = await rejectRequest(req.params.id, req.user, req.body?.remarks || '')
  return successResponse(res, 'Visitor rejected successfully', approval)
})
