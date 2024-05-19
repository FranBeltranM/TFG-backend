declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_PORT: string
      MONGODB_URI: string
      MONGODB_DATABSE: string
    }
  }
}
