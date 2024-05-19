import { logInfo } from '@/helpers/utils'
import { Application } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJson from './swagger-spec.json'

export const swaggerDocs = (app: Application, port: string) => {
  // Route-Handler to visit our docs
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))
  // Make our docs in JSON format available
  app.get('/api/v1/docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerJson)
  })

  logInfo(`Version 1 Docs are available on http://localhost:${port}/api/v1/docs`)
}
