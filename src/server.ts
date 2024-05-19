// Libs
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Application } from 'express'

// Routes
import { routesV1 } from '@/v1/routes'
import { logInfo } from './helpers/utils'

// Swagger
import { swaggerDocs as v1Swagger } from '@/v1/swagger'

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
    v1Swagger(this.app, this.port)

    this.app.use('/api/v1', routesV1)

    // Default routes
    this.app.use('/api', (_, res) => res.send('🚀 API running'))
    this.app.use('/', (_, res) =>
      res.send(`
      <h1>🚀 Fran Beltrán TFG</h1>

      <h2>Routes</h2>
      <ul>
        <li><a href="/api">/api</a></li>
        <li><a href="/api/v1">/api/v1</a></li>
      </ul>

      <h2>Swagger</h2>
      <p>Version 1 Docs are available on <a href="/api/v1/docs">/api/v1/docs</a></p>
      `)
    )
  }

  middlewares = () => {
    this.app.use(express.json())
  }
}
