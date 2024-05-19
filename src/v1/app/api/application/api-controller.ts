import { Request, Response } from '@/helpers/middle.helper'

// Domain
import { ensureVehicleVinIsValid } from '@/v1/app/api/domain/vehicle'

// Application
import {
  getBrandModelFromWmiAndVdsService,
  getVehicleFromVinService,
  getVehicleTechnicalDataFromMaskService,
} from '@/v1/app/api/application/api-services'

export const getVehicleFromVin = async (req: Request, res: Response) => {
  try {
    const query = req.query as { vin: string }
    const validation = ensureVehicleVinIsValid({ ...query })

    if (!validation) {
      res.status(400).json({
        success: false,
        message: 'VIN is required',
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
          modelo: modelo_itv[0] ?? '',
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
