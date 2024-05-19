import { ManageApiRepository } from '@/v1/app/api/infrastructure/manage-api-repository'

export const getBrandModelFromWMIandVDS = (manageApiRepository: ManageApiRepository) => {
  return async ({ wmi, vds }: { wmi: string; vds: string }) => {
    return await manageApiRepository.getBrandModelFromWmiAndVds({
      wmi,
      vds,
    })
  }
}
