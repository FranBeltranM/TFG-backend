declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_SERVER: string
      DB_NAME: string
      DB_USER: string
      DB_PASSWORD: string
      DB_PORT: string

      PORT: string
    }
  }
}