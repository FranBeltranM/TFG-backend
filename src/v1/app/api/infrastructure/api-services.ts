// Infrastructure
import { ManageApiRepository } from '@/v1/app/api/infrastructure/manage-api-repository'

// Application
import { getBrandModelFromWMIandVDS } from '@/v1/app/api/application/get/get-brand-model'
import { getLastUpdateDate } from '@/v1/app/api/application/get/get-last-update-date'
import { getVehicleFromVin } from '@/v1/app/api/application/get/get-vehicle'
import { getVehicleTechnicalDataFromMask } from '@/v1/app/api/application/get/get-vehicle-technical-data'

// Repository
const manageApiRepository = new ManageApiRepository()

export const getVehicleFromVinService = async (vin: string) => {
  return await getVehicleFromVin(manageApiRepository)(vin)
}

export const getBrandModelFromWmiAndVdsService = async ({ wmi, vds }: { wmi: string; vds: string }) => {
  return await getBrandModelFromWMIandVDS(manageApiRepository)({ wmi, vds })
}

export const getVehicleTechnicalDataFromMaskService = async (mask: string) => {
  return await getVehicleTechnicalDataFromMask(manageApiRepository)(mask)
}

export const getLastUpdateDateService = async () => {
  return await getLastUpdateDate(manageApiRepository)()
}
