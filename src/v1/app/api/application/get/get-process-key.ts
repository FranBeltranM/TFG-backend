import { ManageApiRepository } from '@/v1/app/api/infrastructure/manage-api-repository'

export const getProcessKey = (manageApiRepository: ManageApiRepository) => () => {
  return manageApiRepository.getProcessKey()
}
