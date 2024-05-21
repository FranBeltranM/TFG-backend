// Libs
import dotenv from 'dotenv'
import mongoose from 'mongoose'

// Helpers
import { logError, logInfo } from '@/helpers/utils'

dotenv.config()
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/test'

logInfo('Connecting to MongoDB...')
logInfo(`Connection string -> ${connectionString}`)

export const connectToMongo = async () => {
  try {
    await mongoose.connect(connectionString, {
      dbName: process.env.MONGODB_DATABASE ?? '',
    })
    logInfo('Connected to MongoDB successfully! 🆙')

    return mongoose.connection
  } catch (error) {
    logError(`Error connecting to MongoDB: ${error}`)
    return null
  }
}

export const disconnectFromMongo = async () => {
  try {
    await mongoose.disconnect()
    logInfo('Disconnected from MongoDB')
  } catch (error) {
    logError(`Error disconnecting from MongoDB:${error}`)
  }
}
