import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const authenticatedGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verifica el estado de autenticación
  const authStatus = authService.authStatus();

  if (authStatus === 'authenticated') {
    return true; // Permite el acceso
  }

  if (authStatus === 'checking') {
    // Espera a que se resuelva el estado de autenticación
    const isAuthenticated = await firstValueFrom(authService.checkStatus());
    if (isAuthenticated) {
      return true; // Permite el acceso
    }
  }

  // Redirige al login si no está autenticado
  await router.navigateByUrl('/auth/login');
  return false;
};
