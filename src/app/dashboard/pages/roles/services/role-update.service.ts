import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleUpdateService {
  private roleUpdatedSource = new Subject<void>();
  roleUpdated$ = this.roleUpdatedSource.asObservable();

  // Método para notificar que un rol fue actualizado o creado
  notifyRoleUpdated() {
    this.roleUpdatedSource.next();
  }
}
