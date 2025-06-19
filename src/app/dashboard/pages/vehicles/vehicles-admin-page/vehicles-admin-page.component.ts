import { Component, inject, signal } from '@angular/core';
import { VehicleTableComponent } from '../components/vehicle-table/vehicle-table.component';
import { VehiclesService } from '../services/vehicles.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationService } from '../../../../shared/components/pagination/pagination.service';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VehicleUpdateService } from '../services/vehicle-update.service';

@Component({
  selector: 'app-vehicles-admin-page',
  imports: [VehicleTableComponent, PaginationComponent, RouterLink],
  templateUrl: './vehicles-admin-page.component.html',
})
export class VehiclesAdminPageComponent {
  vehiclesService = inject(VehiclesService);
  paginationService = inject(PaginationService);

  constructor(private vehicleUpdateService: VehicleUpdateService) {
    // Suscribirse al evento de actualización de vehículos
    this.vehicleUpdateService.vehicleUpdated$.subscribe(() => {
      console.log('Vehículo actualizado, recargando tabla...');
      this.vehiclesResource.reload();
    });
  }
  vehiclesPerPage = signal(10);

vehiclesResource = rxResource({
  request: () => ({
    page: this.paginationService.currentPage(),
    limit: this.vehiclesPerPage(),
  }),
  loader: ({ request }) => {
    console.log('recargando... :D', request);
    return this.vehiclesService.getVehicles({
      page: request.page,
      perPage: request.limit,
    });
  },
});
 }
