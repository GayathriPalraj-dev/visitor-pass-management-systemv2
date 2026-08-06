import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { User } from '../models/User.js'
import { AppError } from '../utils/AppError.js'

const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  })

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password')

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid email or password', 401)
  }

  if (!user.isActive) {
    throw new AppError('Account is inactive. Contact administrator.', 403)
  }

  user.lastLoginAt = new Date()
  await user.save({ validateBeforeSave: false })

  return {
    token: signToken(user),
    user: user.toSafeObject(),
  }
}

export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId)

  if (!user || !user.isActive) {
    throw new AppError('Authenticated user was not found', 401)
  }

  return user.toSafeObject()
}
