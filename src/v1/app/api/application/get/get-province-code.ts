import { ManageApiRepository } from '@/v1/app/api/infrastructure/manage-api-repository'

export const getProvinceCode = (manageApiRepository: ManageApiRepository) => () => {
  return manageApiRepository.getProvinceCode()
}
