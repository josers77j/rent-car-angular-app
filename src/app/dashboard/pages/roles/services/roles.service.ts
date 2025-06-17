import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { Roles, RolesResponse } from '../interfaces/role.interfaces';
import { environment } from '../../../../../environments/environment.development';
import { RoleMapper } from '../mapper/role.mapper';

const baseUrl = environment.baseUrl;
interface Options {
  perPage?: number;
  page?: number;
}

const emptyRole: Roles = {
  id: 0,
  name: '',
  description: '',
   createdBy: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt:   null,
  deletedBy: '',
  modifiedBy: '',

};

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private http = inject(HttpClient);

  private _rolesCache = new Map<string, RolesResponse>();
  private _roleCache = new Map<number, Roles>();
  getRoles(options: Options): Observable<RolesResponse> {
    const { perPage = 9, page = 0 } = options;

    const key = `${perPage}-${page}`; // 9-0

    return this.http
      .get<RolesResponse>(`${baseUrl}/roles/all`, {
        params: {
          perPage,
          page,
        },
      })
      .pipe(
        tap((resp) => console.log(resp)),
      );
  }

  createRole(role: Roles): Observable<Roles> {

    return this.http
    .post<Roles>(`${baseUrl}/roles`, role)
    .pipe(
      tap((resp) => console.log('creando',resp))
    );

  }

  updateRole(
    id: number,
    userLike: Partial<Roles>
  ): Observable<Roles> {
    return this.http
      .patch<Roles>(`${baseUrl}/roles/${id}`, userLike)
      .pipe(
        tap((resp) => console.log('actualizando ',resp))
      );
  }

  getRoleById(id: number): Observable<Roles> {
    if (!id) {
      return of(emptyRole);
    }

    if (this._roleCache.has(id)) {
      return of(this._roleCache.get(id)!);
    }

    return this.http
      .get<RolesResponse>(`${baseUrl}/roles/all`,{
        params:{
          roleId: id
        }
      } )
      .pipe(
        map((roleData) => roleData.data[0]),
      );
  }

}