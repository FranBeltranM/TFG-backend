import { BrandModelObjectFormatted, Brands } from '@/v1/app/shared/domain/brand-model/brand-model-dto'
import { ResultsWithPagination } from '@/v1/app/shared/domain/types'
import { VehicleTechnicalDataObjectFormatted } from '@/v1/app/shared/domain/vehicle-technical-data/vehicle-technical-data-dto'
import {
  VehicleObject,
  VehicleObjectFormatted,
  VehicleRegisteredInProvince,
  VehicleSeized,
  VehicleStolen,
} from '@/v1/app/shared/domain/vehicle/vehicle-dto'

export interface ApiRepository {
  // Vehicle
  getVehicleFromVin(vin: string): Promise<VehicleObject | null>
  getVehicleFromVinResolved(vin: string): Promise<VehicleObjectFormatted | null>
  getVehicleRegisteredInProvince({
    province,
    skip,
    limit,
  }: {
    province: string
    skip: number
    limit: number
  }): Promise<ResultsWithPagination<VehicleRegisteredInProvince> | null>
  getStolenVehicles({
    skip,
    limit,
  }: {
    skip: number
    limit: number
  }): Promise<ResultsWithPagination<VehicleStolen> | null>
  getSeizedVeihcles({
    skip,
    limit,
  }: {
    skip: number
    limit: number
  }): Promise<ResultsWithPagination<VehicleSeized> | null>

  // Vehicle and BrandModel
  getVehicleRegisteredBetweenDates({
    startDate,
    endDate,
    skip,
    limit,
  }: {
    startDate: Date
    endDate: Date
    skip: number
    limit: number
  }): Promise<ResultsWithPagination<VehicleObjectFormatted> | null>

  // BrandModel
  getBrandModelFromWmiAndVds({ wmi, vds }: { wmi: string; vds: string }): Promise<BrandModelObjectFormatted | null>
  getBrandModelFromVin(vin: string): Promise<BrandModelObjectFormatted | null>
  getBrandsList(): Promise<Brands | null>

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
