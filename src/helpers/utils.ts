import logger from 'node-color-log'

export const log = ({ message, type = 'log' }: { message: string; type?: 'log' | 'warn' | 'error' }) => {
  switch (type) {
    case 'log':
      logger.info(message)
      break
    case 'warn':
      logger.warn(message)
      break
    case 'error':
      logger.error(message)
      break
    default:
      logger.info(message)
  }
}

export const logInfo = (message: string) => log({ message, type: 'log' })
export const logWarn = (message: string) => log({ message, type: 'warn' })
export const logError = (message: string) => log({ message, type: 'error' })
