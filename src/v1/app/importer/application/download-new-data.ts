import { ImporterRepository } from '@/v1/app/importer/domain/importer-repository'

export const downloadNewData = (importerRepository: ImporterRepository) => {
  return async ({ type, date, path }: { type: 'daily' | 'monthly'; date: Date; path: string }) => {
    return importerRepository.downloadNewData({ type, date, path })
  }
}
