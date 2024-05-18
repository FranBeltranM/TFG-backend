import { RowProccessed } from '@/v1/app/importer/domain/importer'

export const generateVehicleTechnicalDataMask = ({ row }: { row: RowProccessed }) => {
  const fields = [
    'cilindrada_itv',
    'potencia_itv',
    'tara',
    'peso_maximo',
    'numero_plazas',
    'numero_plazas_maximo',
    'kw_itv',
    'co2_itv',
    'tipo_itv',
    'variante_itv',
    'version_itv',
    'fabricante_itv',
    'masa_orden_marcha_itv',
    'masa_maxima_tecnica_admisible_itv',
    'categoria_homologacion_europea_itv',
    'nivel_emisiones_euro_itv',
    'consumo_wh_km_itv',
    'clasificacion_reglamento_vehiculos_itv',
    'categoria_vehiculo_electrico',
    'autonomia_vehiculo_electrico',
    'marca_vehiculo_base',
    'fabricante_vehiculo_base',
    'tipo_vehiculo_base',
    'version_vehiculo_base',
    'contrasena_homologacion_itv',
  ]

  const mask = fields.reduce((acc, field) => {
    return acc.concat(row[field as keyof typeof row]?.toString().replaceAll(' ', '') || '', ',')
  }, '')

  return mask
}

const generateVehicleTechnicalDataOne = ({ row }: { row: RowProccessed }) => {
  const mascara = generateVehicleTechnicalDataMask({ row })

  return {
    mascara,
    cilindrada_itv: row.cilindrada_itv,
    potencia_itv: row.potencia_itv,
    tara: row.tara,
    peso_maximo: row.peso_maximo,
    numero_plazas: row.numero_plazas,
    numero_plazas_maximo: row.numero_plazas_maximo,
    kw_itv: row.kw_itv,
    co2_itv: row.co2_itv,
    tipo_itv: row.tipo_itv,
    variante_itv: row.variante_itv,
    version_itv: row.version_itv,
    fabricante_itv: row.fabricante_itv,
    masa_orden_marcha_itv: row.masa_orden_marcha_itv,
    masa_maxima_tecnica_admisible_itv: row.masa_maxima_tecnica_admisible_itv,
    categoria_homologacion_europea_itv: row.categoria_homologacion_europea_itv,
    nivel_emisiones_euro_itv: row.nivel_emisiones_euro_itv,
    consumo_wh_km_itv: row.consumo_wh_km_itv,
    clasificacion_reglamento_vehiculos_itv: row.clasificacion_reglamento_vehiculos_itv,
    categoria_vehiculo_electrico: row.categoria_vehiculo_electrico,
    autonomia_vehiculo_electrico: row.autonomia_vehiculo_electrico,
    marca_vehiculo_base: row.marca_vehiculo_base,
    fabricante_vehiculo_base: row.fabricante_vehiculo_base,
    tipo_vehiculo_base: row.tipo_vehiculo_base,
    version_vehiculo_base: row.version_vehiculo_base,
    contrasena_homologacion_itv: row.contrasena_homologacion_itv,
  }
}

export const generateVehicleTechnicalDataBulk = ({ rows }: { rows: RowProccessed[] }) => {
  return rows.map((row) => generateVehicleTechnicalDataOne({ row }))
}
