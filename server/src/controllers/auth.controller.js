import { getCurrentUser, loginUser } from '../services/auth.service.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { successResponse } from '../utils/apiResponse.js'

export const login = asyncHandler(async (req, res) => {
  const data = await loginUser(req.body)
  return successResponse(res, 'Login successful', data)
})

export const me = asyncHandler(async (req, res) => {
  const user = await getCurrentUser(req.user.id)
  return successResponse(res, 'Current user fetched', { user })
})

export const logout = asyncHandler(async (_req, res) => successResponse(res, 'Logout successful'))
