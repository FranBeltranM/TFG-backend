import { router } from '@/helpers/middle.helper'
import { getVehicleFromVin } from '@/v1/app/api/application/api-controller'

export const routesVehicle = router.get('/vehicle', getVehicleFromVin)
