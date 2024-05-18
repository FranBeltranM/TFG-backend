// Libs
import cliProgress from 'cli-progress'

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
import { RowProccessed } from '@/v1/app/importer/domain/importer'
import { ImporterRepository } from '@/v1/app/importer/domain/importer-repository'

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
}
