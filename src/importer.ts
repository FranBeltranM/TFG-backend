// Libs
import fs from 'fs'
import readline from 'readline'

// Database
import { connectToMongo, disconnectFromMongo } from '@/mongo'

// Utils
import { logError, logInfo, logWarn } from '@/helpers/utils'

// Domain
import { RowProccessed, formatRowAllFields } from '@/v1/app/importer/domain/importer'

// Services
import {
  importBrandModelBulkService,
  importVehicleBulkService,
  importVehicleTechnicalDataBulkService,
} from '@/v1/app/importer/infrastructure/services'

const readAndImportFile = ({ fileName, disconnect = false }: { fileName: string; disconnect?: boolean }) => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(`./src/data/${fileName}`, {
      encoding: 'latin1',
    })

    const rl = readline.createInterface({
      input: readStream,
    })

    const rows: RowProccessed[] = []

    logInfo(`Started to read files ${fileName}`)

    rl.on('line', async (line) => rows.push(formatRowAllFields({ row: line })))

    rl.on('close', async () => {
      logInfo('Finished reading file')
      logInfo('Start importing document')

      try {
        logInfo('Importing brand models ™️')
        await importBrandModelBulkService(rows)
        logInfo('Importing brand models finished')
        logInfo('Importing vehicles 🚘')
        await importVehicleBulkService(rows)
        logInfo('Importing vehicles finished 🚘')
        logInfo('Importing vehicle technical data 🛠️')
        await importVehicleTechnicalDataBulkService(rows)
        logInfo('Importing vehicle technical data finished 🛠️')

        logInfo('Finished importing data')

        if (disconnect) {
          await disconnectFromMongo()
          logInfo('Importer finished')
          process.exit(0)
        }

        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  })
}

const main = async () => {
  logWarn('Starting importer...')
  logWarn('This could take a while... 🕒')
  logWarn('You should grab a cup of coffee 🍵')

  const importAllowed = false

  if (!importAllowed) {
    logError('Error importing data is not allowed in this environment')
    process.exit(1)
  }

  const db = await connectToMongo()

  if (!db) {
    logError('Error connecting to MongoDB')
    process.exit(1)
  }

  const yearsToInsert = [
    // '2015',
    // '2016',
    // '2017',
    // '2018',
    // '2019',
    // '2020',
    // '2021',
    // '2022',
    // '2023',
    '2024',
  ]
  const monthsToInsert = [
    '01',
    '02',
    '03',
    '04',
    //'05','06', '07', '08', '09', '10', '11', '12'
  ]

  // const fileNames = [
  //   '2014/export_mensual_trf_201412.txt',
  // ]

  const fileNames = yearsToInsert.reduce((acc, year) => {
    const months = monthsToInsert.map((month) => {
      return `${year}/export_mensual_trf_${year}${month}.txt`
    })

    return [...acc, ...months]
  }, [] as string[])

  for (const file of fileNames) {
    const start = new Date()

    await readAndImportFile({
      fileName: file,
    })

    const end = new Date()

    logInfo(`Time to import all files: ${(end.getTime() - start.getTime()) * 0.001}seg`)
  }

  // exit process
  process.exit()
}

;(async () => {
  await main()
})()
