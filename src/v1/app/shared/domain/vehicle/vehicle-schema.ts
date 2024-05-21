import mongoose from 'mongoose'

const FechaMatricula = new mongoose.Schema(
  {
    fecha: mongoose.Schema.Types.Date,
  },
  {
    _id: false,
  }
)

const BaseElement = new mongoose.Schema(
  {
    fecha: mongoose.Schema.Types.Date,
    valor: mongoose.Schema.Types.Mixed,
  },
  {
    _id: false,
  }
)

const Indicadores = new mongoose.Schema(
  {
    precinto: mongoose.Schema.Types.String,
    embargo: mongoose.Schema.Types.String,
    baja_definitiva: mongoose.Schema.Types.String,
    baja_temporal: mongoose.Schema.Types.String,
    sustraccion: mongoose.Schema.Types.String,
    baja_telematica: mongoose.Schema.Types.String,
    nuevo_usado: mongoose.Schema.Types.String,
    persona_fisica_juridica: mongoose.Schema.Types.String,
    renting: mongoose.Schema.Types.String,
    tutela: mongoose.Schema.Types.String,
    fecha: mongoose.Schema.Types.Date,
  },
  {
    _id: false,
  }
)

const Transferencia = new mongoose.Schema(
  {
    clave_tramite: mongoose.Schema.Types.String,
    codigo_postal: mongoose.Schema.Types.Number,

    municipio: mongoose.Schema.Types.String,

    fecha_tramitacion: mongoose.Schema.Types.Date,
    fecha_tramite: mongoose.Schema.Types.Date,
  },
  {
    _id: false,
  }
)

export const VehicleSchema = new mongoose.Schema(
  {
    bastidor_itv: {
      type: mongoose.Schema.Types.String,
      index: true,
    },

    mascara_ficha_tecnica: {
      type: mongoose.Schema.Types.String,
      index: true,
    },

    wmi: {
      type: mongoose.Schema.Types.String,
      index: true,
    },

    vds: {
      type: mongoose.Schema.Types.String,
      index: true,
    },

    fecha_matricula: [FechaMatricula],
    fecha_primera_matriculacion: [FechaMatricula],

    codigo_provincia_matriculacion: [BaseElement],
    codigo_clase_matricula: [BaseElement],
    codigo_provincia_vehiculo: [BaseElement],
    codigo_municipio_ine_vehiculo: [BaseElement],
    codigo_procedencia_itv: [BaseElement],
    codigo_propulsion_itv: [BaseElement],

    localidad_vehiculo: [BaseElement],

    codigo_tipo: [BaseElement],

    numero_transmisiones: [BaseElement],
    numero_titulares: [BaseElement],

    codigo_itv: [BaseElement],

    servicio: [BaseElement],

    indicadores: [Indicadores],

    transferencias: [Transferencia],
  },
  {
    toObject: {
      transform: (_doc, ret) => {
        delete ret.__v
        return
      },
    },
  }
)
