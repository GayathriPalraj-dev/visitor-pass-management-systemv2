import { Router } from 'express'
import { authenticate, authorizeRoles } from '../middleware/auth.middleware.js'
import { getEmployees } from '../controllers/employees/employee.controller.js'

const router = Router()

router.use(authenticate)
router.get('/', authorizeRoles('ADMIN', 'RECEPTIONIST'), getEmployees)

export default router
