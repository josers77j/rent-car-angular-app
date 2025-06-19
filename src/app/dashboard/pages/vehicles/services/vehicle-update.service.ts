import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleUpdateService {
  private vehicleUpdatedSource = new Subject<void>();
  vehicleUpdated$ = this.vehicleUpdatedSource.asObservable();

  // Método para notificar que un vehículo fue actualizado o creado
  notifyVehicleUpdated() {
    this.vehicleUpdatedSource.next();
  }
}
