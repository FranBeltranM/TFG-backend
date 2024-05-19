import { VehicleTechnicalDataSchema } from '@/v1/app/shared/domain/vehicle-technical-data/vehicle-technical-data-schema'
import mongoose from 'mongoose'

export const VehicleTechnicalDataDTO = mongoose.model(
  'VehicleTechnicalData',
  VehicleTechnicalDataSchema,
  'VehicleTechnicalData'
)

export interface VehicleTechnicalDataObject {
  _id: string
  mascara: string

  cilindrada_itv: number
  potencia_itv: number

  tara: number
  peso_maximo: number

  numero_plazas: number
  numero_plazas_maximo: number

  kw_itv: number

  co2_itv: number

  tipo_itv: string
  variante_itv: string
  version_itv: string
  fabricante_itv: string

  masa_orden_marcha_itv: number
  masa_maxima_tecnica_admisible_itv: number

  categoria_homologacion_europea_itv: string
  nivel_emisiones_euro_itv: string

  consumo_wh_km_itv: number

  clasificacion_reglamento_vehiculos_itv: string

  categoria_vehiculo_electrico: string
  autonomia_vehiculo_electrico: number

  marca_vehiculo_base: string
  fabricante_vehiculo_base: string
  tipo_vehiculo_base: string
  version_vehiculo_base: string

  contrasena_homologacion_itv: string
}

export type VehicleTechnicalDataObjectFormatted = Omit<VehicleTechnicalDataObject, '_id'> & {
  id: string
}
