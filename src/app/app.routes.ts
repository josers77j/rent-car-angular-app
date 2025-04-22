import { Routes } from '@angular/router';
import { notAuthenticatedGuard } from './auth/guards/not-authenticated.guard';
import { isAdminGuard } from './auth/guards/is-admin.guard';
import { authenticatedGuard } from './auth/guards/authenticated.guard';

export const routes: Routes = [

  {
    path:'auth',
    loadChildren: () => import('./auth/auth.route'),
    canMatch: [notAuthenticatedGuard],
  },

  {
    path:'services',
    loadChildren:() => import('./dashboard/dashboard.routes'),
    canMatch: [authenticatedGuard],
  },
  {
    path:'**',
    loadComponent: () => import('./shared/pages/not-found/not-found.component'),
  }

];
