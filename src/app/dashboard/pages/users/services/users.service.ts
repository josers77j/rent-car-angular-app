import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import {   RoleItem, User, Users, UsersResponse } from '../interfaces/user.interfaces';
import { environment } from '../../../../../environments/environment.development';
import { UserMapper } from '../mapper/user.mapper';

const baseUrl = environment.baseUrl;
interface Options {
  perPage?: number;
  page?: number;
}

const emptyUser: Users = {
  id: 0,
  name: '',
  email: '',
  roleId: 0,
  role: '',
  createdAt: new Date(),
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient);

  private _usersCache = new Map<string, UsersResponse>();
  private _userCache = new Map<number, Users>();
  getUsers(options: Options): Observable<UsersResponse> {
    const { perPage = 9, page = 0 } = options;

    const key = `${perPage}-${page}`; // 9-0
  /*   if (this._usersCache.has(key)) {
      return of(this._usersCache.get(key)!);
    } */

    return this.http
      .get<UsersResponse>(`${baseUrl}/users/all`, {
        params: {
          perPage,
          page,
        },
      })
      .pipe(
        tap((resp) => console.log(resp)),
       // tap((resp) => this._usersCache.set(key, resp))
      );
  }

  createUser(user: User): Observable<Users> {

    return this.http
    .post<Users>(`${baseUrl}/users`, user)
    .pipe(
      tap((resp) => console.log('creando',resp))
    );

  }

  updateUser(
    id: number,
    userLike: Partial<User>
  ): Observable<Users> {
    return this.http
      .patch<Users>(`${baseUrl}/users/${id}`, userLike)
      .pipe(
        tap((resp) => console.log('actualizando ',resp))
      );
  }
/* tendra otro uso */
/*   updateUserCache(user: Users) {
    const userId = user.id;

    this._userCache.set(userId, user);

    this._usersCache.forEach((userResponse) => {
      userResponse.data = userResponse.data.map(
        (currentUser) =>
          currentUser.id === userId ? user : currentUser
      );
    });

    console.log('Caché actualizado');
  } */

  getUserById(id: number): Observable<Users> {
    if (!id) {
      return of(emptyUser);
    }

    if (this._userCache.has(id)) {
      return of(this._userCache.get(id)!);
    }

    return this.http
      .get<UsersResponse>(`${baseUrl}/users/all`,{
        params:{
          userId: id
        }
      } )
      .pipe(
        map((userData) => userData.data[0]),
      );
  }

  getRoles(): Observable<RoleItem[]> {
    return this.http
    .get<RoleItem[]>(`${baseUrl}/roles/all`)
    .pipe(
      tap((resp) => console.log(resp)),
    );

  }


}
