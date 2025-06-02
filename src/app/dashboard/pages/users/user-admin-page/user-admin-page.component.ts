import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { User, Users, UsersResponse } from '../interfaces/user.interfaces';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, tap } from 'rxjs';
import { FormUtils } from '../../../../utils/form-utils';
import { UsersService } from '../services/users.service';
import { toSignal, rxResource } from '@angular/core/rxjs-interop';
import { UserDetailsComponent } from './user-details/user-details.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user-admin-page',
  imports: [UserDetailsComponent],
  templateUrl: './user-admin-page.component.html',
})
export class UserAdminPageComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  usersService = inject(UsersService);



  userId = toSignal(
    this.activatedRoute.params.pipe(map((params) => params['userId']))
  );

  userResource = rxResource({
    request: () => ({ id: this.userId() }),
    loader: ({ request }) => {
      return this.usersService.getUserById(request.id)
    },
  });

  roleItemResource = rxResource({
    request: () => ({}),
    loader: () => {
      return this.usersService.getRoles();
    },
  })

  redirectEffect = effect(() => {
    if (this.userResource.error()) {
      this.router.navigate(['/services/users']);
    }
  });
 }
