import { Routes } from "@angular/router";
import { dashboardLayoutComponent } from "./layouts/dashboard-layout/dashboard-layout.component";

import { UsersAdminPageComponent } from "./pages/users/users-admin-page/users-admin-page.component";
import { UserAdminPageComponent } from "./pages/users/user-admin-page/user-admin-page.component";
import { VehiclesAdminPageComponent } from "./pages/vehicles/vehicles-admin-page/vehicles-admin-page.component";
import { VehicleAdminPageComponent } from "./pages/vehicles/vehicle-admin-page/vehicle-admin-page.component";
import { RolesAdminPageComponent } from "./pages/roles/roles-admin-page/roles-admin-page.component";
import { RoleAdminPageComponent } from "./pages/roles/role-admin-page/role-admin-page.component";
import { BranchesAdminPageComponent } from "./pages/branches/branches-admin-page/branches-admin-page.component";
import { BranchAdminPageComponent } from "./pages/branches/branch-admin-page/branch-admin-page.component";
import { PasswordUpdatePageComponent } from "./pages/settings/settings-layout-page/password-update-page/password-update-page.component";
import { SettingsLayoutPageComponent } from "./pages/settings/settings-layout-page/settings-layout-page.component";
import { InformationUpdatePageComponent } from "./pages/settings/settings-layout-page/information-update-page/information-update-page.component";
import { CustomersAdminPageComponent } from "./pages/customers/customers-admin-page/customers-admin-page.component";
import { CustomerAdminPageComponent } from "./pages/customers/customer-admin-page/customer-admin-page.component";
import { PaymentsAdminPageComponent } from "./pages/payments/payments-admin-page/payments-admin-page.component";
import { PaymentAdminPageComponent } from "./pages/payments/payment-admin-page/payment-admin-page.component";
import { HomeLayoutPageComponent } from "./pages/home/home-layout-page.component";

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
        path:'role/:roleId',
        component: RoleAdminPageComponent
      },
      {
        path:'branches',
        component: BranchesAdminPageComponent
      },
      {
        path:'branch/:branchId',
        component: BranchAdminPageComponent
      },
      {
        path:'customers',
        component: CustomersAdminPageComponent
      },
      {
        path:'customer/:customerId',
        component: CustomerAdminPageComponent
      },
      {
        path:'payments',
        component: PaymentsAdminPageComponent
      },
      {
        path:'payment/:paymentId',
        component: PaymentAdminPageComponent
      },

      {
        path:'home',
        component: HomeLayoutPageComponent
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
        path:'vehicle',
        component: VehicleAdminPageComponent
      },
      {
        path:'role',
        component: RoleAdminPageComponent
      },
      {
        path:'branch',
        component: BranchAdminPageComponent
      },
      {
        path:'customer',
        component: CustomerAdminPageComponent
      },
      {
        path:'payment',
        component: PaymentAdminPageComponent
      },
      {
        path: '**',
        redirectTo: 'cars',
      }
    ]
  }
];

export default adminDashboardRoutes;
