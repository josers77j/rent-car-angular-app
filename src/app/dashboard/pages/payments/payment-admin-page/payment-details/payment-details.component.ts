import { Component, EventEmitter, inject, input, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FormUtils } from '../../../../../utils/form-utils';
import { Payments, Payment } from '../../interfaces/payment.interfaces';
import { PaymentsService } from '../../services/payments.service';
import { FormErrorLabelComponent } from '../../../../../shared/components/form-error-label/form-error-label.component';
import { PaymentUpdateService } from '../../services/payment-update.service';



@Component({
  selector: 'payment-details',
  imports: [ReactiveFormsModule, FormErrorLabelComponent],
  templateUrl: './payment-details.component.html',
})
export class PaymentDetailsComponent   implements OnInit   {

  @Output() paymentUpdated = new EventEmitter<void>();
  payment = input.required<Payments>();
  router = inject(Router);
  fb = inject(FormBuilder);
  PaymentUpdateService = inject(PaymentUpdateService);
  paymentsService = inject(PaymentsService);
  wasSaved = signal(false);

  paymentForm = this.fb.group({
    rentalId: [''/*, [Validators.required, Validators.pattern(FormUtils.namePattern)]*/],
    amount: ['', [Validators.required, Validators.pattern(FormUtils.onlyNumbersPattern)]],
    paymentMethod: [''/*, [Validators.required, Validators.pattern(FormUtils.emailPattern)]*/],
    paymentDate: [''/*, [Validators.required, Validators.pattern(FormUtils.generalTextPattern)]*/],
  });


    ngOnInit(): void {
    this.setFormValue(this.payment());
    console.log('mi alquiler ', this.payment());
  }

  setFormValue(formLike: Partial<Payments>) {
    this.paymentForm.reset({
      rentalId: String(formLike.rentalId) || '',
      amount: String(formLike.amount) || '',
      paymentMethod: formLike.paymentMethod || '',
      paymentDate: String(formLike.paymentDate) || '',
    });
  }

  async onSubmit() {
    const isValid = this.paymentForm.valid;
    this.paymentForm.markAllAsTouched();

    if (!isValid) return;

    const formValue = this.paymentForm.value;
    const payment: Payment = {
      rentalId: +formValue.rentalId!,
      amount: +formValue.amount!,
      paymentMethod: formValue.paymentMethod!,
      paymentDate: new Date(formValue.paymentDate!),
    };

    if (!this.payment().id) {
      // Crear alquiler
      const paymentResponse: Payments = await firstValueFrom(
        this.paymentsService.createPayment(payment)
      );
      console.log('Alquiler creado:', paymentResponse);
    } else {
      // Actualizar alquiler
      await firstValueFrom(
        this.paymentsService.updatePayment(this.payment().id, payment)
      );
      console.log('Alquiler actualizado');
    }

    // Notificar que un alquiler fue creado o actualizado
    this.PaymentUpdateService.notifyPaymentUpdated();

    // Navegar de regreso a la lista de alquileres
    this.router.navigate(['/services/payments']);
  }

}
