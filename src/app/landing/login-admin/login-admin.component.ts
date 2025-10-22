import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { log } from 'console';
import { SessionStorageService } from '../../services/session-storage/session-storage.service';
import { JsonPipe } from '@angular/common';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface LoginForm {
  email: FormControl<null | string>;
  password: FormControl<null | string>;
}

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.scss',
})
export class LoginAdminComponent {
  _SessionStorageService = inject(SessionStorageService);
  _loginService = inject(LoginService);
  _formBuilder = inject(FormBuilder);
  _router = inject(Router);

  //! toast

  constructor(private snackBar: MatSnackBar) {}

  loginForm = this._formBuilder.group<LoginForm>({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  async logIn() {
    if (this.loginForm.invalid) return;

    try {
      const { error, data } = await this._loginService.logIn({
        email: this.loginForm.value.email ?? '',
        password: this.loginForm.value.password ?? '',
      });

      if (error) throw error;

      console.log(data);

      this._SessionStorageService.SetToken(data.session?.access_token ?? '');
      this._router.navigateByUrl('/dashboard', {replaceUrl: false});
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error: ', error);
        // this.openToast(error.message);
        this.openToast('Email o contraseña son incorrectos');
      }
    }
  }

  getFieldError(campos: string): string | null {
    if (
      !this.loginForm.get(campos)?.errors &&
      !this.loginForm.get(campos)?.touched
    )
      return null;

    const errors = this.loginForm.get(campos)?.errors ?? {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          if (campos === 'password') {
            return 'La contrasenia es requerida';
          }

          return 'El campo es requerido';
        case 'email':
          return 'Escribe un correo valido';
      }
    }

    return null;
  }

  openToast(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
