import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { Vehicle, Vehicles, VehiclesResponse } from '../interfaces/vehicle.interfaces';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, tap } from 'rxjs';
import { FormUtils } from '../../../../utils/form-utils';
import { VehiclesService } from '../services/vehicles.service';
import { toSignal, rxResource } from '@angular/core/rxjs-interop';
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-vehicle-admin-page',
  imports: [VehicleDetailsComponent],
  templateUrl: './vehicle-admin-page.component.html',
})
export class VehicleAdminPageComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  vehiclesService = inject(VehiclesService);



  vehicleId = toSignal(
    this.activatedRoute.params.pipe(map((params) => params['vehicleId']))
  );

  vehicleResource = rxResource({
    request: () => ({ id: this.vehicleId() }),
    loader: ({ request }) => {
      return this.vehiclesService.getVehicleById(request.id)
    },
  });

  redirectEffect = effect(() => {
    if (this.vehicleResource.error()) {
      this.router.navigate(['/services/vehicles']);
    }
  });
 }
