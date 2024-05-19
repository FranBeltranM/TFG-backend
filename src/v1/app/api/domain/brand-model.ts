import { BrandModelObject } from '@/v1/app/shared/domain/brand-model/brand-model-dto'

export const formatBrandModelResult = ({ brandModel }: { brandModel: BrandModelObject }) => {
  const { _id, ...restData } = brandModel

  return {
    id: _id.toString(),
    ...restData,
  }
}
