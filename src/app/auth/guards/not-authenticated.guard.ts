import { inject } from '@angular/core';
import { Router, CanMatchFn,  Route,  UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const notAuthenticatedGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await firstValueFrom(authService.checkStatus());
console.log(isAuthenticated)


  if(isAuthenticated){
    console.log('authenticated')
   await router.navigateByUrl('/');
    return false;
  }



  return true;
};
