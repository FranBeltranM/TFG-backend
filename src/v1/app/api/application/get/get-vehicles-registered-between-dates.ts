import { ManageApiRepository } from '@/v1/app/api/infrastructure/manage-api-repository'

export const getVehiclesRegisteredBetweenDates = (manageApiRepository: ManageApiRepository) => {
  return async ({
    startDate,
    endDate,
    skip = 0,
    limit = 10,
  }: {
    startDate: Date
    endDate: Date
    skip?: number
    limit?: number
  }) => {
    return await manageApiRepository.getVehicleRegisteredBetweenDates({
      startDate,
      endDate,
      skip,
      limit,
    })
  }
}
