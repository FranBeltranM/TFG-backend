import { ManageApiRepository } from '@/v1/app/api/infrastructure/manage-api-repository'

export const getBrandModelFromWMIandVDS = (manageApiRepository: ManageApiRepository) => {
  return async ({ wmi, vds }: { wmi: string; vds: string }) => {
    return await manageApiRepository.getBrandModelFromWmiAndVds({
      wmi,
      vds,
    })
  }
}

export const getBrandModelFromVin = (manageApiRepository: ManageApiRepository) => {
  return async ({ vin }: { vin: string }) => {
    return await manageApiRepository.getBrandModelFromVin(vin)
  }
}

export const getBrandsList = (manageApiRepository: ManageApiRepository) => {
  return async () => {
    return await manageApiRepository.getBrandsList()
  }
}
