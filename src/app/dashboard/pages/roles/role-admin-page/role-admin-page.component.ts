import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { Role, Roles, RolesResponse } from '../interfaces/role.interfaces';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, tap } from 'rxjs';
import { FormUtils } from '../../../../utils/form-utils';
import { RolesService } from '../services/roles.service';
import { toSignal, rxResource } from '@angular/core/rxjs-interop';
import { RoleDetailsComponent } from './role-details/role-details.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-role-admin-page',
  imports: [RoleDetailsComponent],
  templateUrl: './role-admin-page.component.html',
})
export class RoleAdminPageComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  rolesService = inject(RolesService);



  roleId = toSignal(
    this.activatedRoute.params.pipe(map((params) => params['roleId']))
  );

  roleResource = rxResource({
    request: () => ({ id: this.roleId() }),
    loader: ({ request }) => {
      return this.rolesService.getRoleById(request.id)
    },
  });

  redirectEffect = effect(() => {
    if (this.roleResource.error()) {
      this.router.navigate(['/services/roles']);
    }
  });
 }
