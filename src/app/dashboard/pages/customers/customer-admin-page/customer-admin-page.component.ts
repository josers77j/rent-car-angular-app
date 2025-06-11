import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { Customer, Customers, CustomersResponse } from '../interfaces/customer.interfaces';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, tap } from 'rxjs';
import { FormUtils } from '../../../../utils/form-utils';
import { CustomersService } from '../services/customers.service';
import { toSignal, rxResource } from '@angular/core/rxjs-interop';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-customer-admin-page',
  imports: [CustomerDetailsComponent],
  templateUrl: './customer-admin-page.component.html',
})
export class CustomerAdminPageComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  customersService = inject(CustomersService);



  customerId = toSignal(
    this.activatedRoute.params.pipe(map((params) => params['customerId']))
  );

  customerResource = rxResource({
    request: () => ({ id: this.customerId() }),
    loader: ({ request }) => {
      return this.customersService.getCustomerById(request.id)
    },
  });


  redirectEffect = effect(() => {
    if (this.customerResource.error()) {
      this.router.navigate(['/services/customers']);
    }
  });
 }
