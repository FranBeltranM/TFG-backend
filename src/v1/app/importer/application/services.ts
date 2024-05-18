// Application
import { importBrandModelBulk } from '@/v1/app/importer/application/import-brand-model'
import { importVehicleBulk } from '@/v1/app/importer/application/import-vehicle'
import { importVehicleTechnicalDataBulk } from '@/v1/app/importer/application/import-vehicle-techincal-data'

// Domain
import { RowProccessed } from '@/helpers/importer/parser-datafiles'

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
