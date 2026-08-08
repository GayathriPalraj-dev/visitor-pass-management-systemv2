import { ActivityLog } from '../../models/ActivityLog.js'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10
const MAX_LIMIT = 50

export const listActivityLogs = async ({ page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = {}) => {
  const pageValue = Math.max(Number(page) || DEFAULT_PAGE, 1)
  const limitValue = Math.min(Math.max(Number(limit) || DEFAULT_LIMIT, 1), MAX_LIMIT)

  const [total, logs] = await Promise.all([
    ActivityLog.countDocuments(),
    ActivityLog.find()
      .sort({ createdAt: -1 })
      .skip((pageValue - 1) * limitValue)
      .limit(limitValue)
      .populate({
        path: 'performedBy',
        select: 'name email role',
      })
      .populate({
        path: 'visitRequest',
        select: 'status visitDate purpose',
        populate: {
          path: 'visitor',
          select: 'name company',
        },
      }),
  ])

  return {
    items: logs,
    page: pageValue,
    limit: limitValue,
    total,
    totalPages: Math.ceil(total / limitValue),
  }
}
