// Libs
import z from 'zod'

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
  const vinSchema = z.object({
    vin: z
      .string({
        required_error: 'VIN is required',
        invalid_type_error: 'VIN must be a string',
      })
      .min(MIN_VIN_LENGTH, {
        message: `VIN must be at least ${MIN_VIN_LENGTH} characters long`,
      })
      .max(MAX_VIN_LENGTH, {
        message: `VIN must be at most ${MAX_VIN_LENGTH} characters long`,
      }),
  })

  const vinValidation = vinSchema.safeParse({
    vin,
  })

  if (!vinValidation.success) {
    return {
      error: vinValidation.error.errors[0],
    }
  }

  return vinValidation.data.vin
}

export const ensureVehicleRegisteredInProvinceIsValid = ({
  province,
  skip,
  limit,
}: {
  province: string | null
  skip: string | null
  limit: string | null
}) => {
  const vehicleRegisteredInProvinceSchema = z.object({
    province: z
      .string({
        required_error: 'Province is required',
        invalid_type_error: 'Province must be a string',
      })
      .min(1, {
        message: 'Province must be at least 1 characters long',
      }),
    skip: z
      .string({
        required_error: 'Skip is required',
        invalid_type_error: 'Skip must be a string',
      })
      .min(1, {
        message: 'Skip must be at least 1 character long',
      }),
    limit: z
      .string({
        required_error: 'Limit is required',
        invalid_type_error: 'Limit must be a string',
      })
      .min(1, {
        message: 'Limit must be at least 1 character long',
      })
      .max(2, {
        message: 'Limit must be at most 2 characters long',
      }),
  })

  const vehicleRegisteredInProvinceValidation = vehicleRegisteredInProvinceSchema.safeParse({
    province,
    skip,
    limit,
  })

  if (!vehicleRegisteredInProvinceValidation.success) {
    return {
      error: vehicleRegisteredInProvinceValidation.error.errors[0],
    }
  }

  // Check if province is a valid province code
  if (CodigoProvincia[vehicleRegisteredInProvinceValidation.data.province] === undefined) {
    return {
      error: {
        message: `${province} is not a valid province code`,
      } as z.ZodIssue,
    }
  }

  // Check if skip and limit are numbers
  if (isNaN(+vehicleRegisteredInProvinceValidation.data.skip)) {
    return {
      error: {
        message: 'Skip must be a number',
      } as z.ZodIssue,
    }
  }

  if (isNaN(+vehicleRegisteredInProvinceValidation.data.limit)) {
    return {
      error: {
        message: 'Limit must be a number',
      } as z.ZodIssue,
    }
  }

  return {
    province: vehicleRegisteredInProvinceValidation.data.province,
    skip: +vehicleRegisteredInProvinceValidation.data.skip,
    limit: +vehicleRegisteredInProvinceValidation.data.limit,
  }
}

export const ensuerVehicleRegisteredBetweenDatesIsValid = ({
  startDate,
  endDate,
  skip,
  limit,
}: {
  startDate: string | null
  endDate: string | null
  skip: string | null
  limit: string | null
}) => {
  const vehicleRegisteredBetweenDatesSchema = z.object({
    startDate: z
      .string({
        required_error: 'Start date is required',
        invalid_type_error: 'Start date must be a string',
      })
      .transform((str) => new Date(str)),
    endDate: z
      .string({
        required_error: 'End date is required',
        invalid_type_error: 'End date must be a string',
      })
      .transform((str) => new Date(str)),
    skip: z
      .string({
        required_error: 'Skip is required',
        invalid_type_error: 'Skip must be a string',
      })
      .min(1, {
        message: 'Skip must be at least 1 character long',
      }),
    limit: z
      .string({
        required_error: 'Limit is required',
        invalid_type_error: 'Limit must be a string',
      })
      .min(1, {
        message: 'Limit must be at least 1 character long',
      })
      .max(2, {
        message: 'Limit must be at most 2 characters long',
      }),
  })

  const vehicleRegisteredBetweenDatesValidation = vehicleRegisteredBetweenDatesSchema.safeParse({
    startDate,
    endDate,
    skip,
    limit,
  })

  if (!vehicleRegisteredBetweenDatesValidation.success) {
    return {
      error: vehicleRegisteredBetweenDatesValidation.error.errors[0],
    }
  }

  // Check if skip and limit are numbers
  if (isNaN(+vehicleRegisteredBetweenDatesValidation.data.skip)) {
    return {
      error: {
        message: 'Skip must be a number',
      } as z.ZodIssue,
    }
  }

  if (isNaN(+vehicleRegisteredBetweenDatesValidation.data.limit)) {
    return {
      error: {
        message: 'Limit must be a number',
      } as z.ZodIssue,
    }
  }

  return {
    startDate: vehicleRegisteredBetweenDatesValidation.data.startDate,
    endDate: vehicleRegisteredBetweenDatesValidation.data.endDate,
    skip: +vehicleRegisteredBetweenDatesValidation.data.skip,
    limit: +vehicleRegisteredBetweenDatesValidation.data.limit,
  }
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
    codigo_propulsion_itv,
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

  const codigoPropulsionFormatted = codigo_propulsion_itv.map((el) => {
    return {
      fecha: el.fecha,
      valor: CodigoPropulsion[el.valor as string],
    }
  })

  const codigoProvinciaMatriculacionFormatted = codigo_provincia_matriculacion.map((el) => {
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
    propulsion_itv: codigoPropulsionFormatted,
    provincia_matriculacion: codigoProvinciaMatriculacionFormatted,
    provincia_vehiculo: codigoProvinciaVehiculoFormatted,
    fecha_primera_matriculacion: fecha_primera_matriculacion.length > 0 ? fecha_primera_matriculacion : null,
    codigo_tipo: codigoTipoFormatted,
    codigo_itv: codigo_itv,
    servicio: servicioFormatted,
    indicadores: indicadoresFormatted,
  }
}
