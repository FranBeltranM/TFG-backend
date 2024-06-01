// Application
import { downloadNewData } from '@/v1/app/importer/application/download-new-data'
import { importBrandModelBulk } from '@/v1/app/importer/application/import-brand-model'
import { importData } from '@/v1/app/importer/application/import-data'
import { importVehicleBulk } from '@/v1/app/importer/application/import-vehicle'
import { importVehicleTechnicalDataBulk } from '@/v1/app/importer/application/import-vehicle-techincal-data'

// Domain
import { RowProccessed } from '@/v1/app/importer/domain/importer'

// Infrastructure
import { ApiImportRepository } from '@/v1/app/importer/infrastructure/api-importer-repository'

// Repository
const importerRepository = new ApiImportRepository()

export const importBrandModelBulkService = async (rows: RowProccessed[]) => {
  return await importBrandModelBulk(importerRepository)(rows)
}

export const importVehicleBulkService = async (rows: RowProccessed[]) => {
  return await importVehicleBulk(importerRepository)(rows)
}

export const importVehicleTechnicalDataBulkService = async (rows: RowProccessed[]) => {
  return await importVehicleTechnicalDataBulk(importerRepository)(rows)
}

export const importDataService = async ({ path, fileName }: { path: string; fileName: string }) => {
  return await importData(importerRepository)({ path, fileName })
}

export const downloadNewDataService = async ({
  type,
  date,
  path,
}: {
  type: 'daily' | 'monthly'
  date: Date
  path: string
}) => {
  return await downloadNewData(importerRepository)({ type, date, path })
}
