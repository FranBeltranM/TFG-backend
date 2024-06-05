import { router } from '@/helpers/middle.helper'
import {
  getBrandModelFromVin,
  getBrandsList,
  getDefinitiveDeregistrationIndicator,
  getLastUpdateDate,
  getOriginCodeVehicleInspection,
  getPlateClassCode,
  getProcessKey,
  getPropulsionCode,
  getProvinceCode,
  getService,
  getTypeCode,
  getVehicleFromVin,
  getVehicleFromVinResolved,
  getVehicleRegisteredInProvince,
  getVehiclesRegisteredBetweenDates,
  getVehiclesSeized,
  getVehiclesStolen,
} from '@/v1/app/api/infrastructure/api-controller'

export const routesVehicle = router
  .get('/vehicle', getVehicleFromVin)
  .get('/vehicle-resolved', getVehicleFromVinResolved)
  .get('/vehicle-registered-in-province', getVehicleRegisteredInProvince)
  .get('/vehicles-registered-between-dates', getVehiclesRegisteredBetweenDates)
  .get('/vehicles-stolen', getVehiclesStolen)
  .get('/vehicles-seized', getVehiclesSeized)

export const routesBrandModel = router.get('/brand-model', getBrandModelFromVin).get('/brands-list', getBrandsList)

export const routesConstants = router
  .get('/constants/get-plate-class-code', getPlateClassCode)
  .get('/constants/get-origin-code-vehicle-inspection', getOriginCodeVehicleInspection)
  .get('/constants/get-process-key', getProcessKey)
  .get('/constants/get-definitive-deregistration-indicator', getDefinitiveDeregistrationIndicator)
  .get('/constants/get-service', getService)
  .get('/constants/get-propulsion-code', getPropulsionCode)
  .get('/constants/get-province-code', getProvinceCode)
  .get('/constants/get-type-code', getTypeCode)

export const routesDB = router.get('/db/last-date-inserted', getLastUpdateDate)
