import { RowProccessed } from '@/helpers/importer/parser-datafiles'
import { ImporterRepository } from '@/v1/app/importer/domain/importer-repository'

export const importVehicleTechnicalDataBulk = (importerRepository: ImporterRepository) => {
  return async (rows: RowProccessed[]) => {
    return importerRepository.importVehicleTechnicalDataBulk(rows)
  }
}
