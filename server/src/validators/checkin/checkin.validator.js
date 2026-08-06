import { param, validationResult } from 'express-validator'
import { errorResponse } from '../../utils/apiResponse.js'

export const validateCheckAction = [param('id').isMongoId().withMessage('Invalid visit request id')]

export const handleValidation = (req, res, next) => {
  const result = validationResult(req)

  if (result.isEmpty()) {
    return next()
  }

  return errorResponse(
    res,
    'Validation failed',
    result.array().map((error) => ({ field: error.path, message: error.msg })),
    422,
  )
}
