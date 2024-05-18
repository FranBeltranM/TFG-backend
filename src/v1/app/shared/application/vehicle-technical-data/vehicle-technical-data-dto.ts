import { VehicleTechnicalDataSchema } from '@/v1/app/shared/application/vehicle-technical-data/vehicle-technical-data-schema'
import mongoose from 'mongoose'

export const VehicleTechnicalDataDTO = mongoose.model(
  'VehicleTechnicalData',
  VehicleTechnicalDataSchema,
  'VehicleTechnicalData'
)
