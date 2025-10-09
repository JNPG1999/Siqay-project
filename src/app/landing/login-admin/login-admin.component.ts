import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { log } from 'console';


interface LoginForm {
  email: FormControl<null | string>;
  password: FormControl<null | string>;
}

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.scss'
})
export class LoginAdminComponent {

  _loginService = inject(LoginService);
  _formBuilder = inject(FormBuilder);
  _router = inject(Router);
  
  loginForm = this._formBuilder.group<LoginForm>({
    email : new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required])
  })

  async logIn(){

    console.log(this.loginForm.value)

    if (this.loginForm.invalid) return;
    
    try{
      const {error,data} = await this._loginService.logIn({
        email: this.loginForm.value.email ?? '',
        password: this.loginForm.value.password ?? ''
      })

      if (error) throw error;

      console.log(data)

      this._router.navigateByUrl('/dashboard')

    }catch(error){
      if (error instanceof Error) {
        console.log('Error: ', error);
      }
    }


  }


}
