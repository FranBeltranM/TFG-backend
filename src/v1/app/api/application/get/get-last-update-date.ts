import { ApiRepository } from '@/v1/app/api/domain/api-repository'

export const getLastUpdateDate = (apiRepository: ApiRepository) => {
  return async () => {
    return await apiRepository.getLastUpdateDate()
  }
}
