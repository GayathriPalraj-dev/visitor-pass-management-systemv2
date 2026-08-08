import { Router } from 'express'
import { query } from 'express-validator'
import { authenticate, authorizeRoles } from '../middleware/auth.middleware.js'
import { getReports } from '../controllers/reports/reports.controller.js'
import { handleValidation } from '../validators/visitors/visitor.validator.js'

const router = Router()

const validateReportsQuery = [
  query('from').optional().isISO8601().withMessage('From date must be a valid date'),
  query('to').optional().isISO8601().withMessage('To date must be a valid date'),
  query('status')
    .optional()
    .isIn(['PENDING', 'APPROVED', 'REJECTED', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED'])
    .withMessage('Invalid status filter'),
]

router.use(authenticate)
router.get('/', authorizeRoles('ADMIN', 'RECEPTIONIST', 'EMPLOYEE'), validateReportsQuery, handleValidation, getReports)

export default router
