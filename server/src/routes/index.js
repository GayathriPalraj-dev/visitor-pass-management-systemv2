import { Router } from 'express'
import approvalsRoutes from './approvals.routes.js'
import authRoutes from './auth.routes.js'
import checkinRoutes from './checkin.routes.js'
import visitorsRoutes from './visitors.routes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/visitors', visitorsRoutes)
router.use('/approvals', approvalsRoutes)
router.use('/checkin', checkinRoutes)

export default router
