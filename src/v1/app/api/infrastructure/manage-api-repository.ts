// Libs
import { Connection } from 'mongoose'

// Utils
import { logError, logInfo } from '@/helpers/utils'
import { connectToMongo } from '@/mongo'

// Domain Shared
import { BrandModelDTO, BrandModelObjectFormatted } from '@/v1/app/shared/domain/brand-model/brand-model-dto'
import {
  VehicleTechnicalDataDTO,
  VehicleTechnicalDataObjectFormatted,
} from '@/v1/app/shared/domain/vehicle-technical-data/vehicle-technical-data-dto'
import { VehicleDTO, VehicleObjectFormatted } from '@/v1/app/shared/domain/vehicle/vehicle-dto'

// Domain API
import { ApiRepository } from '@/v1/app/api/domain/api-repository'
import { formatVehicleDataResult } from '@/v1/app/api/domain/vehicle'

export class ManageApiRepository implements ApiRepository {
  private databaseConnection: Connection | null = null

  constructor() {
    logInfo('ManageApiRepository created')
    ;(async () => {
      const db = await connectToMongo()
      // Rest of the code

      if (!db) {
        logError('Error connecting to MongoDB')
        return
      }

      this.databaseConnection = db
    })()
  }

  getVehicleFromVin = async (vin: string): Promise<VehicleObjectFormatted | null> => {
    if (!this.databaseConnection) {
      logError('Error connecting to MongoDB')
      return null
    }

    const vehicle = await VehicleDTO.findOne({ bastidor_itv: vin }).exec() // Add '.exec()' to execute the query

    if (!vehicle) {
      return null
    }

    return formatVehicleDataResult({ vehicleData: vehicle.toObject() })
  }

  getBrandModelFromWmiAndVds = async ({
    wmi,
    vds,
  }: {
    wmi: string
    vds: string
  }): Promise<BrandModelObjectFormatted | null> => {
    if (!this.databaseConnection) {
      logError('Error connecting to MongoDB')
      return null
    }

    const brandModel = await BrandModelDTO.findOne({ wmi, vds }).exec() // Add '.exec()' to execute the query

    if (!brandModel) {
      return null
    }

    return brandModel.toObject()
  }

  getVehicleTechnicalDataFromMask = async (mask: string): Promise<VehicleTechnicalDataObjectFormatted | null> => {
    if (!this.databaseConnection) {
      logError('Error connecting to MongoDB')
      return null
    }

    const vehicleTechnicalData = await VehicleTechnicalDataDTO.findOne({ mascara: mask }).exec() // Add '.exec()' to execute the query

    if (!vehicleTechnicalData) {
      return null
    }

    return vehicleTechnicalData.toObject()
  }
}
