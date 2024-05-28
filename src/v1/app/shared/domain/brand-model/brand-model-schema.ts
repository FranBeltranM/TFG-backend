import mongoose from 'mongoose'

export const BrandModelSchema = new mongoose.Schema(
  {
    marca_itv: {
      type: mongoose.Schema.Types.String,
      index: false,
    },

    modelo_itv: {
      type: [mongoose.Schema.Types.String],
      index: true,
      default: [],
    },

    wmi: {
      type: mongoose.Schema.Types.String,
      index: true,
    },

    vds: {
      type: mongoose.Schema.Types.String,
      index: true,
    },

    marca: mongoose.Schema.Types.String,
    modelo: mongoose.Schema.Types.String,

    logo: mongoose.Schema.Types.String,

    updated_at: {
      type: mongoose.Schema.Types.Date,
      default: Date.now,
      index: -1,
    },
  },
  {
    toObject: {
      transform: (_doc, ret) => {
        delete ret.__v
        return ret
      },
    },
  }
)
