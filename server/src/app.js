import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { env } from './config/env.js'
import { errorHandler, notFound } from './middleware/error.middleware.js'
import apiRoutes from './routes/index.js'
import { successResponse } from './utils/apiResponse.js'

export const app = express()

app.use(helmet())
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  }),
)
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

if (env.nodeEnv === 'development') {
  app.use(morgan('dev'))
}

app.get('/health', (_req, res) => successResponse(res, 'API is healthy'))
app.use('/api/v1', apiRoutes)

app.use(notFound)
app.use(errorHandler)
