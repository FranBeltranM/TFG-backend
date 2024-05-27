import { BrandModelObject } from '@/v1/app/shared/domain/brand-model/brand-model-dto'

export const formatBrandModelResult = ({ brandModel }: { brandModel: BrandModelObject }) => {
  const { _id, modelo_itv, ...restData } = brandModel

  return {
    id: _id.toString(),
    modelo_itv: modelo_itv[0],
    ...restData,
  }
}
