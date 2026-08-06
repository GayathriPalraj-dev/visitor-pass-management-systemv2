import { body, validationResult } from 'express-validator'
import { errorResponse } from '../utils/apiResponse.js'

export const validateLogin = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
]

export const handleValidation = (req, res, next) => {
  const result = validationResult(req)

  if (result.isEmpty()) {
    return next()
  }

  return errorResponse(
    res,
    'Validation failed',
    result.array().map((error) => ({
      field: error.path,
      message: error.msg,
    })),
    422,
  )
}
