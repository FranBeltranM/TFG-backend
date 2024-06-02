import { ManageApiRepository } from '@/v1/app/api/infrastructure/manage-api-repository'

export const getOriginCodeVehicleInspection = (manageApiRepository: ManageApiRepository) => () => {
  return manageApiRepository.getOriginCodeVehicleInspection()
}
