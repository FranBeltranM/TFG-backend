import { VehicleSchema } from '@/v1/app/shared/domain/vehicle/vehicle-schema'
import mongoose from 'mongoose'

export type FechaMatriculaDTO = {
  fecha: mongoose.Schema.Types.Date | Date
}

export type IndicadoresDTO = {
  precinto: mongoose.Schema.Types.String | string
  embargo: mongoose.Schema.Types.String | string
  baja_definitiva: mongoose.Schema.Types.String | string
  baja_temporal: mongoose.Schema.Types.String | string
  sustraccion: mongoose.Schema.Types.String | string
  baja_telematica: mongoose.Schema.Types.String | string
  nuevo_usado: mongoose.Schema.Types.String | string
  persona_fisica_juridica: mongoose.Schema.Types.String | string
  renting: mongoose.Schema.Types.String | string
  tutela: mongoose.Schema.Types.String | string
  fecha: mongoose.Schema.Types.Date | Date
}

export type BaseElementDTO = {
  fecha: mongoose.Schema.Types.Date | Date
  valor: mongoose.Schema.Types.String | mongoose.Schema.Types.Number | string | number
}

export const VehicleDTO = mongoose.model('Vehicle', VehicleSchema, 'Vehicle')

export type VehicleBulkInsertDTO = {
  updateOne: {
    filter: {
      bastidor_itv: mongoose.Schema.Types.String | string
    }
    update: {
      $setOnInsert: {
        bastidor_itv: mongoose.Schema.Types.String | string
        wmi: mongoose.Schema.Types.String | string
        vds: mongoose.Schema.Types.String | string
        mascara_ficha_tecnica: mongoose.Schema.Types.String | string
      }
      $addToSet: {
        fecha_matricula: FechaMatriculaDTO
        fecha_primera_matriculacion?: FechaMatriculaDTO | never[]

        codigo_provincia_matriculacion: BaseElementDTO
        codigo_clase_matricula: BaseElementDTO
        codigo_provincia_vehiculo: BaseElementDTO
        codigo_municipio_ine_vehiculo: BaseElementDTO
        codigo_procedencia_itv: BaseElementDTO
        codigo_tipo: BaseElementDTO
        codigo_itv: BaseElementDTO

        localidad_vehiculo: BaseElementDTO

        numero_transmisiones: BaseElementDTO
        numero_titulares: BaseElementDTO

        servicio: BaseElementDTO

        indicadores: IndicadoresDTO

        transferencias: {
          clave_tramite: mongoose.Schema.Types.String | string
          codigo_postal: mongoose.Schema.Types.Number | number

          municipio: mongoose.Schema.Types.String | string

          fecha_tramitacion: mongoose.Schema.Types.Date | Date
          fecha_tramite: mongoose.Schema.Types.Date | Date
        }
      }
    }
    upsert: mongoose.Schema.Types.Boolean | boolean
  }
}
