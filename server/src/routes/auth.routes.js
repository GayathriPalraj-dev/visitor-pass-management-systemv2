import { Router } from 'express'
import { login, logout, me } from '../controllers/auth.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'
import { handleValidation, validateLogin } from '../validators/auth.validator.js'

const router = Router()

router.post('/login', validateLogin, handleValidation, login)
router.get('/me', authenticate, me)
router.post('/logout', authenticate, logout)

export default router
