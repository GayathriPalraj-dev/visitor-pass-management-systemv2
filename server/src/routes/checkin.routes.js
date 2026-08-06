import { Router } from 'express'
import { authenticate, authorizeRoles } from '../middleware/auth.middleware.js'
import { checkIn, checkOut } from '../controllers/checkin/checkin.controller.js'
import { handleValidation, validateCheckAction } from '../validators/checkin/checkin.validator.js'

const router = Router()

router.use(authenticate)
router.patch('/:id', authorizeRoles('RECEPTIONIST', 'ADMIN'), validateCheckAction, handleValidation, checkIn)
router.patch('/:id/checkout', authorizeRoles('RECEPTIONIST', 'ADMIN'), validateCheckAction, handleValidation, checkOut)

export default router
