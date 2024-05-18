import { RowProccessed } from '@/helpers/importer/parser-datafiles'

export interface ImporterRepository {
  importBrandModelBulk: (rows: RowProccessed[]) => Promise<void>
  importVehicleBulk: (rows: RowProccessed[]) => Promise<void>
  importVehicleTechnicalDataBulk: (rows: RowProccessed[]) => Promise<void>
}
