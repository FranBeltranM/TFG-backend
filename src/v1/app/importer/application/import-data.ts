import { ImporterRepository } from '@/v1/app/importer/domain/importer-repository'

export const importData = (importerRepository: ImporterRepository) => {
  return async ({ path, fileName }: { path: string; fileName: string }) => {
    return await importerRepository.importData({ path, fileName })
  }
}
