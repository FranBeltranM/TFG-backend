import { RowProccessed } from '@/v1/app/importer/domain/importer'

export interface ImporterRepository {
  importBrandModelBulk: (rows: RowProccessed[]) => Promise<void>
  importVehicleBulk: (rows: RowProccessed[]) => Promise<void>
  importVehicleTechnicalDataBulk: (rows: RowProccessed[]) => Promise<void>
}
