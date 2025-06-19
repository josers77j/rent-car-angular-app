import { Component, inject, signal } from '@angular/core';
import { CustomerTableComponent } from '../components/customer-table/customer-table.component';
import { CustomersService } from '../services/customers.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationService } from '../../../../shared/components/pagination/pagination.service';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomerUpdateService } from '../services/customer-update.service';

@Component({
  selector: 'app-customers-admin-page',
  imports: [CustomerTableComponent, PaginationComponent, RouterLink],
  templateUrl: './customers-admin-page.component.html',
})
export class CustomersAdminPageComponent {
  customersService = inject(CustomersService);
  paginationService = inject(PaginationService);

  constructor(private customerUpdateService: CustomerUpdateService) {
    // Suscribirse al evento de actualización de clientes
    this.customerUpdateService.customerUpdated$.subscribe(() => {
      console.log('Cliente actualizado, recargando tabla...');
      this.customersResource.reload();
    });
  }
  customersPerPage = signal(10);

customersResource = rxResource({
  request: () => ({
    page: this.paginationService.currentPage(),
    limit: this.customersPerPage(),
  }),
  loader: ({ request }) => {
    console.log('recargando... :D', request);
    return this.customersService.getCustomers({
      page: request.page,
      perPage: request.limit,
    });
  },
});
 }
