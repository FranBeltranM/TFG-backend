import { BrandModelSchema } from '@/v1/app/importer/domain/brand-model/brand-model-schema'
import mongoose from 'mongoose'

export const BrandModelDTO = mongoose.model('BrandModel', BrandModelSchema, 'BrandModel')

export type BrandModelBuklInsertDTO = {
  updateOne: {
    filter: {
      marca_itv: mongoose.Schema.Types.String | string
      wmi: mongoose.Schema.Types.String | string
      vds: mongoose.Schema.Types.String | string
    }
    update: {
      $setOnInsert: {
        marca_itv: mongoose.Schema.Types.String | string
        wmi: mongoose.Schema.Types.String | string
        vds: mongoose.Schema.Types.String | string
      }
      $addToSet: {
        modelo_itv: mongoose.Schema.Types.String | string
      }
    }
    upsert: mongoose.Schema.Types.Boolean | boolean
  }
}
