// Infrastructure
import { ManageApiRepository } from '@/v1/app/api/infrastructure/manage-api-repository'

// Application
import { getBrandModelFromWMIandVDS } from '@/v1/app/api/application/get/get-brand-model'
import { getLastUpdateDate } from '@/v1/app/api/application/get/get-last-update-date'
import { getVehicleFromVin } from '@/v1/app/api/application/get/get-vehicle'
import { getVehicleTechnicalDataFromMask } from '@/v1/app/api/application/get/get-vehicle-technical-data'

// Application Constants
import { getDefinitiveDeregistrationIndicator } from '@/v1/app/api/application/get/get-definitive-deregistration-indicator'
import { getOriginCodeVehicleInspection } from '@/v1/app/api/application/get/get-origin-code-vehicle-inspection'
import { getPlateClassCode } from '@/v1/app/api/application/get/get-plate-class-code'
import { getProcessKey } from '@/v1/app/api/application/get/get-process-key'
import { getPropulsionCode } from '@/v1/app/api/application/get/get-propulsion-code'
import { getProvinceCode } from '@/v1/app/api/application/get/get-province-code'
import { getService } from '@/v1/app/api/application/get/get-service'
import { getTypeCode } from '@/v1/app/api/application/get/get-type-code'

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

// Constants
export const getPlateClassCodeService = () => {
  return getPlateClassCode(manageApiRepository)()
}

export const getOriginCodeVehicleInspectionService = () => {
  return getOriginCodeVehicleInspection(manageApiRepository)()
}

export const getProcessKeyService = () => {
  return getProcessKey(manageApiRepository)()
}

export const getDefinitiveDeregistrationIndicatorService = () => {
  return getDefinitiveDeregistrationIndicator(manageApiRepository)()
}

export const getServiceService = () => {
  return getService(manageApiRepository)()
}

export const getPropulsionCodeService = () => {
  return getPropulsionCode(manageApiRepository)()
}

export const getProvinceCodeService = () => {
  return getProvinceCode(manageApiRepository)()
}

export const getTypeCodeService = () => {
  return getTypeCode(manageApiRepository)()
}
