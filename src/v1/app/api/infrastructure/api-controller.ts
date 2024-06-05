import { Request, Response } from '@/helpers/middle.helper'

// Domain
import {
  ensureSkipAndLimitAreValid,
  ensureVehicleRegisteredBetweenDatesIsValid,
  ensureVehicleRegisteredInProvinceIsValid,
  ensureVehicleVinIsValid,
} from '@/v1/app/api/domain/vehicle'

// Application
import { logInfo } from '@/helpers/utils'
import {
  getBrandModelFromWmiAndVdsService,
  getBrandsListService,
  getDefinitiveDeregistrationIndicatorService,
  getLastUpdateDateService,
  getOriginCodeVehicleInspectionService,
  getPlateClassCodeService,
  getProcessKeyService,
  getPropulsionCodeService,
  getProvinceCodeService,
  getServiceService,
  getTypeCodeService,
  getVehicleFromVinResolvedService,
  getVehicleFromVinService,
  getVehicleRegisteredInProvinceService,
  getVehicleTechnicalDataFromMaskService,
  getVehiclesRegisteredBetweenDatesService,
  getVehiclesSeizedService,
  getVehiclesStolenService,
} from '@/v1/app/api/infrastructure/api-services'

// Vehicle
export const getVehicleFromVin = async (req: Request, res: Response) => {
  try {
    const query = req.query as { vin: string }
    logInfo(`getVehicleFromVin - query: ${JSON.stringify(query)}`)

    const validation = ensureVehicleVinIsValid({ ...query })

    if (typeof validation !== 'string') {
      res.status(400).json({
        success: false,
        message: validation.error.message,
      })
      return
    }

    const vehicle = await getVehicleFromVinService(validation)

    if (!vehicle) {
      res.status(404).json({
        success: false,
        message: 'Vehicle not found',
      })
      return
    }

    const { mascara_ficha_tecnica, wmi, vds, ...restDataVehicle } = vehicle

    const brandModel = await getBrandModelFromWmiAndVdsService({
      wmi: vehicle.wmi,
      vds: vehicle.vds,
    })

    if (!brandModel) {
      res.status(404).json({
        success: false,
        message: 'BrandModel not found',
      })
      return
    }

    const { marca_itv, modelo_itv } = brandModel

    const vehicleTechnicalData = await getVehicleTechnicalDataFromMaskService(mascara_ficha_tecnica)

    if (!vehicleTechnicalData) {
      res.status(404).json({
        success: false,
        message: 'VehicleTechnicalData not found',
      })
      return
    }

    res.status(200).json({
      success: true,
      data: {
        brand_model: {
          marca: marca_itv,
          modelo: modelo_itv ?? '',
        },
        vehicle: {
          ...restDataVehicle,
        },
        technical_data: vehicleTechnicalData,
      },
    })
  } catch (error: any) {
    console.log('error', error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getVehicleFromVinResolved = async (req: Request, res: Response) => {
  try {
    const query = req.query as { vin: string }
    logInfo(`getVehicleFromVin - query: ${JSON.stringify(query)}`)

    const validation = ensureVehicleVinIsValid({ ...query })

    if (typeof validation !== 'string') {
      res.status(400).json({
        success: false,
        message: validation.error.message,
      })
      return
    }

    const vehicle = await getVehicleFromVinResolvedService(validation)

    if (!vehicle) {
      res.status(404).json({
        success: false,
        message: 'Vehicle not found',
      })
      return
    }

    const { mascara_ficha_tecnica, wmi, vds, ...restDataVehicle } = vehicle

    const brandModel = await getBrandModelFromWmiAndVdsService({
      wmi: vehicle.wmi,
      vds: vehicle.vds,
    })

    if (!brandModel) {
      res.status(404).json({
        success: false,
        message: 'BrandModel not found',
      })
      return
    }

    const { marca_itv, modelo_itv } = brandModel

    const vehicleTechnicalData = await getVehicleTechnicalDataFromMaskService(mascara_ficha_tecnica)

    if (!vehicleTechnicalData) {
      res.status(404).json({
        success: false,
        message: 'VehicleTechnicalData not found',
      })
      return
    }

    res.status(200).json({
      success: true,
      data: {
        brand_model: {
          marca: marca_itv,
          modelo: modelo_itv ?? '',
        },
        vehicle: {
          ...restDataVehicle,
        },
        technical_data: vehicleTechnicalData,
      },
    })
  } catch (error: any) {
    console.log('error', error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getVehicleRegisteredInProvince = async (req: Request, res: Response) => {
  try {
    const query = req.query as { province: string; skip: string; limit: string }
    logInfo(`getVehicleRegisteredInProvince - query: ${JSON.stringify(query)}`)

    const validation = ensureVehicleRegisteredInProvinceIsValid({ ...query })

    if ('error' in validation) {
      res.status(400).json({
        success: false,
        message: validation.error?.message ?? validation.error,
      })
      return
    }

    const { province, skip, limit } = validation

    const vehicles = await getVehicleRegisteredInProvinceService({
      province,
      skip,
      limit,
    })

    if (!vehicles) {
      res.status(404).json({
        success: false,
        message: 'Vehicles not found',
      })
      return
    }

    res.status(200).json({
      success: true,
      data: vehicles,
    })
  } catch (error: any) {
    console.log('error', error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getVehiclesRegisteredBetweenDates = async (req: Request, res: Response) => {
  try {
    const query = req.query as { startDate: string; endDate: string; skip: string; limit: string }
    logInfo(`getVehiclesRegisteredBetweenDates - query: ${JSON.stringify(query)}`)

    const valitadion = ensureVehicleRegisteredBetweenDatesIsValid({ ...query })

    if ('error' in valitadion) {
      res.status(400).json({
        success: false,
        message: valitadion.error?.message ?? valitadion.error,
      })
      return
    }

    const { startDate, endDate, skip, limit } = valitadion

    const vehicles = await getVehiclesRegisteredBetweenDatesService({
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      skip: skip,
      limit: limit,
    })

    if (!vehicles) {
      res.status(200).json({
        success: true,
        data: {
          results: [],
        },
      })
      return
    }

    res.status(200).json({
      success: true,
      data: vehicles,
    })
  } catch (error: any) {
    console.log('error', error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getVehiclesStolen = async (req: Request, res: Response) => {
  try {
    const query = req.query as { skip: string; limit: string }
    logInfo(`getVehiclesStolen - query: ${JSON.stringify(query)}`)

    const validation = ensureSkipAndLimitAreValid({ ...query })

    if ('error' in validation) {
      res.status(400).json({
        success: false,
        message: validation.error?.message || validation.error,
      })
      return
    }

    const { skip, limit } = validation

    const vehicles = await getVehiclesStolenService({
      skip: skip,
      limit: limit,
    })

    if (!vehicles) {
      res.status(404).json({
        success: false,
        message: 'Vehicles not found',
      })
      return
    }

    res.status(200).json({
      success: true,
      data: vehicles,
    })
  } catch (error: any) {
    console.log('error', error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getVehiclesSeized = async (req: Request, res: Response) => {
  try {
    const query = req.query as { skip: string; limit: string }
    logInfo(`getVehiclesSeized - query: ${JSON.stringify(query)}`)

    const validation = ensureSkipAndLimitAreValid({ ...query })

    if ('error' in validation) {
      res.status(400).json({
        success: false,
        message: validation.error?.message || validation.error,
      })
      return
    }

    const { skip, limit } = validation

    const vehicles = await getVehiclesSeizedService({
      skip: skip,
      limit: limit,
    })

    if (!vehicles) {
      res.status(404).json({
        success: false,
        message: 'Vehicles not found',
      })
      return
    }

    res.status(200).json({
      success: true,
      data: vehicles,
    })
  } catch (error: any) {
    console.log('error', error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// BrandModels
export const getBrandModelFromVin = async (req: Request, res: Response) => {
  try {
    const query = req.query as { vin: string }
    const validation = ensureVehicleVinIsValid({ ...query })

    if (typeof validation !== 'string') {
      res.status(400).json({
        success: false,
        message: validation.error.message,
      })
      return
    }

    const [wmi, vds] = [validation.slice(0, 3), validation.slice(3, 8)]

    const brandModel = await getBrandModelFromWmiAndVdsService({ wmi, vds })

    if (!brandModel) {
      res.status(404).json({
        success: false,
        message: 'Brand-model not found',
      })
      return
    }

    res.status(200).json({
      success: true,
      data: brandModel,
    })
  } catch (error: any) {
    console.log('error', error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getBrandsList = async (_req: Request, res: Response) => {
  try {
    const brands = await getBrandsListService()

    if (!brands) {
      res.status(404).json({
        success: false,
        message: 'Brands not found',
      })
      return
    }

    res.status(200).json({
      success: true,
      data: brands,
    })
  } catch (error: any) {
    console.log('error', error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Constants
export const getPlateClassCode = (_req: Request, res: Response) => {
  try {
    const plateClassCode = getPlateClassCodeService()

    if (!plateClassCode) {
      res.status(404).json({
        success: false,
        message: 'Plate class code not found',
      })
      return
    }

    res.status(200).json({
      success: true,
      data: plateClassCode,
    })
  } catch (error: any) {
    console.log('error', error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getOriginCodeVehicleInspection = (_req: Request, res: Response) => {
  try {
    const originCode = getOriginCodeVehicleInspectionService()

    if (!originCode) {
      res.status(404).json({
        success: false,
        message: 'Origin code not found',
      })
      return
    }

    res.status(200).json({
      success: true,
      data: originCode,
    })
  } catch (error: any) {
    console.log('error', error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getProcessKey = (_req: Request, res: Response) => {
  try {
    const processKey = getProcessKeyService()

    if (!processKey) {
      res.status(404).json({
        success: false,
        message: 'Process key not found',
      })
      return
    }

    res.status(200).json({
      success: true,
      data: processKey,
    })
  } catch (error: any) {
    console.log('error', error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getDefinitiveDeregistrationIndicator = (_req: Request, res: Response) => {
  try {
    const definitiveDeregistration = getDefinitiveDeregistrationIndicatorService()

    if (!definitiveDeregistration) {
      res.status(404).json({
        success: false,
        message: 'Definitive deregistration indicator not found',
      })
      return
    }

    res.status(200).json({
      success: true,
      data: definitiveDeregistration,
    })
  } catch (error: any) {
    console.log('error', error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getService = (_req: Request, res: Response) => {
  try {
    const service = getServiceService()

    if (!service) {
      res.status(404).json({
        success: false,
        message: 'Service data not found',
      })
      return
    }

    res.status(200).json({
      success: true,
      data: service,
    })
  } catch (error: any) {
    console.log('error', error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getPropulsionCode = (_req: Request, res: Response) => {
  try {
    const propulsionCode = getPropulsionCodeService()

    if (!propulsionCode) {
      res.status(404).json({
        success: false,
        message: 'Propulsion code not found',
      })
      return
    }

    res.status(200).json({
      success: true,
      data: propulsionCode,
    })
  } catch (error: any) {
    console.log('error', error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getProvinceCode = (_req: Request, res: Response) => {
  try {
    const provinceCode = getProvinceCodeService()

    if (!provinceCode) {
      res.status(404).json({
        success: false,
        message: 'Province code not found',
      })
      return
    }

    res.status(200).json({
      success: true,
      data: provinceCode,
    })
  } catch (error: any) {
    console.log('error', error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getTypeCode = (_req: Request, res: Response) => {
  try {
    const typeCode = getTypeCodeService()

    if (!typeCode) {
      res.status(404).json({
        success: false,
        message: 'Type code not found',
      })
      return
    }

    res.status(200).json({
      success: true,
      data: typeCode,
    })
  } catch (error: any) {
    console.log('error', error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export const getLastUpdateDate = async (_req: Request, res: Response) => {
  try {
    const lastUpdateDate = await getLastUpdateDateService()

    if (!lastUpdateDate) {
      res.status(404).json({
        success: false,
        message: 'Last update date not found',
      })
      return
    }

    res.status(200).json({
      success: true,
      data: lastUpdateDate,
    })
  } catch (error: any) {
    console.log('error', error.message)
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
