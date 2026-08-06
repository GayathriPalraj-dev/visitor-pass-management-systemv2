import { body, param, validationResult } from 'express-validator'
import { errorResponse } from '../../utils/apiResponse.js'

export const validateApprovalAction = [
  param('id').isMongoId().withMessage('Invalid visit request id'),
  body('remarks').optional().isString().trim().isLength({ max: 250 }).withMessage('Remarks must be at most 250 characters'),
]

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
