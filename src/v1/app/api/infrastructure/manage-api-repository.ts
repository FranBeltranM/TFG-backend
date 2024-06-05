// Libs
import { Connection } from 'mongoose'

// Utils
import { logError, logInfo } from '@/helpers/utils'
import { connectToMongo } from '@/mongo'

// Domain Shared
import { BrandModelDTO, BrandModelObjectFormatted, Brands } from '@/v1/app/shared/domain/brand-model/brand-model-dto'
import {
  VehicleTechnicalDataDTO,
  VehicleTechnicalDataObjectFormatted,
} from '@/v1/app/shared/domain/vehicle-technical-data/vehicle-technical-data-dto'
import {
  VehicleDTO,
  VehicleObject,
  VehicleObjectFormatted,
  VehicleRegisteredInProvince,
  VehicleSeized,
  VehicleStolen,
} from '@/v1/app/shared/domain/vehicle/vehicle-dto'

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
import { ResultsWithPagination } from '@/v1/app/shared/domain/types'

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

  // Vehicle
  getVehicleFromVin = async (vin: string): Promise<VehicleObject | null> => {
    if (!this.databaseConnection) {
      logError('Error connecting to MongoDB')
      return null
    }

    const vehicle = await VehicleDTO.findOne({ bastidor_itv: vin }).exec() // Add '.exec()' to execute the query

    if (!vehicle) {
      return null
    }

    return vehicle.toObject()
  }

  getVehicleFromVinResolved = async (vin: string): Promise<VehicleObjectFormatted | null> => {
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

  getVehicleRegisteredInProvince = async ({
    province,
    skip,
    limit,
  }: {
    province: string
    skip: number
    limit: number
  }): Promise<ResultsWithPagination<VehicleRegisteredInProvince> | null> => {
    if (!this.databaseConnection) {
      logError('Error connecting to MongoDB')
      return null
    }

    const totalVehicles = await VehicleDTO.countDocuments({ 'codigo_provincia_matriculacion.valor': province }).exec() // Add '.exec()' to execute the query

    const vehicles = await VehicleDTO.aggregate([
      {
        $match: { 'codigo_provincia_matriculacion.valor': province },
      },
      {
        $skip: totalVehicles > skip ? skip : skip - limit,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          _id: 0,
          bastidor_itv: 1,
          fecha_matricula: {
            $cond: {
              if: { $eq: ['$fecha_primera_matriculacion', []] },
              then: '$fecha_matricula',
              else: '$fecha_primera_matriculacion',
            },
          },
        },
      },
    ])

    if (!vehicles.length || !totalVehicles) {
      return null
    }

    return {
      results: vehicles.map((vehicle) => vehicle) as VehicleRegisteredInProvince[],
      total: totalVehicles,
      page: Math.ceil(skip / limit) + 1,
      totalPages: Math.ceil(totalVehicles / limit),
    }
  }

  getVehicleRegisteredBetweenDates = async ({
    startDate,
    endDate,
    skip,
    limit,
  }: {
    startDate: Date
    endDate: Date
    skip: number
    limit: number
  }): Promise<ResultsWithPagination<VehicleObjectFormatted> | null> => {
    if (!this.databaseConnection) {
      logError('Error connecting to MongoDB')
      return null
    }

    const vehicles = await VehicleDTO.aggregate([
      {
        $match: { 'fecha_matricula.fecha': { $gte: startDate, $lte: endDate } },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          _id: 0,
          bastidor_itv: 1,
          fecha_matricula: 1,
        },
      },
    ])

    if (!vehicles.length) {
      return null
    }

    return {
      results: vehicles.map((vehicle) => vehicle) as VehicleObjectFormatted[],
      page: Math.ceil(skip / limit) + 1,
    }
  }

  getStolenVehicles = async ({
    skip,
    limit,
  }: {
    skip: number
    limit: number
  }): Promise<ResultsWithPagination<VehicleStolen> | null> => {
    if (!this.databaseConnection) {
      logError('Error connecting to MongoDB')
      return null
    }

    const totalVehicles = await VehicleDTO.countDocuments({ 'indicadores.sustraccion': 'S' }).exec() // Add '.exec()' to execute the query

    const vehicles = await VehicleDTO.aggregate([
      {
        $match: { 'indicadores.sustraccion': 'S' },
      },
      {
        $skip: totalVehicles > skip ? skip : skip - limit,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          _id: 0,
          bastidor_itv: 1,
          indicadores: {
            $arrayElemAt: [
              {
                $filter: {
                  input: '$indicadores',
                  as: 'indicador',
                  cond: { $eq: ['$$indicador.sustraccion', 'S'] },
                },
              },
              0,
            ],
          },
        },
      },
    ])

    if (!vehicles.length || !totalVehicles) {
      return null
    }

    return {
      results: vehicles,
      total: totalVehicles,
      page: Math.ceil(skip / limit) + 1,
      totalPages: Math.ceil(totalVehicles / limit),
    }
  }

  getSeizedVeihcles = async ({
    skip,
    limit,
  }: {
    skip: number
    limit: number
  }): Promise<ResultsWithPagination<VehicleSeized> | null> => {
    if (!this.databaseConnection) {
      logError('Error connecting to MongoDB')
      return null
    }

    const totalVehicles = await VehicleDTO.countDocuments({ 'indicadores.embargo': 'SI' }).exec() // Add '.exec()' to execute the query

    const vehicles = await VehicleDTO.aggregate([
      {
        $match: { 'indicadores.embargo': 'SI' },
      },
      {
        $skip: totalVehicles > skip ? skip : skip - limit,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          _id: 0,
          bastidor_itv: 1,
          indicadores: {
            $arrayElemAt: [
              {
                $filter: {
                  input: '$indicadores',
                  as: 'indicador',
                  cond: { $eq: ['$$indicador.embargo', 'SI'] },
                },
              },
              0,
            ],
          },
        },
      },
    ])

    if (!vehicles.length || !totalVehicles) {
      return null
    }

    return {
      results: vehicles,
      total: totalVehicles,
      page: Math.ceil(skip / limit) + 1,
      totalPages: Math.ceil(totalVehicles / limit),
    }
  }

  // BrandModel
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

  getBrandsList = async (): Promise<Brands | null> => {
    if (!this.databaseConnection) {
      logError('Error connecting to MongoDB')
      return null
    }

    const totalBrandModels = BrandModelDTO.estimatedDocumentCount().exec() // Add '.exec()' to execute the query

    const brands = await BrandModelDTO.aggregate([
      {
        $group: {
          _id: 'marca_itv',
          label: { $addToSet: '$marca_itv' },
        },
      },
      {
        $unwind: '$label',
      },
      {
        $project: {
          _id: 0,
          label: 1,
        },
      },
      {
        $sort: { label: 1 },
      },
    ])

    if (!brands.length || !totalBrandModels) {
      return null
    }

    return brands
  }

  // VehicleTechnicalData
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
