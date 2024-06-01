// Libs
import path from 'path'

// Services
import { getLastUpdateDateService } from '@/v1/app/api/infrastructure/api-services'
import { downloadNewDataService } from '@/v1/app/importer/infrastructure/services'

// Utils
import { logError, logInfo, logWarn } from '@/helpers/utils'

const main = async () => {
  logWarn('Starting downloader...')

  const lastDateInserted = await getLastUpdateDateService()

  if (!lastDateInserted) {
    logError('Error getting last date inserted')
    process.exit(1)
  }

  try {
    // Increment by 1 month
    const newDate = lastDateInserted.setMonth(lastDateInserted.getMonth() + 1)
    const downloadPath = path.join(__dirname, '/data')

    logInfo('Downloading new data...')
    await downloadNewDataService({
      type: 'monthly',
      date: new Date(newDate),
      path: downloadPath,
    })
  } catch (error: any) {
    logError(`Error downloading new data ${error}`)
  }

  process.exit(0)
}

;(async () => {
  await main()
})()
