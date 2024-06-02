import { ManageApiRepository } from '@/v1/app/api/infrastructure/manage-api-repository'

export const getTypeCode = (manageApiRepository: ManageApiRepository) => () => {
  return manageApiRepository.getTypeCode()
}
