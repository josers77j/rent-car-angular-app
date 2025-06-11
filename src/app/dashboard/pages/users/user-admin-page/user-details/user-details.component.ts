import { Component, EventEmitter, inject, input, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FormUtils } from '../../../../../utils/form-utils';
import { Users, User, RoleItem } from '../../interfaces/user.interfaces';
import { UsersService } from '../../services/users.service';
import { FormErrorLabelComponent } from '../../../../../shared/components/form-error-label/form-error-label.component';
import { UserUpdateService } from '../../services/user-update.service';



@Component({
  selector: 'user-details',
  imports: [ReactiveFormsModule, FormErrorLabelComponent],
  templateUrl: './user-details.component.html',
})
export class UserDetailsComponent   implements OnInit   {

  @Output() userUpdated = new EventEmitter<void>();
  user = input.required<Users>();
  roleItem = input.required<RoleItem[]>();
  router = inject(Router);
  fb = inject(FormBuilder);
  UserUpdateService = inject(UserUpdateService);
  usersService = inject(UsersService);
  wasSaved = signal(false);

  userForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(FormUtils.namePattern)]],
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
    role: ['', [Validators.required, Validators.pattern(FormUtils.onlyNumbersPattern)]],
  });


    ngOnInit(): void {
    this.setFormValue(this.user());
    console.log('mi usuario ', this.user());
  }

  setFormValue(formLike: Partial<Users>) {
    this.userForm.reset({
      name: formLike.name || '',
      email: formLike.email || '',
      role: String(formLike.roleId) || '',
    });
  }

  async onSubmit() {
    const isValid = this.userForm.valid;
    this.userForm.markAllAsTouched();

    if (!isValid) return;

    const formValue = this.userForm.value;
    const user: User = {
      name: formValue.name!,
      email: formValue.email!,
      roleId: +formValue.role!,
    };

    if (!this.user().id) {
      // Crear usuario
      const userResponse: Users = await firstValueFrom(
        this.usersService.createUser(user)
      );
      console.log('Usuario creado:', userResponse);
    } else {
      // Actualizar usuario
      await firstValueFrom(
        this.usersService.updateUser(this.user().id, user)
      );
      console.log('Usuario actualizado');
    }

    // Notificar que un usuario fue creado o actualizado
    this.UserUpdateService.notifyUserUpdated();

    // Navegar de regreso a la lista de usuarios
    this.router.navigate(['/services/users']);
  }

}
