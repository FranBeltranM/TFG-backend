import { ManageApiRepository } from '@/v1/app/api/infrastructure/manage-api-repository'

export const getVehicleFromVin = (manageApiRepository: ManageApiRepository) => {
  return async (vin: string) => {
    return await manageApiRepository.getVehicleFromVin(vin)
  }
}
