import { BrandModelSchema } from '@/v1/app/shared/domain/brand-model/brand-model-schema'
import mongoose from 'mongoose'

export const BrandModelDTO = mongoose.model('BrandModel', BrandModelSchema, 'BrandModel')

export type BrandModelBuklInsertDTO = {
  updateOne: {
    $set: { updated_at: mongoose.Schema.Types.Date | Date }
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

export interface BrandModelObject {
  _id: mongoose.Types.ObjectId
  marca_itv: string
  wmi: string
  vds: string
  modelo_itv: string
  updated_at: Date
}

export type BrandModelObjectFormatted = Omit<BrandModelObject, '_id'> & {
  id: string
}

export type Brands = string[]
