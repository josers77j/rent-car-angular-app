import { User } from './../interfaces/User';
import { inject } from '@angular/core';
import { Router, CanMatchFn,  Route,  UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const isAdminGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAdmin = authService.isAdmin();
console.log(isAdmin)
 await firstValueFrom(authService.checkStatus());


  return authService.isAdmin();
};
