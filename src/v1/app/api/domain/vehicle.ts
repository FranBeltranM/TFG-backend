// Libs
import z from 'zod'

// Constants
import {
  ClaveTramite,
  CodigoClaseMatricula,
  CodigoProcedenciaITV,
  CodigoProvincia,
  CodigoTipo,
  IndicadorBajaDefinitiva,
  Servicio,
} from '@/constants/vehicle-constants'

// Domain
import { VehicleObject, VehicleObjectFormatted } from '@/v1/app/shared/domain/vehicle/vehicle-dto'

const MIN_VIN_LENGTH = 6
const MAX_VIN_LENGTH = 17

const formatIndicator = (indicator: string | boolean | null) => {
  if (indicator === '') return null
  if (indicator === 'N') return 'Nuevo'
  if (indicator === 'U') return 'Usado'
  if (indicator === 'S') return true

  return indicator
}

const formatIndicatorBajaDef = (indicator: string | boolean | null) => {
  if (indicator === '') return null

  return IndicadorBajaDefinitiva[indicator as string]
}

const formatIndicatorRenting = (indicator: string | boolean | null) => {
  if (indicator === '' || indicator === 'N') return false

  return true
}

const formatIndicatorPersonaFisicaJuridica = (indicator: string | boolean | null) => {
  return indicator === 'D' ? 'Persona física' : 'Persona jurídica'
}

export const ensureVehicleVinIsValid = ({ vin }: { vin: string | null }) => {
  console.log('Validating VIN:', vin)
  const vinSchema = z.object({
    vin: z
      .string({
        required_error: 'VIN is required',
        invalid_type_error: 'VIN must be a string',
      })
      .min(MIN_VIN_LENGTH)
      .max(MAX_VIN_LENGTH),
  })

  const vinValidation = vinSchema.safeParse({
    vin,
  })

  if (!vinValidation.success) {
    throw new Error(vinValidation.error.errors[0].message)
  }

  return vin
}

export const formatVehicleDataResult = ({ vehicleData }: { vehicleData: VehicleObject }): VehicleObjectFormatted => {
  const {
    _id,
    wmi,
    vds,
    codigo_clase_matricula,
    codigo_procedencia_itv,
    transferencias,
    servicio,
    codigo_itv,
    codigo_municipio_ine_vehiculo,
    codigo_provincia_matriculacion,
    codigo_provincia_vehiculo,
    codigo_tipo,
    indicadores,
    fecha_primera_matriculacion,
    ...rest
  } = vehicleData

  const codigoClaseFormatted = codigo_clase_matricula.map((el) => {
    return {
      fecha: el.fecha,
      valor: CodigoClaseMatricula[el.valor as number],
    }
  })

  const codigoProcedenciaItvFormatted = codigo_procedencia_itv.map((el) => {
    return {
      fecha: el.fecha,
      valor: CodigoProcedenciaITV[el.valor as number],
    }
  })

  const codigoProvinciaMatriculacionoFormatted = codigo_provincia_matriculacion.map((el) => {
    return {
      fecha: el.fecha,
      valor: CodigoProvincia[el.valor as string],
    }
  })

  const codigoProvinciaVehiculoFormatted = codigo_provincia_vehiculo.map((el) => {
    return {
      fecha: el.fecha,
      valor: CodigoProvincia[el.valor as string],
    }
  })

  const codigoTipoFormatted = codigo_tipo.map((el) => {
    return {
      fecha: el.fecha,
      valor: CodigoTipo[el.valor as string],
    }
  })

  const servicioFormatted = servicio.map((el) => {
    return {
      fecha: el.fecha,
      valor: Servicio[el.valor as string],
    }
  })

  const transferenciasFormatted = transferencias.map((el) => {
    return {
      ...el,
      clave_tramite: ClaveTramite[el.clave_tramite as string],
    }
  })

  const indicadoresFormatted = indicadores.map((el) => {
    return {
      precinto: formatIndicator(el.precinto),
      embargo: formatIndicator(el.embargo),
      baja_definitiva: formatIndicatorBajaDef(el.baja_definitiva),
      baja_temporal: formatIndicator(el.baja_temporal),
      sustraccion: formatIndicator(el.sustraccion),
      baja_telematica: formatIndicator(el.baja_telematica),
      nuevo_usado: formatIndicator(el.nuevo_usado),
      persona_fisica_juridica: formatIndicatorPersonaFisicaJuridica(el.persona_fisica_juridica),
      renting: formatIndicatorRenting(el.renting),
      tutela: formatIndicator(el.tutela),
      fecha: el.fecha,
    }
  })

  return {
    ...rest,
    wmi,
    vds,
    id: _id.toString(),
    clase_matricula: codigoClaseFormatted,
    procedencia_itv: codigoProcedenciaItvFormatted,
    transferencias: transferenciasFormatted,
    municipio_ine_vehiculo: codigo_municipio_ine_vehiculo,
    provincia_matriculacion: codigoProvinciaMatriculacionoFormatted,
    provincia_vehiculo: codigoProvinciaVehiculoFormatted,
    fecha_primera_matriculacion: fecha_primera_matriculacion.length > 0 ? fecha_primera_matriculacion : null,
    codigo_tipo: codigoTipoFormatted,
    codigo_itv: codigo_itv,
    servicio: servicioFormatted,
    indicadores: indicadoresFormatted,
  }
}
