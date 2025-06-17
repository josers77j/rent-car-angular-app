import { Component, inject, OnInit, signal } from '@angular/core';
import { CustomerTableComponent } from '../components/customer-table/customer-table.component';
import { CustomersService } from '../services/customers.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationService } from '../../../../shared/components/pagination/pagination.service';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CustomerUpdateService } from '../services/customer-update.service';

@Component({
  selector: 'app-users-admin-page',
  imports: [CustomerTableComponent, PaginationComponent, RouterLink],
  templateUrl: './customers-admin-page.component.html',
})
export class CustomersAdminPageComponent implements OnInit {
  customersService = inject(CustomersService);
  paginationService = inject(PaginationService);

  constructor(private customerUpdateService: CustomerUpdateService) {
    // Suscribirse al evento de actualización de usuarios
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
      console.log('Recargando... :D', request);
      return this.customersService.getCustomers({
        page: request.page,
        perPage: request.limit,
      });
    },
  });

  // Método ngOnInit para pruebas
  ngOnInit(): void {
    this.customersService.getCustomers({ page: 1, perPage: 10 }).subscribe({
      next: (data) => console.log('Clientes:', data),
      error: (err) => console.error('Error:', err),
    });
  }
}
