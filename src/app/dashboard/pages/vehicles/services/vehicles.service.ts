import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { Vehicle, Vehicles, VehiclesResponse } from '../interfaces/vehicle.interfaces';
import { environment } from '../../../../../environments/environment.development';
import { VehicleMapper } from '../mapper/vehicle.mapper';

const baseUrl = environment.baseUrl;
interface Options {
  perPage?: number;
  page?: number;
}

const emptyVehicle: Vehicles = {
  id: 0,
  brand: '',
  model: '',
  year: 0,
  plateNumber: '',
  type: '',
  status: '',
  dailyRate: 0,
  modifiedBy: 0, /* estaba en string*/
  modified: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  date: new Date(),
};

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  private http = inject(HttpClient);

  private _vehiclesCache = new Map<string, VehiclesResponse>();
  private _vehicleCache = new Map<number, Vehicles>();
  getVehicles(options: Options): Observable<VehiclesResponse> {
    const { perPage = 9, page = 0 } = options;

    const key = `${perPage}-${page}`; // 9-0

    return this.http
      .get<VehiclesResponse>(`${baseUrl}/vehicles`, {
        params: {
          perPage,
          page,
        },
      })
      .pipe(
        tap((resp) => console.log(resp)),
      );
  }

  createVehicle(vehicle: Vehicle): Observable<Vehicles> {

    return this.http
    .post<Vehicles>(`${baseUrl}/vehicles`, vehicle)
    .pipe(
      tap((resp) => console.log('creando',resp))
    );

  }

  updateVehicle(
    id: number,
    vehicleLike: Partial<Vehicle>
  ): Observable<Vehicles> {
    return this.http
      .patch<Vehicles>(`${baseUrl}/vehicles/${id}`, vehicleLike)
      .pipe(
        tap((resp) => console.log('actualizando ',resp))
      );
  }

  getVehicleById(id: number): Observable<Vehicles> {
    if (!id) {
      return of(emptyVehicle);
    }

    if (this._vehicleCache.has(id)) {
      return of(this._vehicleCache.get(id)!);
    }

    return this.http
      .get<VehiclesResponse>(`${baseUrl}/vehicles`,{
        params:{
          vehicleId: id
        }
      } )
      .pipe(
        map((vehicleData) => vehicleData.data[0]),
      );
  }

}
