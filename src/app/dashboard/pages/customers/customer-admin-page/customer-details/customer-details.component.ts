import { Component, EventEmitter, inject, input, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FormUtils } from '../../../../../utils/form-utils';
import { Customers, Customer } from '../../interfaces/customer.interfaces';
import { CustomersService } from '../../services/customers.service';
import { FormErrorLabelComponent } from '../../../../../shared/components/form-error-label/form-error-label.component';
import { CustomerUpdateService } from '../../services/customer-update.service';



@Component({
  selector: 'customer-details',
  imports: [ReactiveFormsModule, FormErrorLabelComponent],
  templateUrl: './customer-details.component.html',
})
export class CustomerDetailsComponent   implements OnInit   {

  @Output() customerUpdated = new EventEmitter<void>();
  customer = input.required<Customers>();
  identificationTypes = ['dni', 'passport', 'drive_license'];
  router = inject(Router);
  fb = inject(FormBuilder);
  CustomerUpdateService = inject(CustomerUpdateService);
  customersService = inject(CustomersService);
  wasSaved = signal(false);

  customerForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(FormUtils.namePattern)]],
    phone: [''],
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
    address: [''],
    identification: [''],
    identificationType: ['', Validators.required],
  });


    ngOnInit(): void {
    this.setFormValue(this.customer());
    console.log('mi cliente ', this.customer());
  }

  setFormValue(formLike: Partial<Customers>) {
    this.customerForm.reset({
      name: formLike.name || '',
      phone: formLike.phone || '',
      email: formLike.email || '',
      identification: formLike.identification || '',
      identificationType: formLike.identificationType || '',
    });
  }

  async onSubmit() {
    const isValid = this.customerForm.valid;
    this.customerForm.markAllAsTouched();

    if (!isValid) return;

    const formValue = this.customerForm.value;
    const customer: Customer = {
      name: formValue.name!,
      phone: formValue.phone!,
      email: formValue.email!,
      identification: formValue.identification!,
      identificationType: formValue.identificationType!,
    };

    if (!this.customer().id) {
      // Crear cliente
      const customerResponse: Customers = await firstValueFrom(
        this.customersService.createCustomer(customer)
      );
      console.log('Cliente creado:', customerResponse);
    } else {
      // Actualizar cliente
      await firstValueFrom(
        this.customersService.updateCustomer(this.customer().id, customer)
      );
      console.log('Cliente actualizado');
    }

    // Notificar que un cliente fue creado o actualizado
    this.CustomerUpdateService.notifyCustomerUpdated();

    // Navegar de regreso a la lista de clientes
    this.router.navigate(['/services/customers']);
  }

}
