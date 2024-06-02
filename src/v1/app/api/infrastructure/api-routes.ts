import { router } from '@/helpers/middle.helper'
import { getBrandModelFromVin, getService, getVehicleFromVin } from '@/v1/app/api/infrastructure/api-controller'

export const routesVehicle = router.get('/vehicle', getVehicleFromVin)
export const routesBrandModel = router.get('/brand-model', getBrandModelFromVin)

export const routesConstants = router
routesConstants.get('/constants/get-service', getService)
