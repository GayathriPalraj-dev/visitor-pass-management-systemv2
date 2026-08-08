import { VisitRequest } from '../../models/VisitRequest.js'
import { AppError } from '../../utils/AppError.js'

const toDate = (value, endOfDay = false) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    throw new AppError('Invalid date filter', 400)
  }

  if (endOfDay) {
    date.setHours(23, 59, 59, 999)
  } else {
    date.setHours(0, 0, 0, 0)
  }

  return date
}

export const getReportsStats = async ({ from, to, status } = {}) => {
  const match = {}

  if (from || to) {
    match.visitDate = {}
    if (from) match.visitDate.$gte = toDate(from)
    if (to) match.visitDate.$lte = toDate(to, true)
  }

  if (status) {
    match.status = status
  }

  const baseQuery = VisitRequest.find(match)

  const [totalVisitors, statusCounts] = await Promise.all([
    baseQuery.clone().countDocuments(),
    Promise.all([
      VisitRequest.countDocuments({ ...match, status: 'PENDING' }),
      VisitRequest.countDocuments({ ...match, status: 'APPROVED' }),
      VisitRequest.countDocuments({ ...match, status: 'REJECTED' }),
      VisitRequest.countDocuments({ ...match, status: 'CHECKED_IN' }),
      VisitRequest.countDocuments({ ...match, status: 'CHECKED_OUT' }),
      VisitRequest.countDocuments({ ...match, status: 'CANCELLED' }),
    ]),
  ])

  const [pending, approved, rejected, checkedIn, checkedOut, cancelled] = statusCounts

  return {
    totalVisitors,
    pending,
    approved,
    rejected,
    checkedIn,
    checkedOut,
    cancelled,
  }
}
