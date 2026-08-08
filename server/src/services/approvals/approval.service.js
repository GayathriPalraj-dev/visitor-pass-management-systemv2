import { ActivityLog } from '../../models/ActivityLog.js'
import { Employee } from '../../models/Employee.js'
import { VisitRequest } from '../../models/VisitRequest.js'
import { AppError } from '../../utils/AppError.js'

const canModifyStatus = (status) => ['PENDING'].includes(status)

const resolveEmployeeId = async (user) => {
  if (user.role !== 'EMPLOYEE') {
    return null
  }

  const employee = await Employee.findOne({ user: user._id }).select('_id')
  return employee ? employee._id : null
}

export const listPendingApprovals = async (user) => {
  const employeeId = await resolveEmployeeId(user)

  // An EMPLOYEE without a linked profile must not see everyone else's pending requests.
  if (user.role === 'EMPLOYEE' && !employeeId) {
    return []
  }

  const query = employeeId ? { employee: employeeId, status: 'PENDING' } : { status: 'PENDING' }

  return VisitRequest.find(query)
    .populate('visitor')
    .populate('employee')
    .sort({ visitDate: 1, expectedArrivalTime: 1 })
}

export const listApprovalHistory = async (user) => {
  const employeeId = await resolveEmployeeId(user)

  // An EMPLOYEE without a linked profile has no approval history of their own.
  if (user.role === 'EMPLOYEE' && !employeeId) {
    return []
  }

  const query = employeeId
    ? { employee: employeeId, status: { $in: ['APPROVED', 'REJECTED'] } }
    : { status: { $in: ['APPROVED', 'REJECTED'] } }

  return VisitRequest.find(query)
    .populate('visitor')
    .populate('employee')
    .sort({ updatedAt: -1 })
}

export const approveRequest = async (id, user, remarks = '') => {
  const request = await VisitRequest.findById(id)
  if (!request) {
    throw new AppError('Visit request not found', 404)
  }

  const employeeId = await resolveEmployeeId(user)

  if (employeeId && request.employee.toString() !== employeeId.toString()) {
    throw new AppError('Only the assigned employee can approve this request', 403)
  }

  if (!canModifyStatus(request.status)) {
    throw new AppError('Only pending requests can be approved', 400)
  }

  request.status = 'APPROVED'
  request.approvedBy = user._id
  request.remarks = remarks || request.remarks
  await request.save()

  await ActivityLog.create({
    action: 'Visitor Approved',
    performedBy: user._id,
    visitRequest: request._id,
    remarks: remarks || 'Approved',
  })

  return request.populate(['visitor', 'employee'])
}

export const rejectRequest = async (id, user, remarks = '') => {
  const request = await VisitRequest.findById(id)
  if (!request) {
    throw new AppError('Visit request not found', 404)
  }

  const employeeId = await resolveEmployeeId(user)

  if (employeeId && request.employee.toString() !== employeeId.toString()) {
    throw new AppError('Only the assigned employee can reject this request', 403)
  }

  if (!canModifyStatus(request.status)) {
    throw new AppError('Only pending requests can be rejected', 400)
  }

  request.status = 'REJECTED'
  request.approvedBy = user._id
  request.remarks = remarks || request.remarks
  await request.save()

  await ActivityLog.create({
    action: 'Visitor Rejected',
    performedBy: user._id,
    visitRequest: request._id,
    remarks: remarks || 'Rejected',
  })

  return request.populate(['visitor', 'employee'])
}
