import { Component, EventEmitter, inject, input, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FormUtils } from '../../../../../utils/form-utils';
import { Vehicles, Vehicle } from '../../interfaces/vehicle.interfaces';
import { VehiclesService } from '../../services/vehicles.service';
import { FormErrorLabelComponent } from '../../../../../shared/components/form-error-label/form-error-label.component';
import { VehicleUpdateService } from '../../services/vehicle-update.service';

/* ------------------------------------------------------------------------------------------------------------ */
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
/* ------------------------------------------------------------------------------------------------------------ */

@Component({
  selector: 'vehicle-details',
  imports: [ReactiveFormsModule, FormErrorLabelComponent /**/,CommonModule, HttpClientModule/**/],
  /* ----------------------------------------------------------------------------------------------------------- */
  standalone: true,
  /* ----------------------------------------------------------------------------------------------------------- */
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
    plateNumber: ['', [Validators.required, Validators.pattern(FormUtils.platePattern)]],
    brand: ['', [Validators.required, Validators.pattern(FormUtils.generalTextPattern)]],
    model: ['', [Validators.required, Validators.pattern(FormUtils.generalTextPattern)]],
    year: ['', [Validators.required, Validators.pattern(FormUtils.maxVehicleYear)]],
    type: ['', [Validators.required, Validators.pattern(FormUtils.generalTextPattern)]],
    status: ['', [Validators.required, Validators.pattern(FormUtils.generalTextPattern)]],
    dailyRate: ['', [Validators.required, Validators.pattern(FormUtils.dailyRatePattern)]],
  });


    ngOnInit(): void {
    this.setFormValue(this.vehicle());
    console.log('mi vehículo ', this.vehicle());

    /* ---------------------------------------------------------------------------------------------------- */
    // Recuperar las imágenes del localStorage
    /*const storedUrls = localStorage.getItem('uploadedImageUrls');
    if (storedUrls) {
      this.imageUrls = JSON.parse(storedUrls);
    }*/
    /* ---------------------------------------------------------------------------------------------------- */
  }

  setFormValue(formLike: Partial<Vehicles>) {
    this.vehicleForm.reset({
      plateNumber: formLike.plateNumber || '',
      brand: formLike.brand || '',
      model: formLike.model || '',
      year: String(formLike.year) || '',
      type: formLike.type || '',
      status: formLike.status || '',
      dailyRate: String(formLike.dailyRate) || '',
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
      status: formValue.status!,
      dailyRate: +formValue.dailyRate!,
    };

    if (!this.vehicle().id) {
      // Crear vehículo
      const vehicleResponse: Vehicles = await firstValueFrom(
        this.vehiclesService.createVehicle(vehicle)
      );
      console.log('Vehículo creado:', vehicleResponse);
    } else {
      // Actualizar vehículo
      await firstValueFrom(
        this.vehiclesService.updateVehicle(this.vehicle().id, vehicle)
      );
      console.log('Vehículo actualizado');
    }

    // Notificar que un vehículo fue creado o actualizado
    this.VehicleUpdateService.notifyVehicleUpdated();

    // Navegar de regreso a la lista de vehículos
    this.router.navigate(['/services/vehicles']);
  }

  /* ---------------------------------------------------------------------------------------------------------- */
  /*imageUrls: string[] = []; // Lista para almacenar URLs de imágenes
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload(event: SubmitEvent) {
    event.preventDefault();

    if (!this.selectedFile) {
      alert('Por favor, selecciona un archivo para subir.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<any>('http://localhost:5003/api/v1/claudinary/upload', formData).subscribe({
      next: (response) => {
        const uploadedUrl = response.data.secure_url;

        // Agregar el nuevo URL al arreglo de imágenes
        this.imageUrls.push(uploadedUrl);

        // Guardar en el localStorage
        localStorage.setItem('uploadedImageUrls', JSON.stringify(this.imageUrls));

        alert('Imagen subida exitosamente.');
      },
      error: (error) => {
        console.error('Error al subir la imagen:', error);
        alert('Hubo un error al subir la imagen.');
      },
    });
  }*/
  imageUrl: string | null = null; 
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload(event: SubmitEvent) {
    event.preventDefault();

    if (!this.selectedFile) {
      alert('Por favor, selecciona un archivo para subir.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post<any>('http://localhost:5003/api/v1/claudinary/upload', formData).subscribe({
      next: (response) => {
        const uploadedUrl = response.data.secure_url;

        this.imageUrl = uploadedUrl;

        alert('Imagen subida exitosamente.');
      },
      error: (error) => {
        console.error('Error al subir la imagen:', error);
        alert('Hubo un error al subir la imagen.');
      },
    });
  }
  /* ---------------------------------------------------------------------------------------------------------- */

}

/* ------------------------------------------------------------------------------------------------------------ */