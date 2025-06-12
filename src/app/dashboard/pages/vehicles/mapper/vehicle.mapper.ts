import { Vehicles, VehiclesResponse } from "../interfaces/vehicle.interfaces";


export class VehicleMapper {
  static mapVehicleResponseToUserArray(response: VehiclesResponse): Vehicles[] {
    return response.data;
  }
}
