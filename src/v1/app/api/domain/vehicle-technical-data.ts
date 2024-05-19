import { VehicleTechnicalDataObject } from '@/v1/app/shared/domain/vehicle-technical-data/vehicle-technical-data-dto'

export const formatVehicleTechnicalDataResult = ({
  vehicleTechnicalData,
}: {
  vehicleTechnicalData: VehicleTechnicalDataObject
}) => {
  const { _id, mascara, ...restData } = vehicleTechnicalData

  return {
    id: _id.toString(),
    ...restData,
  }
}
