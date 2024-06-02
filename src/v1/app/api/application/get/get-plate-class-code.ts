import { ManageApiRepository } from '@/v1/app/api/infrastructure/manage-api-repository'

export const getPlateClassCode = (manageApiRepository: ManageApiRepository) => () => {
  return manageApiRepository.getPlateClassCode()
}
