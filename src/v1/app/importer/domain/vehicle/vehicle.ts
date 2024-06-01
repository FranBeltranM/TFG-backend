import { RowProccessed } from '@/v1/app/importer/domain/importer'
import { generateVehicleTechnicalDataMask } from '@/v1/app/importer/domain/vehicle-technical-data/vehicle-technical-data'
import { VehicleBulkInsertDTO } from '@/v1/app/shared/domain/vehicle/vehicle-dto'

const generateVehicleOne = ({ row }: { row: RowProccessed }) => {
  const mascara = generateVehicleTechnicalDataMask({ row })

  const vehicleFilter = {
    bastidor_itv: row.bastidor_itv,
  }

  const vehicleUpdate = {
    $set: {
      updated_at: new Date(),
    },
    $setOnInsert: {
      bastidor_itv: row.bastidor_itv,
      wmi: row.bastidor_itv.slice(0, 3),
      vds: row.bastidor_itv.slice(3, 8),
      mascara_ficha_tecnica: mascara,
    },
    $addToSet: {
      fecha_matricula: {
        fecha: row.fecha_matricula,
      },
      fecha_primera_matriculacion: row.fecha_primera_matriculacion ? { fecha: row.fecha_primera_matriculacion } : [],
      codigo_provincia_matriculacion: {
        fecha: row.fecha_tramitacion,
        valor: row.codigo_provincia_matriculacion,
      },
      codigo_clase_matricula: {
        fecha: row.fecha_tramitacion,
        valor: row.codigo_clase_matricula,
      },
      codigo_provincia_vehiculo: {
        fecha: row.fecha_tramitacion,
        valor: row.codigo_provincia_vehiculo,
      },
      codigo_municipio_ine_vehiculo: {
        fecha: row.fecha_tramitacion,
        valor: row.codigo_municipio_ine_vehiculo,
      },
      codigo_procedencia_itv: {
        fecha: row.fecha_tramitacion,
        valor: row.codigo_procedencia_itv,
      },
      localidad_vehiculo: {
        fecha: row.fecha_tramitacion,
        valor: row.localidad_vehiculo,
      },
      codigo_tipo: {
        fecha: row.fecha_tramitacion,
        valor: row.codigo_tipo,
      },
      codigo_propulsion_itv: {
        fecha: row.fecha_tramitacion,
        valor: row.codigo_propulsion_itv,
      },
      numero_transmisiones: {
        fecha: row.fecha_tramitacion,
        valor: row.numero_transmisiones,
      },
      numero_titulares: {
        fecha: row.fecha_tramitacion,
        valor: row.numero_titulares,
      },
      codigo_itv: {
        fecha: row.fecha_tramitacion,
        valor: row.codigo_itv,
      },

      servicio: {
        fecha: row.fecha_tramitacion,
        valor: row.servicio,
      },

      indicadores: {
        precinto: row.indicador_precinto,
        embargo: row.indicador_embargo,
        baja_definitiva: row.indicador_baja_definitiva,
        baja_temporal: row.indicador_baja_temporal,
        sustraccion: row.indicador_sustraccion,
        baja_telematica: row.indicador_baja_telematica,
        nuevo_usado: row.indicador_nuevo_usado,
        persona_fisica_juridica: row.indicador_persona_fisica_juridica,
        renting: row.indicador_renting,
        tutela: row.indicador_tutela,
        fecha: row.fecha_tramitacion,
      },

      transferencias: {
        clave_tramite: row.clave_tramite,
        codigo_postal: row.codigo_postal,
        municipio: row.municipio,
        fecha_tramitacion: row.fecha_tramitacion,
        fecha_tramite: row.fecha_tramite,
      },

      $set: {
        updated_at: new Date(),
      },
    },
  }

  const vehicleOne: VehicleBulkInsertDTO = {
    updateOne: {
      filter: vehicleFilter,
      update: vehicleUpdate,
      upsert: true,
    },
  }

  return vehicleOne
}

export const generateVehicleBulkInsertDTO = ({ rows }: { rows: RowProccessed[] }) => {
  return rows.map((row) => generateVehicleOne({ row }))
}
