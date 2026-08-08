import { Employee } from '../../models/Employee.js'
import { VisitRequest } from '../../models/VisitRequest.js'
import { Visitor } from '../../models/Visitor.js'
import { AppError } from '../../utils/AppError.js'

const resolveEmployeeId = async (user) => {
  const employee = await Employee.findOne({ user: user._id }).select('_id')
  return employee ? employee._id : null
}

const countByStatus = async (query) => {
  const [pending, approved, rejected, checkedIn, checkedOut, cancelled] = await Promise.all([
    VisitRequest.countDocuments({ ...query, status: 'PENDING' }),
    VisitRequest.countDocuments({ ...query, status: 'APPROVED' }),
    VisitRequest.countDocuments({ ...query, status: 'REJECTED' }),
    VisitRequest.countDocuments({ ...query, status: 'CHECKED_IN' }),
    VisitRequest.countDocuments({ ...query, status: 'CHECKED_OUT' }),
    VisitRequest.countDocuments({ ...query, status: 'CANCELLED' }),
  ])

  return { pending, approved, rejected, checkedIn, checkedOut, cancelled }
}

const getAdminStats = async () => {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  const end = new Date()
  end.setHours(23, 59, 59, 999)

  const [totalVisitors, todaysVisitors, employees, statusCounts] = await Promise.all([
    Visitor.countDocuments(),
    VisitRequest.countDocuments({ visitDate: { $gte: start, $lte: end } }),
    Employee.countDocuments({ isActive: true }),
    countByStatus({}),
  ])

  return {
    totalVisitors,
    todaysVisitors,
    pending: statusCounts.pending,
    approved: statusCounts.approved,
    checkedIn: statusCounts.checkedIn,
    checkedOut: statusCounts.checkedOut,
    rejected: statusCounts.rejected,
    employees,
  }
}

const getReceptionistStats = async () => {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  const end = new Date()
  end.setHours(23, 59, 59, 999)

  const todayQuery = { visitDate: { $gte: start, $lte: end } }

  const [todaysVisitors, statusCounts] = await Promise.all([
    VisitRequest.countDocuments(todayQuery),
    countByStatus({ ...todayQuery }),
  ])

  return {
    todaysVisitors,
    pending: statusCounts.pending,
    checkedIn: statusCounts.checkedIn,
    checkedOut: statusCounts.checkedOut,
  }
}

const getEmployeeStats = async (employeeId) => {
  const query = employeeId ? { employee: employeeId } : {}

  const [pending, approved, rejected] = await Promise.all([
    VisitRequest.countDocuments({ ...query, status: 'PENDING' }),
    VisitRequest.countDocuments({ ...query, status: 'APPROVED' }),
    VisitRequest.countDocuments({ ...query, status: 'REJECTED' }),
  ])

  return { pendingApprovals: pending, approved, rejected }
}

export const getDashboardStatistics = async (user) => {
  if (user.role === 'ADMIN') {
    return getAdminStats()
  }

  if (user.role === 'RECEPTIONIST') {
    return getReceptionistStats()
  }

  if (user.role === 'EMPLOYEE') {
    const employeeId = await resolveEmployeeId(user)
    if (!employeeId) {
      throw new AppError('No employee profile linked to this account', 403)
    }
    return getEmployeeStats(employeeId)
  }

  throw new AppError('Invalid role', 403)
}
