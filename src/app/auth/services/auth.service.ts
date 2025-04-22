import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/User';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { AuthResponse } from '../interfaces/auth-response';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
type AuthStatus =  'checking' | 'authenticated' | 'not-authenticated';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User|null>(null);
  private _token = signal<string|null>(localStorage.getItem('token'));


  checkStatusResource = rxResource({
    loader:() => this.checkStatus(),
  })

  http = inject(HttpClient);

  authStatus = computed<AuthStatus>(() => {
    if(this._authStatus() === 'checking'){
      return 'checking';
    }

    if(this._user()){
      return 'authenticated';
    }

    return 'not-authenticated';
  });

  user = computed<User|null>(() => this._user());

  isAdmin = computed(()=> this._user()?.role.includes('admin') ?? false) ;

token = computed(this._token)

login(email:string, password:string): Observable<boolean> {
  return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, {email, password})
  .pipe(
    map(resp => this.handleAuthSuccess(resp)),
    catchError((error: any) => this.handleAuthError(error))
  )
}

checkStatus():Observable<boolean> {
  const token = localStorage.getItem('token');

  if(!token) {
    this.logout();
    return of(false)
  };

  return this.http.get<AuthResponse>(`${baseUrl}/auth/profile`, {
    //headers: {
    //  'Authorization': `Bearer ${token}`
    //}
  }).pipe(
    map(resp => this.handleAuthSuccess(resp)),
    catchError((error: any) => this.handleAuthError(error))
  )
}

logout(){
  this._user.set(null);
  this._token.set(null);
  this._authStatus.set('not-authenticated');

  localStorage.removeItem('token');
}

private handleAuthSuccess({user, token}: AuthResponse){
  const localToken = localStorage.getItem('token') ?? token;

  this._user.set(user);
  this._token.set(localToken);
  this._authStatus.set('authenticated');

  localStorage.setItem('token', localToken);
  return true;
}

private handleAuthError(error: any){
  this.logout();

  return of(false);
}
}
