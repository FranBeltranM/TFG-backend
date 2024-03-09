import { router } from '@/helpers/middle.helper'
import { getDefault } from '@/v1/app/default/default.controller'

export const routesDefault = router.get('/', getDefault)
