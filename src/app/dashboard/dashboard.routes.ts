import { Routes } from "@angular/router";
import { dashboardLayoutComponent } from "./layouts/dashboard-layout/dashboard-layout.component";

import { UsersAdminPageComponent } from "./pages/users/users-admin-page/users-admin-page.component";
import { UserAdminPageComponent } from "./pages/users/user-admin-page/user-admin-page.component";
import { VehiclesAdminPageComponent } from "./pages/vehicles/vehicles-admin-page/vehicles-admin-page.component";
import { VehicleAdminPageComponent } from "./pages/vehicles/vehicle-admin-page/vehicle-admin-page.component";
import { RolesAdminPageComponent } from "./pages/roles/roles-admin-page/roles-admin-page.component";
import { PasswordUpdatePageComponent } from "./pages/settings/settings-layout-page/password-update-page/password-update-page.component";
import { SettingsLayoutPageComponent } from "./pages/settings/settings-layout-page/settings-layout-page.component";
import { InformationUpdatePageComponent } from "./pages/settings/settings-layout-page/information-update-page/information-update-page.component";

export const adminDashboardRoutes: Routes = [
  {
    path: '',
    component: dashboardLayoutComponent,

    children: [
      {
        path: 'vehicles',
        component: VehiclesAdminPageComponent
      },
      {
        path: 'vehicle/:vehicleId',
        component: VehicleAdminPageComponent
      },
      {
        path: 'users',
        component: UsersAdminPageComponent
      },
      {
        path: 'user/:userId',
        component: UserAdminPageComponent
      },
      {
        path:'roles',
        component: RolesAdminPageComponent
      },
      {
        path: 'settings',
        component: SettingsLayoutPageComponent,
        children: [
          {
            path:'password-update',
            component: PasswordUpdatePageComponent
          },
          {
            path: 'information-update',
            component: InformationUpdatePageComponent
          },
          {
            path: '**',
            redirectTo: 'password-update',
          }
        ]
      },
      {
        path:'user',
        component: UserAdminPageComponent
      },
      {
        path: '**',
        redirectTo: 'cars',
      }
    ]
  }
];

export default adminDashboardRoutes;
