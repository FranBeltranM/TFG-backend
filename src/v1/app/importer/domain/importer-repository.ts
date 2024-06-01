import { RowProccessed } from '@/v1/app/importer/domain/importer'

export interface ImporterRepository {
  importBrandModelBulk: (rows: RowProccessed[]) => Promise<void>
  importVehicleBulk: (rows: RowProccessed[]) => Promise<void>
  importVehicleTechnicalDataBulk: (rows: RowProccessed[]) => Promise<void>

  importData: ({ path, fileName }: { path: string; fileName: string }) => Promise<void>
  downloadNewData: ({ type, date, path }: { type: 'daily' | 'monthly'; date: Date; path: string }) => Promise<void>
}
