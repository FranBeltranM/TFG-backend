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

// Constants
import {
  ClaveTramite,
  CodigoClaseMatricula,
  CodigoProcedenciaITV,
  CodigoPropulsion,
  CodigoProvincia,
  CodigoTipo,
  IndicadorBajaDefinitiva,
  Servicio,
} from '@/constants/vehicle-constants'

// Domain API
import { ApiRepository } from '@/v1/app/api/domain/api-repository'
import { formatBrandModelResult } from '@/v1/app/api/domain/brand-model'
import { formatVehicleDataResult } from '@/v1/app/api/domain/vehicle'
import { formatVehicleTechnicalDataResult } from '@/v1/app/api/domain/vehicle-technical-data'

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

    return formatBrandModelResult({ brandModel: brandModel.toObject() })
  }

  getBrandModelFromVin = async (vin: string): Promise<BrandModelObjectFormatted | null> => {
    if (!this.databaseConnection) {
      logError('Error connecting to MongoDB')
      return null
    }

    const vehicle = await VehicleDTO.findOne({ bastidor_itv: vin }).exec() // Add '.exec()' to execute the query

    if (!vehicle) {
      return null
    }

    const { wmi, vds } = vehicle

    const brandModel = await BrandModelDTO.findOne({ wmi, vds }).exec() // Add '.exec()' to execute the query

    if (!brandModel) {
      return null
    }

    return formatBrandModelResult({ brandModel: brandModel.toObject() })
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

    return formatVehicleTechnicalDataResult({ vehicleTechnicalData: vehicleTechnicalData.toObject() })
  }

  getLastUpdateDate = async (): Promise<Date | null> => {
    while (!this.databaseConnection) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    const lastUpdate = await VehicleDTO.aggregate([
      {
        $sort: { 'transferencias.fecha_tramite': -1 },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          _id: 1,
          transferencias: 1,
        },
      },
      {
        $unwind: '$transferencias',
      },
      {
        $group: {
          _id: '$_id',
          lastTransferDate: { $last: '$transferencias.fecha_tramite' },
        },
      },
      {
        $project: {
          _id: 0,
          lastTransferDate: 1,
        },
      },
    ])

    if (!lastUpdate.length) {
      return null
    }

    return lastUpdate[0].lastTransferDate
  }

  // Constants
  getPlateClassCode = (): Array<Record<string, string>> | null => {
    const plateClass = Object.entries(CodigoClaseMatricula).map(([key, value]) => ({ label: value, value: key }))
    return plateClass
  }

  getOriginCodeVehicleInspection = (): Array<Record<string, string>> | null => {
    const originCode = Object.entries(CodigoProcedenciaITV).map(([key, value]) => ({ label: value, value: key }))
    return originCode
  }

  getProcessKey(): Record<string, string>[] | null {
    const processKey = Object.entries(ClaveTramite).map(([key, value]) => ({ label: value, value: key }))
    return processKey
  }

  getDefinitiveDeregistrationIndicator = (): Array<Record<string, string>> | null => {
    const definitiveDeregistration = Object.entries(IndicadorBajaDefinitiva).map(([key, value]) => ({
      value: key,
      label: value,
    }))
    return definitiveDeregistration
  }

  getService = (): Array<Record<string, string>> | null => {
    const service = Object.entries(Servicio).map(([key, value]) => ({ label: value, value: key }))
    return service
  }

  getPropulsionCode(): Record<string, string>[] | null {
    const propulsionCode = Object.entries(CodigoPropulsion).map(([key, value]) => ({ label: value, value: key }))
    return propulsionCode
  }

  getProvinceCode(): Record<string, string>[] | null {
    const provinceCode = Object.entries(CodigoProvincia).map(([key, value]) => ({ label: value, value: key }))
    return provinceCode
  }

  getTypeCode(): Record<string, string>[] | null {
    const typeCode = Object.entries(CodigoTipo).map(([key, value]) => ({ label: value, value: key }))
    return typeCode
  }
}
