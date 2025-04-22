import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FormUtils } from '../../../utils/form-utils';


@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {

  formBuilder = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  authService = inject(AuthService);
  router = inject(Router);

  formUtils = FormUtils;

  loginForm = this.formBuilder.group({
    email:['', [Validators.required, Validators.pattern(this.formUtils.emailPattern)]],
    password:['', [Validators.required, Validators.minLength(1)]]
  })

  onSubmit(){
    this.loginForm.markAllAsTouched();

    if(this.loginForm.invalid){
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      return;
    }
    const {email = '', password = ''} = this.loginForm.value;

    this.authService.login(email!, password!).subscribe((isAuthenticated) => {
      if(isAuthenticated){
        this.router.navigateByUrl('/services/cars');
        return;
    }
    this.hasError.set(true);
  })
  }
 }
