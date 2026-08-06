import { Router } from 'express'
import { authenticate, authorizeRoles } from '../middleware/auth.middleware.js'
import {
  cancelVisitor,
  createVisitor,
  getVisitor,
  listVisitors,
  updateVisitor,
} from '../controllers/visitors/visitor.controller.js'
import {
  handleValidation,
  validateListVisitors,
  validateVisitor,
  validateVisitorId,
  validateVisitorUpdate,
} from '../validators/visitors/visitor.validator.js'

const router = Router()

router.use(authenticate)
router.get('/', authorizeRoles('ADMIN', 'RECEPTIONIST', 'EMPLOYEE'), validateListVisitors, handleValidation, listVisitors)
router.post('/', authorizeRoles('ADMIN', 'RECEPTIONIST'), validateVisitor, handleValidation, createVisitor)
router.get('/:id', authorizeRoles('ADMIN', 'RECEPTIONIST', 'EMPLOYEE'), validateVisitorId, handleValidation, getVisitor)
router.put('/:id', authorizeRoles('ADMIN', 'RECEPTIONIST'), validateVisitorId, validateVisitorUpdate, handleValidation, updateVisitor)
router.delete('/:id', authorizeRoles('ADMIN', 'RECEPTIONIST'), validateVisitorId, handleValidation, cancelVisitor)

export default router
