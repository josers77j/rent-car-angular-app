import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerUpdateService {
  private customerUpdatedSource = new Subject<void>();
  customerUpdated$ = this.customerUpdatedSource.asObservable();

  // Método para notificar que un usuario fue actualizado o creado
  notifyCustomerUpdated() {
    this.customerUpdatedSource.next();
  }
}
