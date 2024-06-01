// Libs
import cliProgress from 'cli-progress'
import fs from 'fs'
import readline from 'readline'

// BrandModel
import { generateBrandModelBulkInsertDTO } from '@/v1/app/importer/domain/brand-model/brand-model'
import { BrandModelDTO } from '@/v1/app/shared/domain/brand-model/brand-model-dto'

// Vehicle
import { generateVehicleBulkInsertDTO } from '@/v1/app/importer/domain/vehicle/vehicle'
import { VehicleDTO } from '@/v1/app/shared/domain/vehicle/vehicle-dto'

// VehicleTechnicalData
import { generateVehicleTechnicalDataBulk } from '@/v1/app/importer/domain/vehicle-technical-data/vehicle-technical-data'
import { VehicleTechnicalDataDTO } from '@/v1/app/shared/domain/vehicle-technical-data/vehicle-technical-data-dto'

// Domain
import { downloadFile, unzipFileAndClear } from '@/v1/app/importer/domain/downloader'
import { RowProccessed, formatRowAllFields } from '@/v1/app/importer/domain/importer'
import { ImporterRepository } from '@/v1/app/importer/domain/importer-repository'

// Utils
import { logInfo } from '@/helpers/utils'

export class ApiImportRepository implements ImporterRepository {
  private static CHUNK_SIZE = 100000

  importBrandModelBulk(rows: RowProccessed[]): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const brandModelBulk = generateBrandModelBulkInsertDTO({ rows })

        const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
        bar.start(brandModelBulk.length, 0)

        for (let i = 0; i < brandModelBulk.length; i += ApiImportRepository.CHUNK_SIZE) {
          const dataToInsert = brandModelBulk.slice(i, i + ApiImportRepository.CHUNK_SIZE)
          bar.update(i)
          await BrandModelDTO.bulkWrite(dataToInsert as any)
        }

        bar.update(brandModelBulk.length)
        console.log('\n')

        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  importVehicleBulk(rows: RowProccessed[]): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const vehicleBulk = generateVehicleBulkInsertDTO({ rows })

        const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
        bar.start(vehicleBulk.length, 0)

        for (let i = 0; i < vehicleBulk.length; i += ApiImportRepository.CHUNK_SIZE) {
          const dataToInsert = vehicleBulk.slice(i, i + ApiImportRepository.CHUNK_SIZE)
          bar.update(i)
          await VehicleDTO.bulkWrite(dataToInsert as any)
        }

        bar.update(vehicleBulk.length)
        console.log('\n')

        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  importVehicleTechnicalDataBulk(rows: RowProccessed[]): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const vehicleTechnicalBulk = generateVehicleTechnicalDataBulk({ rows })

        const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
        bar.start(vehicleTechnicalBulk.length, 0)

        for (let i = 0; i < vehicleTechnicalBulk.length; i += 5000) {
          bar.update(i)
          try {
            await VehicleTechnicalDataDTO.insertMany(vehicleTechnicalBulk.slice(i, i + 5000), {
              ordered: false,
            })
          } catch (error: any) {
            // ERROR CODE 11000: Duplicate key -> MongoDB error
            if (error.code !== 11000) {
              console.error('Error inserting vehicle technical data', error)
            }
          }
        }

        bar.update(vehicleTechnicalBulk.length)
        console.log('\n')

        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  importData({ path, fileName }: { path: string; fileName: string }): Promise<void> {
    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(`${path}${fileName}`, {
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
          await this.importBrandModelBulk(rows)
          logInfo('Importing brand models finished')
          logInfo('Importing vehicles 🚘')
          await this.importVehicleBulk(rows)
          logInfo('Importing vehicles finished 🚘')
          logInfo('Importing vehicle technical data 🛠️')
          await this.importVehicleTechnicalDataBulk(rows)
          logInfo('Importing vehicle technical data finished 🛠️')

          logInfo('Finished importing data')

          resolve()
        } catch (error) {
          reject(error)
        }
      })
    })
  }

  downloadNewData({ type, date, path }: { type: 'daily' | 'monthly'; date: Date; path: string }): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const response = await downloadFile({ type, date })

      if (response.headers.get('Content-Type')?.includes('application/zip') === false) {
        reject(new Error('No data found for the selected date'))
      }

      if (response.ok && response.headers.get('Content-Type')?.includes('application/zip')) {
        const data = await response.arrayBuffer()
        unzipFileAndClear({ path, data })

        resolve()
      }

      reject(new Error('Unknown error downloading file'))
    })
  }
}
