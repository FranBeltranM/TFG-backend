import { router } from '@/helpers/middle.helper'
import { getBrandModelFromVin, getVehicleFromVin } from '@/v1/app/api/infrastructure/api-controller'

export const routesVehicle = router.get('/vehicle', getVehicleFromVin)
export const routesBrandModel = router.get('/brand-model', getBrandModelFromVin)
