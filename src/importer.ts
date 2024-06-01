// Libs
import path from 'path'

// Database
import { connectToMongo } from '@/mongo'

// Utils
import { logError, logInfo, logWarn } from '@/helpers/utils'

// Domain
import { getFilesFromDirectory, moveFile } from '@/v1/app/importer/domain/importer'

// Services
import { importDataService } from '@/v1/app/importer/infrastructure/services'

const main = async () => {
  logWarn('Starting importer...')
  logWarn('This could take a while... 🕒')
  logWarn('You should grab a cup of coffee 🍵')

  const db = await connectToMongo()

  if (!db) {
    logError('Error connecting to MongoDB')
    process.exit(1)
  }

  const pathTemp = path.join(__dirname, 'data/')
  const files = await getFilesFromDirectory({ path: pathTemp })

  for (const file of files) {
    const start = new Date()

    await importDataService({
      path: pathTemp,
      fileName: file,
    })

    const end = new Date()

    logInfo(`Time to import all files: ${(end.getTime() - start.getTime()) * 0.001}seg`)
    const newPath = path.join(__dirname, 'data/processed/')
    await moveFile({ path: pathTemp, fileName: file, newPath })
  }

  // exit process
  process.exit()
}

;(async () => {
  await main()
})()
