import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Roles } from '../interfaces/role.interfaces';
import { RolesService } from '../services/roles.service';

@Injectable({
  providedIn: 'root',
})
export class RoleResolver implements Resolve<Roles | null> {
  constructor(private rolesService: RolesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Roles | null> {
    const roleId = route.params['id'];
    if (!roleId) {
      return of(null); // Devuelve null si no hay ID.
    }
    return this.rolesService.getRoleById(+roleId).pipe(
      catchError(() => {
        console.error('Error al obtener el rol');
        return of(null); // Maneja errores devolviendo null.
      })
    );
  }
}
