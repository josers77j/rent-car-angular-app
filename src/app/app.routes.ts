import { Routes } from '@angular/router';
import { notAuthenticatedGuard } from './auth/guards/not-authenticated.guard';
import { isAdminGuard } from './auth/guards/is-admin.guard';
import { authenticatedGuard } from './auth/guards/authenticated.guard';
import { RoleDetailsComponent } from './dashboard/pages/roles/role-admin-page/role-details/role-details.component';
import { dashboardLayoutComponent } from './dashboard/layouts/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [


  {
    path: 'roles',
    component: dashboardLayoutComponent, // Tu layout principal
    children: [
      { path: '', component: RoleDetailsComponent },
      { path: 'new', component: RoleDetailsComponent },
      { path: ':id', component: RoleDetailsComponent },
    ],
  },
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
  },
];
