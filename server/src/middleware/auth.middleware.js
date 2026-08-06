import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { User } from '../models/User.js'
import { AppError } from '../utils/AppError.js'

export const authenticate = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null

    if (!token) {
      throw new AppError('Authentication token is required', 401)
    }

    const decoded = jwt.verify(token, env.jwtSecret)
    const user = await User.findById(decoded.id)

    if (!user || !user.isActive) {
      throw new AppError('Invalid or inactive user session', 401)
    }

    req.user = user
    next()
  } catch (error) {
    next(error.name === 'JsonWebTokenError' ? new AppError('Invalid token', 401) : error)
  }
}

export const authorizeRoles =
  (...allowedRoles) =>
  (req, _res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to access this resource', 403))
    }

    return next()
  }
