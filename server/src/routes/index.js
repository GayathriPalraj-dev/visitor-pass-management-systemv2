import { Router } from 'express'
import authRoutes from './auth.routes.js'
import visitorsRoutes from './visitors.routes.js'

const router = Router()

router.use('/auth', authRoutes)
router.use('/visitors', visitorsRoutes)

export default router
