import { Router } from 'express'
import { authenticate, authorizeRoles } from '../middleware/auth.middleware.js'
import {
  approveApproval,
  getApprovalHistory,
  getPendingApprovals,
  rejectApproval,
} from '../controllers/approvals/approval.controller.js'
import { handleValidation, validateApprovalAction } from '../validators/approvals/approval.validator.js'

const router = Router()

router.use(authenticate)
router.get('/pending', authorizeRoles('EMPLOYEE', 'ADMIN'), getPendingApprovals)
router.get('/history', authorizeRoles('EMPLOYEE', 'ADMIN'), getApprovalHistory)
router.patch('/:id/approve', authorizeRoles('EMPLOYEE', 'ADMIN'), validateApprovalAction, handleValidation, approveApproval)
router.patch('/:id/reject', authorizeRoles('EMPLOYEE', 'ADMIN'), validateApprovalAction, handleValidation, rejectApproval)

export default router
