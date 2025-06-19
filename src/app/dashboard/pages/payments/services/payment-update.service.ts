import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentUpdateService {
  private paymentUpdatedSource = new Subject<void>();
  paymentUpdated$ = this.paymentUpdatedSource.asObservable();

  // Método para notificar que un alquiler fue actualizado o creado
  notifyPaymentUpdated() {
    this.paymentUpdatedSource.next();
  }
}
