import { VehicleTechnicalDataSchema } from '@/v1/app/importer/domain/vehicle-technical-data/vehicle-technical-data-schema'
import mongoose from 'mongoose'

export const VehicleTechnicalDataDTO = mongoose.model(
  'VehicleTechnicalData',
  VehicleTechnicalDataSchema,
  'VehicleTechnicalData'
)
