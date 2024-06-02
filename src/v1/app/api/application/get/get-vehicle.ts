import { ManageApiRepository } from '@/v1/app/api/infrastructure/manage-api-repository'

export const getVehicleFromVin = (manageApiRepository: ManageApiRepository) => {
  return async (vin: string) => {
    return await manageApiRepository.getVehicleFromVin(vin)
  }
}

export const getVehicleFromVinResolved = (manageApiRepository: ManageApiRepository) => {
  return async (vin: string) => {
    return await manageApiRepository.getVehicleFromVinResolved(vin)
  }
}

export const getVehicleRegisteredInProvince = (manageApiRepository: ManageApiRepository) => {
  return async ({ province, skip = 0, limit = 10 }: { province: string; skip?: number; limit?: number }) => {
    return await manageApiRepository.getVehicleRegisteredInProvince({
      province,
      skip,
      limit,
    })
  }
}
