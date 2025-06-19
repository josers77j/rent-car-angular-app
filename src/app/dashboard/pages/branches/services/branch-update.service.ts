import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BranchUpdateService {
  private branchUpdatedSource = new Subject<void>();
  branchUpdated$ = this.branchUpdatedSource.asObservable();

  // Método para notificar que una sucursal fue actualizada o creada
  notifyBranchUpdated() {
    this.branchUpdatedSource.next();
  }
}
