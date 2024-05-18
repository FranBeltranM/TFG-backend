import mongoose from 'mongoose'

export const VehicleTechnicalDataSchema = new mongoose.Schema({
  mascara: {
    type: mongoose.Schema.Types.String,
    index: true,
    unique: true,
  },

  cilindrada_itv: mongoose.Schema.Types.Number,
  potencia_itv: mongoose.Schema.Types.Number,

  tara: mongoose.Schema.Types.Number,
  peso_maximo: mongoose.Schema.Types.Number,

  numero_plazas: mongoose.Schema.Types.Number,
  numero_plazas_maximo: mongoose.Schema.Types.Number,

  kw_itv: mongoose.Schema.Types.Number,

  co2_itv: mongoose.Schema.Types.Number,

  tipo_itv: mongoose.Schema.Types.String,
  variante_itv: mongoose.Schema.Types.String,
  version_itv: mongoose.Schema.Types.String,
  fabricante_itv: mongoose.Schema.Types.String,

  masa_orden_marcha_itv: mongoose.Schema.Types.Number,
  masa_maxima_tecnica_admisible_itv: mongoose.Schema.Types.Number,

  categoria_homologacion_europea_itv: mongoose.Schema.Types.String,
  nivel_emisiones_euro_itv: mongoose.Schema.Types.String,

  consumo_wh_km_itv: mongoose.Schema.Types.Number,

  clasificacion_reglamento_vehiculos_itv: mongoose.Schema.Types.String,

  categoria_vehiculo_electrico: mongoose.Schema.Types.String,
  autonomia_vehiculo_electrico: mongoose.Schema.Types.Number,

  marca_vehiculo_base: mongoose.Schema.Types.String,
  fabricante_vehiculo_base: mongoose.Schema.Types.String,
  tipo_vehiculo_base: mongoose.Schema.Types.String,
  version_vehiculo_base: mongoose.Schema.Types.String,

  contrasena_homologacion_itv: mongoose.Schema.Types.String,
})
