import { Router } from 'express'
import activityRoutes from './activity.routes.js'
import approvalsRoutes from './approvals.routes.js'
import authRoutes from './auth.routes.js'
import checkinRoutes from './checkin.routes.js'
import dashboardRoutes from './dashboard.routes.js'
import employeesRoutes from './employees.routes.js'
import reportsRoutes from './reports.routes.js'
import visitorsRoutes from './visitors.routes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/visitors', visitorsRoutes)
router.use('/approvals', approvalsRoutes)
router.use('/checkin', checkinRoutes)
router.use('/dashboard', dashboardRoutes)
router.use('/activity', activityRoutes)
router.use('/employees', employeesRoutes)
router.use('/reports', reportsRoutes)

export default router
