import { BrandModelObjectFormatted } from '@/v1/app/shared/domain/brand-model/brand-model-dto'
import { VehicleTechnicalDataObjectFormatted } from '@/v1/app/shared/domain/vehicle-technical-data/vehicle-technical-data-dto'
import { VehicleObjectFormatted } from '@/v1/app/shared/domain/vehicle/vehicle-dto'

export interface ApiRepository {
  // Vehicle
  getVehicleFromVin(vin: string): Promise<VehicleObjectFormatted | null>

  // BrandModel
  getBrandModelFromWmiAndVds({ wmi, vds }: { wmi: string; vds: string }): Promise<BrandModelObjectFormatted | null>
  getBrandModelFromVin(vin: string): Promise<BrandModelObjectFormatted | null>

  // VehicleTechnicalData
  getVehicleTechnicalDataFromMask(mask: string): Promise<VehicleTechnicalDataObjectFormatted | null>

  // Miscelaneous
  getLastUpdateDate(): Promise<Date | null>

  // Constants
  getPlateClassCode(): Array<Record<string, string>> | null
  getOriginCodeVehicleInspection(): Array<Record<string, string>> | null
  getProcessKey(): Array<Record<string, string>> | null
  getDefinitiveDeregistrationIndicator(): Array<Record<string, string>> | null
  getService(): Array<Record<string, string>> | null
  getPropulsionCode(): Array<Record<string, string>> | null
  getProvinceCode(): Array<Record<string, string>> | null
  getTypeCode(): Array<Record<string, string>> | null
}
