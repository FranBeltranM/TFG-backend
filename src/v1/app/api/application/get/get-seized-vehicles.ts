import { ManageApiRepository } from '@/v1/app/api/infrastructure/manage-api-repository'

export const getSeizedVehicles = (manageApiRepository: ManageApiRepository) => {
  return async ({ skip = 0, limit = 10 }: { skip?: number; limit?: number }) => {
    return await manageApiRepository.getSeizedVeihcles({
      skip,
      limit,
    })
  }
}
