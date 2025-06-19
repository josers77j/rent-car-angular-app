import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { Payment, Payments, PaymentsResponse } from '../interfaces/payment.interfaces';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, tap } from 'rxjs';
import { FormUtils } from '../../../../utils/form-utils';
import { PaymentsService } from '../services/payments.service';
import { toSignal, rxResource } from '@angular/core/rxjs-interop';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-payment-admin-page',
  imports: [PaymentDetailsComponent],
  templateUrl: './payment-admin-page.component.html',
})
export class PaymentAdminPageComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  paymentsService = inject(PaymentsService);



  paymentId = toSignal(
    this.activatedRoute.params.pipe(map((params) => params['paymentId']))
  );

  paymentResource = rxResource({
    request: () => ({ id: this.paymentId() }),
    loader: ({ request }) => {
      return this.paymentsService.getPaymentById(request.id)
    },
  });


  redirectEffect = effect(() => {
    if (this.paymentResource.error()) {
      this.router.navigate(['/services/payments']);
    }
  });
 }
