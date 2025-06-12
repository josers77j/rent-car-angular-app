import { Component, EventEmitter, inject, input, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FormUtils } from '../../../../../utils/form-utils';
import { Roles, Role } from '../../interfaces/role.interfaces';
import { RolesService } from '../../services/roles.service';
import { FormErrorLabelComponent } from '../../../../../shared/components/form-error-label/form-error-label.component';
import { RoleUpdateService } from '../../services/role-update.service';



@Component({
  selector: 'role-details',
  imports: [ReactiveFormsModule, FormErrorLabelComponent],
  templateUrl: './role-details.component.html',
})
export class RoleDetailsComponent   implements OnInit   {

  @Output() roleUpdated = new EventEmitter<void>();
  role = input.required<Roles>();
  router = inject(Router);
  fb = inject(FormBuilder);
  RoleUpdateService = inject(RoleUpdateService);
  rolesService = inject(RolesService);
  wasSaved = signal(false);

  roleForm = this.fb.group({
    name: [''/*, [Validators.required, Validators.pattern(FormUtils.namePattern)]*/],
    description: [''/*, [Validators.required, Validators.pattern(FormUtils.descriptionPattern)]*/],
  });


    ngOnInit(): void {
    this.setFormValue(this.role());
    console.log('mi rol ', this.role());
  }

  setFormValue(formLike: Partial<Roles>) {
    this.roleForm.reset({
      name: formLike.name || '',
      description: formLike.description || '',
    });
  }

  async onSubmit() {
    const isValid = this.roleForm.valid;
    this.roleForm.markAllAsTouched();

    if (!isValid) return;

    const formValue = this.roleForm.value;
    const role: Role = {
      name: formValue.name!,
      description: formValue.description!,
    };

    if (!this.role().id) {
      // Crear rol
      const roleResponse: Roles = await firstValueFrom(
        this.rolesService.createRole(role)
      );
      console.log('Rol creado:', roleResponse);
    } else {
      // Actualizar rol
      await firstValueFrom(
        this.rolesService.updateRole(this.role().id, role)
      );
      console.log('Rol actualizado');
    }

    // Notificar que un usuario fue creado o actualizado
    this.RoleUpdateService.notifyRoleUpdated();

    // Navegar de regreso a la lista de usuarios
    this.router.navigate(['/services/roles']);
  }

}
