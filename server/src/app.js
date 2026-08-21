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

const allowedOrigins = new Set([
  env.clientUrl,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
])

const isAllowedVercelOrigin = (origin) =>
  /^https:\/\/visitor-pass-management-systemv2(?:-[a-z0-9-]+)?(?:-gayathripalraj)?\.vercel\.app$/i.test(origin)

app.use(helmet())
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin) || isAllowedVercelOrigin(origin)) {
        callback(null, true)
        return
      }

      callback(new Error('Not allowed by CORS'))
    },
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
