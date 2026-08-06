import { env } from '../config/env.js'
import { errorResponse } from '../utils/apiResponse.js'

export const notFound = (req, res) =>
  errorResponse(res, `Route not found: ${req.originalUrl}`, [], 404)

export const errorHandler = (error, _req, res, _next) => {
  const statusCode = error.statusCode || 500
  const message = error.isOperational ? error.message : 'Internal server error'
  const errors = error.errors || []

  if (env.nodeEnv !== 'test') {
    console.error(error)
  }

  return errorResponse(
    res,
    message,
    env.nodeEnv === 'production' ? errors : [...errors, error.stack].filter(Boolean),
    statusCode,
  )
}
