import { ManageApiRepository } from '@/v1/app/api/infrastructure/manage-api-repository'

export const getVehicleTechnicalDataFromMask = (manageApiRepository: ManageApiRepository) => {
  return async (mask: string) => {
    return await manageApiRepository.getVehicleTechnicalDataFromMask(mask)
  }
}
