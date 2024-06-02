import { ManageApiRepository } from '@/v1/app/api/infrastructure/manage-api-repository'

export const getDefinitiveDeregistrationIndicator = (manageApiRepository: ManageApiRepository) => () => {
  return manageApiRepository.getDefinitiveDeregistrationIndicator()
}
