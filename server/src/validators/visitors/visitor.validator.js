import { body, param, query, validationResult } from 'express-validator'
import { errorResponse } from '../../utils/apiResponse.js'

const isValidTime = (value) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(value)

export const validateVisitor = [
  body('visitor.name').trim().notEmpty().withMessage('Visitor name is required'),
  body('visitor.phone').trim().notEmpty().withMessage('Phone number is required'),
  body('visitor.email').isEmail().withMessage('Valid visitor email is required').normalizeEmail(),
  body('visitor.company').trim().notEmpty().withMessage('Company is required'),
  body('visitor.idProofNumber').trim().notEmpty().withMessage('ID proof number is required'),
  body('employee').isMongoId().withMessage('Valid employee is required'),
  body('purpose').trim().notEmpty().withMessage('Purpose is required'),
  body('visitDate').isISO8601().withMessage('Visit date is required'),
  body('expectedArrivalTime').custom((value) => {
    if (!isValidTime(value)) {
      throw new Error('Expected arrival time must be in HH:MM format')
    }
    return true
  }),
]

export const validateVisitorUpdate = [
  body('visitor.name').optional().trim().notEmpty().withMessage('Visitor name is required'),
  body('visitor.phone').optional().trim().notEmpty().withMessage('Phone number is required'),
  body('visitor.email').optional().isEmail().withMessage('Valid visitor email is required').normalizeEmail(),
  body('visitor.company').optional().trim().notEmpty().withMessage('Company is required'),
  body('visitor.idProofNumber').optional().trim().notEmpty().withMessage('ID proof number is required'),
  body('employee').optional().isMongoId().withMessage('Valid employee is required'),
  body('purpose').optional().trim().notEmpty().withMessage('Purpose is required'),
  body('visitDate').optional().isISO8601().withMessage('Visit date is required'),
  body('expectedArrivalTime').optional().custom((value) => {
    if (!isValidTime(value)) {
      throw new Error('Expected arrival time must be in HH:MM format')
    }
    return true
  }),
]

export const validateVisitorId = [param('id').isMongoId().withMessage('Invalid visitor request id')]

export const validateListVisitors = [
  query('search').optional().trim().escape(),
  query('status').optional().isIn(['PENDING', 'APPROVED', 'REJECTED', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED']).withMessage('Invalid status'),
  query('date').optional().isISO8601().withMessage('Invalid date'),
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
