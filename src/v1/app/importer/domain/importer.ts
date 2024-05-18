// TODO: AÑADIR LOS MÉTODOS NECESARIOS PARA EL IMPORTADOR DE DATOS

// Documentación
// https://sedeapl.dgt.gob.es/IEST_INTER/pdfs/disenoRegistro/vehiculos/transferencias/TRANSFERENCIAS_MATRABA.pdf

export const allFieldsFromFile: Record<string, Record<string, any>> = Object.freeze({
  fecha_matricula: {
    start: 0,
    end: 8,
    type: 'Date',
  },
  codigo_clase_matricula: {
    start: 8,
    end: 9,
    type: 'number',
  },
  fecha_tramitacion: {
    start: 9,
    end: 17,
    type: 'Date',
  },
  marca_itv: {
    start: 17,
    end: 47,
    type: 'string',
  },
  modelo_itv: {
    start: 47,
    end: 69,
    type: 'string',
  },
  codigo_procedencia_itv: {
    start: 69,
    end: 70,
    type: 'string',
  },
  bastidor_itv: {
    start: 70,
    end: 91,
    type: 'string',
  },
  codigo_tipo: {
    start: 91,
    end: 93,
    type: 'string',
  },
  codigo_propulsion_itv: {
    start: 93,
    end: 94,
    type: 'string',
  },
  cilindrada_itv: {
    start: 94,
    end: 99,
    type: 'number',
  },
  potencia_itv: {
    start: 99,
    end: 105,
    type: 'number',
  },
  tara: {
    start: 105,
    end: 111,
    type: 'number',
  },
  peso_maximo: {
    start: 111,
    end: 117,
    type: 'number',
  },
  numero_plazas: {
    start: 117,
    end: 120,
    type: 'number',
  },
  indicador_precinto: {
    start: 120,
    end: 122,
    type: 'string',
  },
  indicador_embargo: {
    start: 122,
    end: 124,
    type: 'string',
  },
  numero_transmisiones: {
    start: 124,
    end: 126,
    type: 'number',
  },
  numero_titulares: {
    start: 126,
    end: 128,
    type: 'number',
  },
  localidad_vehiculo: {
    start: 128,
    end: 152,
    type: 'string',
  },
  codigo_provincia_vehiculo: {
    start: 152,
    end: 154,
    type: 'string',
  },
  codigo_provincia_matriculacion: {
    start: 154,
    end: 156,
    type: 'string',
  },
  clave_tramite: {
    start: 156,
    end: 157,
    type: 'string',
  },
  fecha_tramite: {
    start: 157,
    end: 165,
    type: 'Date',
  },
  codigo_postal: {
    start: 165,
    end: 170,
    type: 'number',
  },
  fecha_primera_matriculacion: {
    start: 170,
    end: 178,
    type: 'Date',
  },
  indicador_nuevo_usado: {
    start: 178,
    end: 179,
    type: 'string',
  },
  indicador_persona_fisica_juridica: {
    start: 179,
    end: 180,
    type: 'string',
  },
  codigo_itv: {
    start: 180,
    end: 189,
    type: 'string',
  },
  servicio: {
    start: 189,
    end: 192,
    type: 'string',
  },
  codigo_municipio_ine_vehiculo: {
    start: 192,
    end: 197,
    type: 'number',
  },
  municipio: {
    start: 197,
    end: 227,
    type: 'string',
  },
  kw_itv: {
    start: 227,
    end: 234,
    type: 'number',
    specialValues: ['*******'],
    specialReturn: 0.0,
  },
  numero_plazas_maximo: {
    start: 234,
    end: 237,
    type: 'number',
  },
  co2_itv: {
    start: 237,
    end: 242,
    type: 'number',
  },
  indicador_renting: {
    start: 242,
    end: 243,
    type: 'string',
  },
  indicador_tutela: {
    start: 243,
    end: 244,
    type: 'string',
  },
  codigo_posesion: {
    start: 244,
    end: 245,
    type: 'string',
  },
  indicador_baja_definitiva: {
    start: 245,
    end: 246,
    type: 'string',
  },
  indicador_baja_temporal: {
    start: 246,
    end: 247,
    type: 'string',
  },
  indicador_sustraccion: {
    start: 247,
    end: 248,
    type: 'string',
  },
  indicador_baja_telematica: {
    start: 248,
    end: 259,
    type: 'string',
  },
  tipo_itv: {
    start: 259,
    end: 284,
    type: 'string',
  },
  variante_itv: {
    start: 284,
    end: 309,
    type: 'string',
  },
  version_itv: {
    start: 309,
    end: 344,
    type: 'string',
  },
  fabricante_itv: {
    start: 344,
    end: 414,
    type: 'string',
  },
  masa_orden_maxima_itv: {
    start: 414,
    end: 420,
    type: 'number',
  },
  masa_maxima_tecnica_admisible_itv: {
    start: 420,
    end: 426,
    type: 'number',
  },
  categoria_homologacion_europea_itv: {
    start: 426,
    end: 430,
    type: 'string',
  },
  carroceria: {
    start: 430,
    end: 434,
    type: 'string',
  },
  plazas_pie: {
    start: 434,
    end: 437,
    type: 'number',
  },
  nivel_emisiones_euro_itv: {
    start: 437,
    end: 445,
    type: 'string',
  },
  consumo_wh_km_itv: {
    start: 445,
    end: 449,
    type: 'number',
  },
  clasificacion_reglamento_vehiculos_itv: {
    start: 449,
    end: 453,
    type: 'string',
  },
  categoria_vehiculo_electrico: {
    start: 453,
    end: 457,
    type: 'string',
  },
  autonomia_vehiculo_electrico: {
    start: 457,
    end: 463,
    type: 'number',
  },
  marca_vehiculo_base: {
    start: 463,
    end: 493,
    type: 'string',
  },
  fabricante_vehiculo_base: {
    start: 493,
    end: 543,
    type: 'string',
  },
  tipo_vehiculo_base: {
    start: 543,
    end: 578,
    type: 'string',
  },
  variante_vehiculo_base: {
    start: 578,
    end: 603,
    type: 'string',
  },
  version_vehiculo_base: {
    start: 603,
    end: 638,
    type: 'string',
  },
  distancia_ejes_12: {
    start: 638,
    end: 642,
    type: 'number',
  },
  via_anterior_itv: {
    start: 642,
    end: 646,
    type: 'number',
  },
  via_posterior_itv: {
    start: 646,
    end: 650,
    type: 'number',
  },
  tipo_alimentacion_itv: {
    start: 650,
    end: 651,
    type: 'string',
  },
  contrasena_homologacion_itv: {
    start: 651,
    end: 676,
    type: 'string',
  },
  eco_innovacion_itv: {
    start: 676,
    end: 677,
    type: 'string',
  },
  reduccion_eco_itv: {
    start: 677,
    end: 681,
    type: 'string',
  },
  codigo_eco_itv: {
    start: 681,
    end: 706,
    type: 'string',
  },
  fecha_proceso: {
    start: 706,
    end: 714,
    type: 'Date',
  },
})

