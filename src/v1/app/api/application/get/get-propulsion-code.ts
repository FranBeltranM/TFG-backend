import { ManageApiRepository } from '@/v1/app/api/infrastructure/manage-api-repository'

export const getPropulsionCode = (manageApiRepository: ManageApiRepository) => () => {
  return manageApiRepository.getPropulsionCode()
}
