import { ActivityLog } from '../../models/ActivityLog.js'
import { VisitRequest } from '../../models/VisitRequest.js'
import { AppError } from '../../utils/AppError.js'

export const checkInVisitor = async (id, user) => {
  const request = await VisitRequest.findById(id)
  if (!request) {
    throw new AppError('Visit request not found', 404)
  }

  if (request.status === 'CANCELLED') {
    throw new AppError('Cancelled visitors cannot be checked in', 400)
  }

  if (request.status === 'REJECTED') {
    throw new AppError('Rejected visitors cannot be checked in', 400)
  }

  if (request.status !== 'APPROVED') {
    throw new AppError('Only approved visitors can be checked in', 400)
  }

  if (request.checkInTime) {
    throw new AppError('Visitor is already checked in', 409)
  }

  request.status = 'CHECKED_IN'
  request.checkInTime = new Date()
  await request.save()

  await ActivityLog.create({
    action: 'Visitor Checked-In',
    performedBy: user._id,
    visitRequest: request._id,
    remarks: 'Checked in',
  })

  return request.populate(['visitor', 'employee'])
}

export const checkOutVisitor = async (id, user) => {
  const request = await VisitRequest.findById(id)
  if (!request) {
    throw new AppError('Visit request not found', 404)
  }

  if (request.status !== 'CHECKED_IN') {
    throw new AppError('Only checked-in visitors can be checked out', 400)
  }

  if (request.checkOutTime) {
    throw new AppError('Visitor is already checked out', 409)
  }

  request.status = 'CHECKED_OUT'
  request.checkOutTime = new Date()
  await request.save()

  await ActivityLog.create({
    action: 'Visitor Checked-Out',
    performedBy: user._id,
    visitRequest: request._id,
    remarks: 'Checked out',
  })

  return request.populate(['visitor', 'employee'])
}
