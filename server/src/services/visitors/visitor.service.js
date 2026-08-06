import { AppError } from '../../utils/AppError.js'
import { Employee } from '../../models/Employee.js'
import { VisitRequest } from '../../models/VisitRequest.js'
import { Visitor } from '../../models/Visitor.js'

const normalizeDate = (value) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    throw new AppError('Visit date is invalid', 400)
  }
  return date
}

const normalizeTime = (value) => value?.trim()

export const createVisitorRequest = async ({ visitor, employee, purpose, visitDate, expectedArrivalTime, createdBy, remarks = '' }) => {
  const employeeDoc = await Employee.findById(employee)
  if (!employeeDoc || !employeeDoc.isActive) {
    throw new AppError('Selected employee is not available', 400)
  }

  const pendingCount = await VisitRequest.countDocuments({ employee, status: 'PENDING' })
  if (pendingCount >= 3) {
    throw new AppError('Employee already has three pending requests', 400)
  }

  const visitDateValue = normalizeDate(visitDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (visitDateValue < today) {
    throw new AppError('Visit date cannot be earlier than today', 400)
  }

  if (visitDateValue.toDateString() === today.toDateString()) {
    const [hours, minutes] = normalizeTime(expectedArrivalTime).split(':').map(Number)
    const now = new Date()
    const requestedTime = new Date(now)
    requestedTime.setHours(hours, minutes, 0, 0)

    if (requestedTime < now) {
      throw new AppError('Arrival time cannot be earlier than the current time for today', 400)
    }
  }

  const visitorPayload = {
    name: visitor.name,
    phone: visitor.phone,
    email: visitor.email?.toLowerCase().trim(),
    company: visitor.company,
    idProofNumber: visitor.idProofNumber,
  }

  const existingVisitor = await Visitor.findOne({
    $or: [
      { email: visitorPayload.email },
      { phone: visitorPayload.phone },
      { idProofNumber: visitorPayload.idProofNumber },
    ],
  })

  const visitorDoc = existingVisitor || (await Visitor.create(visitorPayload))

  const existingActive = await VisitRequest.findOne({
    visitor: visitorDoc._id,
    status: { $in: ['PENDING', 'APPROVED', 'CHECKED_IN'] },
  })

  if (existingActive) {
    throw new AppError('Visitor already has an active visit request', 400)
  }

  const sameDayDuplicate = await VisitRequest.findOne({
    visitor: visitorDoc._id,
    visitDate: {
      $gte: new Date(visitDateValue.setHours(0, 0, 0, 0)),
      $lt: new Date(visitDateValue.setHours(23, 59, 59, 999)),
    },
  })

  if (sameDayDuplicate) {
    throw new AppError('Duplicate visitor registration on the same day is not allowed', 400)
  }

  const request = await VisitRequest.create({
    visitor: visitorDoc._id,
    employee,
    purpose,
    visitDate: visitDateValue,
    expectedArrivalTime: normalizeTime(expectedArrivalTime),
    status: 'PENDING',
    createdBy,
    remarks,
  })

  return request.populate(['visitor', 'employee'])
}

export const listVisitorRequests = async ({ search, status, user }) => {
  const query = {}

  if (user.role === 'EMPLOYEE') {
    query.employee = user._id
  }

  if (search) {
    const regex = new RegExp(search, 'i')
    query.$or = [{ 'visitor.name': regex }, { 'employee.name': regex }, { status: regex }]
  }

  if (status) {
    query.status = status
  }

  return VisitRequest.find(query)
    .populate('visitor')
    .populate('employee')
    .sort({ visitDate: 1, expectedArrivalTime: 1 })
}

export const getVisitorRequestById = async (id) => {
  const request = await VisitRequest.findById(id).populate(['visitor', 'employee'])
  if (!request) {
    throw new AppError('Visitor request not found', 404)
  }
  return request
}

export const updateVisitorRequest = async (id, payload, user) => {
  const request = await VisitRequest.findById(id)
  if (!request) {
    throw new AppError('Visitor request not found', 404)
  }

  if (request.status !== 'PENDING' && user.role !== 'ADMIN') {
    throw new AppError('Only pending requests can be updated', 400)
  }

  if (payload.visitor) {
    await Visitor.findByIdAndUpdate(request.visitor, payload.visitor)
  }

  const updateData = {}
  if (payload.employee) updateData.employee = payload.employee
  if (payload.purpose) updateData.purpose = payload.purpose
  if (payload.visitDate) updateData.visitDate = normalizeDate(payload.visitDate)
  if (payload.expectedArrivalTime) updateData.expectedArrivalTime = normalizeTime(payload.expectedArrivalTime)
  if (payload.remarks !== undefined) updateData.remarks = payload.remarks

  await VisitRequest.findByIdAndUpdate(id, updateData, { new: true })
  return getVisitorRequestById(id)
}

export const cancelVisitorRequest = async (id, user) => {
  const request = await VisitRequest.findById(id)
  if (!request) {
    throw new AppError('Visitor request not found', 404)
  }

  if (request.status !== 'PENDING' && user.role !== 'ADMIN') {
    throw new AppError('Only pending requests can be cancelled', 400)
  }

  request.status = 'CANCELLED'
  await request.save()
  return request.populate(['visitor', 'employee'])
}
