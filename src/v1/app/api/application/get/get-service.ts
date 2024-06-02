import { ManageApiRepository } from '@/v1/app/api/infrastructure/manage-api-repository'

export const getService = (manageApiRepository: ManageApiRepository) => () => {
  return manageApiRepository.getService()
}
