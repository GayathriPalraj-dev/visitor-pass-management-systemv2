import { Router } from 'express'
import { authenticate, authorizeRoles } from '../middleware/auth.middleware.js'
import { getActivityLogs } from '../controllers/activity/activity.controller.js'

const router = Router()

router.use(authenticate)
router.get('/', authorizeRoles('ADMIN', 'RECEPTIONIST', 'EMPLOYEE'), getActivityLogs)

export default router
