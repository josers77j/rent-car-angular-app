import { Component, EventEmitter, inject, input, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FormUtils } from '../../../../../utils/form-utils';
import { Vehicles, Vehicle } from '../../interfaces/vehicle.interfaces';
import { VehiclesService } from '../../services/vehicles.service';
import { FormErrorLabelComponent } from '../../../../../shared/components/form-error-label/form-error-label.component';
import { VehicleUpdateService } from '../../services/vehicle-update.service';



@Component({
  selector: 'vehicle-details',
  imports: [ReactiveFormsModule, FormErrorLabelComponent],
  templateUrl: './vehicle-details.component.html',
})
export class VehicleDetailsComponent   implements OnInit   {

  @Output() vehicleUpdated = new EventEmitter<void>();
  vehicle = input.required<Vehicles>();
  router = inject(Router);
  fb = inject(FormBuilder);
  VehicleUpdateService = inject(VehicleUpdateService);
  vehiclesService = inject(VehiclesService);
  wasSaved = signal(false);

  vehicleForm = this.fb.group({
    plateNumber: [''/*, [Validators.required, Validators.pattern(FormUtils.namePattern)]*/],
    brand: [''/*, [Validators.required, Validators.pattern(FormUtils.emailPattern)]*/],
    model: [''/*, [Validators.required, Validators.pattern(FormUtils.onlyNumbersPattern)]*/],
    year: [''/*, [Validators.required, Validators.pattern(FormUtils.onlyNumbersPattern)]*/],
    type: [''/*, [Validators.required, Validators.pattern(FormUtils.onlyNumbersPattern)]*/],
  });


    ngOnInit(): void {
    this.setFormValue(this.vehicle());
    console.log('mi vehículo ', this.vehicle());
  }

  setFormValue(formLike: Partial<Vehicles>) {
    this.vehicleForm.reset({
      plateNumber: formLike.plateNumber || '',
      brand: formLike.brand || '',
      model: formLike.model || '',
      year: String(formLike.year) || '',
      type: formLike.type || '',
    });
  }

  async onSubmit() {
    const isValid = this.vehicleForm.valid;
    this.vehicleForm.markAllAsTouched();

    if (!isValid) return;

    const formValue = this.vehicleForm.value;
    const vehicle: Vehicle = {
      plateNumber: formValue.plateNumber!,
      brand: formValue.brand!,
      model: formValue.model!,
      year: +formValue.year!,
      type: formValue.type!,
    };

    if (!this.vehicle().id) {
      // Crear usuario
      const vehicleResponse: Vehicles = await firstValueFrom(
        this.vehiclesService.createVehicle(vehicle)
      );
      console.log('Vehículo creado:', vehicleResponse);
    } else {
      // Actualizar usuario
      await firstValueFrom(
        this.vehiclesService.updateVehicle(this.vehicle().id, vehicle)
      );
      console.log('Vehículo actualizado');
    }

    // Notificar que un usuario fue creado o actualizado
    this.VehicleUpdateService.notifyVehicleUpdated();

    // Navegar de regreso a la lista de usuarios
    this.router.navigate(['/services/vehicles']);
  }

}
