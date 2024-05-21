import { routesBrandModel, routesVehicle } from '@/v1/app/api/infrastructure/api-routes'
import { routesDefault } from '@/v1/app/default/default.routes'

export const routesV1 = [routesDefault, routesVehicle, routesBrandModel]
