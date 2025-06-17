import { Component, EventEmitter, inject, input, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Roles } from '../../interfaces/role.interfaces';
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
    name: ['', [Validators.required]],
    description: ['', [Validators.required, ]],
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
  console.log('submit disparado');
  console.log(this.roleForm.value);
  
  const isValid = this.roleForm.valid;
  this.roleForm.markAllAsTouched();

  if (!isValid) return;

  // Verificar que el role esté disponible
  const currentRole = this.role();
  if (!currentRole) {
    console.error('Role no está disponible');
    return;
  }

  const formValue = this.roleForm.value;
  const role: Roles = {
    name: formValue.name!,
    description: formValue.description!,
    id: 0,
    createdBy: null,
    modifiedBy: null,
    deletedBy: null,
    createdAt: null,
    updatedAt: null,
    deletedAt: null
  };

  const isNewRole = !currentRole.id || currentRole.id === 0;

  if (isNewRole) {
    // Crear rol
    try {
      const roleResponse: Roles = await firstValueFrom(
        this.rolesService.createRole(role)
      );
      console.log('Rol creado:', roleResponse);
    } catch (error) {
      console.error('Error creando rol:', error);
      return;
    }
  } else {
    // Actualizar rol
    role.id = currentRole.id;
    try {
      await firstValueFrom(
        this.rolesService.updateRole(currentRole.id, role)
      );
      console.log('Rol actualizado');
    } catch (error) {
      console.error('Error actualizando rol:', error);
      return;
    }
  }

  // Notificar que un rol fue creado o actualizado
  this.RoleUpdateService.notifyRoleUpdated();

  // Navegar de regreso a la lista de roles
  this.router.navigate(['/services/roles']);
}
}  


