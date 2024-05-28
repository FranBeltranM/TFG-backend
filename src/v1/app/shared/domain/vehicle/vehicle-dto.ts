import { VehicleSchema } from '@/v1/app/shared/domain/vehicle/vehicle-schema'
import mongoose from 'mongoose'

type FechaMatricula = {
  fecha: Date
}

type Indicadores = {
  precinto: string | boolean | null
  embargo: string | boolean | null
  baja_definitiva: string | boolean | null
  baja_temporal: string | boolean | null
  sustraccion: string | boolean | null
  baja_telematica: string | boolean | null
  nuevo_usado: string | boolean | null
  persona_fisica_juridica: string | boolean | null
  renting: string | boolean | null
  tutela: string | boolean | null
  fecha: Date
}

type BaseElement = {
  fecha: Date
  valor: string | number
}

type Transferencia = {
  clave_tramite: string
  codigo_postal: number

  municipio: string

  fecha_tramitacion: Date
  fecha_tramite: Date
}

export interface VehicleObject {
  _id: mongoose.Types.ObjectId

  bastidor_itv: string
  wmi: string
  vds: string
  mascara_ficha_tecnica: string

  fecha_matricula: FechaMatricula
  fecha_primera_matriculacion: FechaMatricula[]

  codigo_provincia_matriculacion: BaseElement[]
  codigo_clase_matricula: BaseElement[]
  codigo_provincia_vehiculo: BaseElement[]
  codigo_municipio_ine_vehiculo: BaseElement[]
  codigo_procedencia_itv: BaseElement[]
  codigo_propulsion_itv: BaseElement[]

  localidad_vehiculo: BaseElement[]

  codigo_tipo: BaseElement[]

  numero_transmisiones: BaseElement[]
  numero_titulares: BaseElement[]

  codigo_itv: BaseElement[]

  servicio: BaseElement[]

  indicadores: Indicadores[]

  transferencias: Transferencia[]

  updated_at: Date
}

export type VehicleObjectFormatted = Omit<
  VehicleObject,
  | '_id'
  | 'codigo_propulsion_itv'
  | 'codigo_provincia_matriculacion'
  | 'codigo_clase_matricula'
  | 'codigo_provincia_vehiculo'
  | 'codigo_municipio_ine_vehiculo'
  | 'codigo_procedencia_itv'
  | 'fecha_primera_matriculacion'
> & {
  id: string

  propulsion_itv: BaseElement[]
  provincia_matriculacion: BaseElement[]
  clase_matricula: BaseElement[]
  provincia_vehiculo: BaseElement[]
  municipio_ine_vehiculo: BaseElement[]
  procedencia_itv: BaseElement[]

  fecha_primera_matriculacion: FechaMatricula[] | null
  updated_at: Date
}

// DTOs
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
      $set: {
        updated_at: mongoose.Schema.Types.Date | Date
      }
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
        codigo_propulsion_itv: BaseElementDTO
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
