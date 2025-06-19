import { Vehicles, VehiclesResponse } from "../interfaces/vehicle.interfaces";


export class VehicleMapper {
  static mapVehicleResponseToVehicleArray(response: VehiclesResponse): Vehicles[] {
    return response.data;
  }
}
