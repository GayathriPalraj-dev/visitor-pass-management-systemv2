import { Router } from 'express'
import { authenticate, authorizeRoles } from '../middleware/auth.middleware.js'
import { getStatistics } from '../controllers/dashboard/dashboard.controller.js'

const router = Router()

router.use(authenticate)
router.get('/statistics', authorizeRoles('ADMIN', 'RECEPTIONIST', 'EMPLOYEE'), getStatistics)

export default router
