import { Component, inject, signal } from '@angular/core';
import { UserTableComponent } from '../components/user-table/user-table.component';
import { UsersService } from '../services/users.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationService } from '../../../../shared/components/pagination/pagination.service';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserUpdateService } from '../services/user-update.service';

@Component({
  selector: 'app-users-admin-page',
  imports: [UserTableComponent, PaginationComponent, RouterLink],
  templateUrl: './users-admin-page.component.html',
})
export class UsersAdminPageComponent {
  usersService = inject(UsersService);
  paginationService = inject(PaginationService);

  constructor(private userUpdateService: UserUpdateService) {
    // Suscribirse al evento de actualización de usuarios
    this.userUpdateService.userUpdated$.subscribe(() => {
      console.log('Usuario actualizado, recargando tabla...');
      this.usersResource.reload();
    });
  }
  usersPerPage = signal(10);

usersResource = rxResource({
  request: () => ({
    page: this.paginationService.currentPage(),
    limit: this.usersPerPage(),
  }),
  loader: ({ request }) => {
    console.log('recargando... :D', request);
    return this.usersService.getUsers({
      page: request.page,
      perPage: request.limit,
    });
  },
});
 }