export interface RowProccessed {
  fecha_matricula: Date
  codigo_clase_matricula: number
  fecha_tramitacion: Date
  marca_itv: string
  modelo_itv: string
  codigo_procedencia_itv: string
  bastidor_itv: string
  codigo_tipo: string
  codigo_propulsion_itv: string
  cilindrada_itv: number
  potencia_itv: number
  tara: number
  peso_maximo: number
  numero_plazas: number
  indicador_precinto: string
  indicador_embargo: string
  numero_transmisiones: number
  numero_titulares: number
  localidad_vehiculo: string
  codigo_provincia_vehiculo: string
  codigo_provincia_matriculacion: string
  clave_tramite: string
  fecha_tramite: Date
  codigo_postal: number
  fecha_primera_matriculacion: Date | null
  indicador_nuevo_usado: string
  indicador_persona_fisica_juridica: string
  codigo_itv: string
  servicio: string
  codigo_municipio_ine_vehiculo: number
  municipio: string
  kw_itv: number
  numero_plazas_maximo: number
  co2_itv: number
  indicador_renting: string
  indicador_tutela: string
  codigo_posesion: string
  indicador_baja_definitiva: string
  indicador_baja_temporal: string
  indicador_sustraccion: string
  indicador_baja_telematica: string
  tipo_itv: string
  variante_itv: string
  version_itv: string
  fabricante_itv: string
  masa_orden_marcha_itv: number
  masa_maxima_tecnica_admisible_itv: number
  categoria_homologacion_europea_itv: string
  carroceria: string
  plazas_pie: number
  nivel_emisiones_euro_itv: string
  consumo_wh_km_itv: number
  clasificacion_reglamento_vehiculos_itv: string
  categoria_vehiculo_electrico: string
  autonomia_vehiculo_electrico: number
  marca_vehiculo_base: string
  fabricante_vehiculo_base: string
  tipo_vehiculo_base: string
  variante_vehiculo_base: string
  version_vehiculo_base: string
  distancia_ejes_12: number
  via_anterior_itv: number
  via_posterior_itv: number
  tipo_alimentacion_itv: string
  contrasena_homologacion_itv: string
  eco_innovacion_itv: string
  reduccion_eco_itv: string
  codigo_eco_itv: string
  fecha_proceso: Date
}

const replaceMultipleValues = ({ line, array, newValue }: { line: string; array: string[]; newValue: string }) => {
  // Utilizamos el método replace junto con una expresión regular
  // y una función de reemplazo para realizar el reemplazo
  return array
    .reduce((acc, current) => {
      return acc.replaceAll(current, newValue)
    }, line)
    .trim()
}

const formatContent = ({ field, content }: { field: string; content: string }) => {
  let contentReturned = content

  if (field === 'bastidor_itv') {
    contentReturned = replaceMultipleValues({
      line: content,
      array: ['*', '-', '.', ' '],
      newValue: '',
    })
  }

  if (field === 'modelo_itv') {
    contentReturned = replaceMultipleValues({
      line: content,
      array: ['*', '-', '.', ' '],
      newValue: '',
    })
  }

  return contentReturned.trim()
}

export const formatRowAllFields = ({ row }: { row: string }) => {
  return Object.keys(allFieldsFromFile)
    .map((field) => {
      const value = allFieldsFromFile[field]

      const content = formatContent({
        field,
        content: row.slice(value.start, value.end),
      })

      if (value.specialValues !== undefined) {
        if (value.specialValues.includes(content)) {
          return {
            [field]: value.specialReturn,
          }
        }
      }

      if (value.type === 'Date') {
        if (content === '') {
          return {
            [field]: null,
          }
        }

        const fecha = new Date(
          Date.parse(content.substring(4, 8) + '-' + content.substring(2, 4) + '-' + content.substring(0, 2))
        )
        return {
          [field]: fecha,
        }
      }

      return {
        [field]: value.type === 'number' ? +content : content.toLocaleUpperCase('es-ES'),
      }
    })
    .reduce((acc, current) => {
      return { ...acc, ...current }
    }, {}) as RowProccessed
}
