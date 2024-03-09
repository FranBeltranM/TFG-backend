import cors from 'cors'
import dotenv from 'dotenv'
import express, { Application } from 'express'

export class Server {
  private app: Application
  private port: string

  constructor() {
    dotenv.config()
    this.app = express()
    this.port = process.env.PORT || '3000'
    this.listening()
    // this.connectDB()
    this.middlewares()
    this.routes()
  }

  listening = () => this.app.listen(this.port, () => console.log(`🚀 Server running on port ${this.port}`))

  // connectDB = () => {
  //   const db = new Database()
  //   db.open()
  // }

  routes = () => {
    this.app.use(cors({ origin: '*' }))
    // this.app.use('/api/v1', routesV1)
  }

  middlewares = () => {
    this.app.use(express.json())
  }
}
