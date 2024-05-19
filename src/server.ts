// Libs
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Application } from 'express'

// Routes
import { routesV1 } from '@/v1/routes'
import { logInfo } from './helpers/utils'

export class Server {
  private app: Application
  private port: string

  constructor() {
    dotenv.config()
    this.app = express()
    this.port = process.env.API_PORT || '4000'
    this.listening()
    this.middlewares()
    this.routes()
  }

  listening = () => this.app.listen(this.port, () => logInfo(`🚀 Server running on port ${this.port}`))

  routes = () => {
    this.app.use(cors({ origin: '*' }))
    this.app.use('/api/v1', routesV1)

    // Default routes
    this.app.use('/api', (_, res) => res.send('🚀 API running'))
    this.app.use('/', (_, res) =>
      res.json({
        message: '🚀 Server running',
        routes: {
          base: '/api',
          v1: '/api/v1',
        },
      })
    )
  }

  middlewares = () => {
    this.app.use(express.json())
  }
}
