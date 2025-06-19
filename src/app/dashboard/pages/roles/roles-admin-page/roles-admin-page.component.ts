import { Component, inject, signal } from '@angular/core';
import { RoleTableComponent } from '../components/role-table/role-table.component';
import { RolesService } from '../services/roles.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationService } from '../../../../shared/components/pagination/pagination.service';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RoleUpdateService } from '../services/role-update.service';

@Component({
  selector: 'app-roles-admin-page',
  imports: [RoleTableComponent, PaginationComponent, RouterLink],
  templateUrl: './roles-admin-page.component.html',
})
export class RolesAdminPageComponent {
  rolesService = inject(RolesService);
  paginationService = inject(PaginationService);

  constructor(private roleUpdateService: RoleUpdateService) {
    // Suscribirse al evento de actualización de roles
    this.roleUpdateService.roleUpdated$.subscribe(() => {
      console.log('Rol actualizado, recargando tabla...');
      this.rolesResource.reload();
    });
  }
  rolesPerPage = signal(10);

rolesResource = rxResource({
  request: () => ({
    page: this.paginationService.currentPage(),
    limit: this.rolesPerPage(),
  }),
  loader: ({ request }) => {
    console.log('recargando... :D', request);
    return this.rolesService.getRoles({
      page: request.page,
      perPage: request.limit,
    });
  },
});
 }
