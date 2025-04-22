import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';




/*     {
        path: 'cars',
        component: CarsAdminPageComponent
      },
      {
        path: 'car/:carId',
        component: CarAdminPageComponent
      }, */

@Component({
  selector: 'app-admin-dashboard-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard-layout.component.html',
})
export class dashboardLayoutComponent {
  authService = inject(AuthService);
  router = inject(Router)
  user = computed(() => this.authService.user());

  routes = [
    {
      title: 'autos',
      path : '/services/vehicles',
      description: 'Listado de autos',
      url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDE2IDE2Ij48cGF0aCBmaWxsPSIjZThlZWYwIiBkPSJtMTEuNzc2IDYuNWwtLjEzNS0uMDQ4bC0xLjEzNS0yLjEyOEEyLjUgMi41IDAgMCAwIDguMyAzSDUuNDQyQTIuNSAyLjUgMCAwIDAgMy4wNyA0LjcxbC0uNTQxIDEuNjIzQTIuNSAyLjUgMCAwIDAgMSA4LjYzN1Y5Ljc1YzAgLjcxLjQyMyAxLjMyIDEuMDMgMS41OTVhMiAyIDAgMCAwIDMuOTA3LjE1NWg0LjEyNmEyIDIgMCAwIDAgMy45MDctLjE1NUExLjc1IDEuNzUgMCAwIDAgMTUgOS43NXYtLjMzOWEyLjUgMi41IDAgMCAwLTEuNjYyLTIuMzU1bC0xLjUxLS41MzdWNi41ek00LjAxNyA1LjAyNkExLjUgMS41IDAgMCAxIDUuNDQyIDRINi41djIuNUgzLjUyN3pNMTAuNTMzIDYuNUg3LjVWNGguOGExLjUgMS41IDAgMCAxIDEuMzI0Ljc5NHpNMyAxMWExIDEgMCAxIDEgMiAwYTEgMSAwIDAgMS0yIDBtOS0xYTEgMSAwIDEgMSAwIDJhMSAxIDAgMCAxIDAtMiIvPjwvc3ZnPg=='
    },
    {
      title:'configuraciones',
      path : '/services/settings',
      description: 'Modificar informacion',
      url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZThlZWYwIiBkPSJNMTEgMTdoMmwuMy0xLjVxLjMtLjEyNS41NjMtLjI2MnQuNTM3LS4zMzhsMS40NS40NWwxLTEuN2wtMS4xNS0xcS4wNS0uMzUuMDUtLjY1dC0uMDUtLjY1bDEuMTUtMWwtMS0xLjdsLTEuNDUuNDVxLS4yNzUtLjItLjUzNy0uMzM4VDEzLjMgOC41TDEzIDdoLTJsLS4zIDEuNXEtLjMuMTI1LS41NjIuMjYzVDkuNiA5LjFsLTEuNDUtLjQ1bC0xIDEuN2wxLjE1IDFxLS4wNS4zNS0uMDUuNjV0LjA1LjY1bC0xLjE1IDFsMSAxLjdsMS40NS0uNDVxLjI3NS4yLjUzOC4zMzh0LjU2Mi4yNjJ6bTEtM3EtLjgyNSAwLTEuNDEyLS41ODdUMTAgMTJ0LjU4OC0xLjQxMlQxMiAxMHQxLjQxMy41ODhUMTQgMTJ0LS41ODcgMS40MTNUMTIgMTRtLTcgN3EtLjgyNSAwLTEuNDEyLS41ODdUMyAxOVY1cTAtLjgyNS41ODgtMS40MTJUNSAzaDE0cS44MjUgMCAxLjQxMy41ODhUMjEgNXYxNHEwIC44MjUtLjU4NyAxLjQxM1QxOSAyMXptMC0yaDE0VjVINXpNNSA1djE0eiIvPjwvc3ZnPg=='
    },
  ]

  adminRoutes = [
    {
      title: 'usuarios',
      path : '/services/users',
      description: 'Listado de usuarios',
      url:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiNlOGVlZjAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjUiIGQ9Ik01LjA4IDE1LjI5NmMtMS4yMTguNzM4LTQuNDEyIDIuMjQzLTIuNDY2IDQuMTI2Yy45NS45MiAyLjAwOSAxLjU3OCAzLjM0IDEuNTc4aDcuNTkzYzEuMzMgMCAyLjM4OS0uNjU4IDMuMzQtMS41NzhjMS45NDUtMS44ODMtMS4yNS0zLjM4OS0yLjQ2OC00LjEyNmE5LjA2IDkuMDYgMCAwIDAtOS4zMzggME0xMy41IDdhNCA0IDAgMSAxLTggMGE0IDQgMCAwIDEgOCAwTTE3IDVoNW0tNSAzaDVtLTIgM2gyIiBjb2xvcj0iI2U4ZWVmMCIvPjwvc3ZnPg=='
    },
    {
      title: 'roles',
      path : '/services/roles',
      description: 'Listado de roles',
      url:'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aCBmaWxsPSIjZThlZWYwIiBkPSJNNi41IDZhLjUuNSAwIDAgMCAwIDFoN2EuNS41IDAgMCAwIDAtMXpNNiA5LjVhLjUuNSAwIDAgMSAuNS0uNWg0YS41LjUgMCAwIDEgMCAxaC00YS41LjUgMCAwIDEtLjUtLjVtLjUgMi41YS41LjUgMCAwIDAgMCAxaDIuNzA3cS4xNDktLjUyNC4zOTMtMXptLTEgNGgzLjcwN3EuMTQ5LjUyNC4zOTMgMUg1LjVBMi41IDIuNSAwIDAgMSAzIDE0LjV2LTlBMi41IDIuNSAwIDAgMSA1LjUgM2g5QTIuNSAyLjUgMCAwIDEgMTcgNS41djQuMWE1LjUgNS41IDAgMCAwLTEtLjM5M1Y1LjVBMS41IDEuNSAwIDAgMCAxNC41IDRoLTlBMS41IDEuNSAwIDAgMCA0IDUuNXY5QTEuNSAxLjUgMCAwIDAgNS41IDE2bTYuNTY1LTQuNTU4YTIgMiAwIDAgMS0xLjQzIDIuNDc4bC0uNDYxLjExOGE0LjcgNC43IDAgMCAwIC4wMSAxLjAxNmwuMzUuMDgzYTIgMiAwIDAgMSAxLjQ1NSAyLjUxOWwtLjEyNi40MjNxLjM4Ny4zMDYuODM1LjUxN2wuMzI1LS4zNDRhMiAyIDAgMCAxIDIuOTA5LjAwMmwuMzM3LjM1OHEuNDQtLjIwMy44MjItLjQ5OGwtLjE1Ni0uNTU2YTIgMiAwIDAgMSAxLjQzLTIuNDc4bC40NjEtLjExOGE0LjcgNC43IDAgMCAwLS4wMS0xLjAxN2wtLjM0OS0uMDgyYTIgMiAwIDAgMS0xLjQ1Ni0yLjUybC4xMjYtLjQyMWE0LjMgNC4zIDAgMCAwLS44MzUtLjUxOWwtLjMyNC4zNDRhMiAyIDAgMCAxLTIuOTEtLjAwMWwtLjMzNy0uMzU4YTQuMyA0LjMgMCAwIDAtLjgyMi40OTd6TTE0LjUgMTUuNWExIDEgMCAxIDEgMC0yYTEgMSAwIDAgMSAwIDIiLz48L3N2Zz4='
    },
  ]

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
