import { Component, inject, signal } from '@angular/core';
import { PaymentTableComponent } from '../components/payment-table/payment-table.component';
import { PaymentsService } from '../services/payments.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationService } from '../../../../shared/components/pagination/pagination.service';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PaymentUpdateService } from '../services/payment-update.service';

@Component({
  selector: 'app-payments-admin-page',
  imports: [PaymentTableComponent, PaginationComponent, RouterLink],
  templateUrl: './payments-admin-page.component.html',
})
export class PaymentsAdminPageComponent {
  paymentsService = inject(PaymentsService);
  paginationService = inject(PaginationService);

  constructor(private paymentUpdateService: PaymentUpdateService) {
    // Suscribirse al evento de actualización de clientes
    this.paymentUpdateService.paymentUpdated$.subscribe(() => {
      console.log('Alquiler actualizado, recargando tabla...');
      this.paymentsResource.reload();
    });
  }
  paymentsPerPage = signal(10);

paymentsResource = rxResource({
  request: () => ({
    page: this.paginationService.currentPage(),
    limit: this.paymentsPerPage(),
  }),
  loader: ({ request }) => {
    console.log('recargando... :D', request);
    return this.paymentsService.getPayments({
      page: request.page,
      perPage: request.limit,
    });
  },
});
 }
