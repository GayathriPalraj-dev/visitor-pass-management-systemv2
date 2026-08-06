import { app } from './app.js'
import { env } from './config/env.js'
import { connectDb } from './database/connectDb.js'

const startServer = async () => {
  try {
    await connectDb()
    app.listen(env.port, () => {
      console.log(`API running on port ${env.port}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
