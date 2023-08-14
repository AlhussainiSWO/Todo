import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { UserService } from 'src/app/domain/user/user.service';
import { User } from 'src/app/domain/user/user';
import { LoginRequest } from 'src/app/domain/login-request/login-request';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  activeForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService
  ) {
    this.setupLoginForm();
    this.setupRegisterForm();
    this.activeForm = this.loginForm;
  }

  login() {
    const loginRequest: LoginRequest = {
      userName: this.email,
      password: this.password,
    };
    this._userService.loginUser(loginRequest).subscribe();
  }

  register() {
    const user: User = {
      id: '',
      email: this.email,
      userName: this.userName,
      password: this.password,
    };
    this._userService.registerUser(user).subscribe();
  }

  changeActiveForm() {
    if (this.activeForm === this.loginForm) {
      console.log('register')
      this.activeForm = this.registerForm;
    } else {
      this.activeForm = this.loginForm;
    }
  }

  setupLoginForm() {
    this.loginForm = this._formBuilder.group({
      email: [],
      password: [],
      stayLoggedIn: [],
    });
  }

  setupRegisterForm() {
    this.registerForm = this._formBuilder.group({
      email: [],
      userName: [],
      password: [],
      confirmPassword: [],
    });
  }

  get email() {
    return this.activeForm.get('email')!.value;
  }

  get userName() {
    return this.activeForm.get('userName')!.value;
  }

  get password() {
    return this.activeForm.get('password')!.value;
  }

  get confirmPassword() {
    return this.activeForm.get('confirmPassword')!.value;
  }

  get stayLoggedIn() {
    return this.activeForm.get('stayLoggedIn')!.value;
  }
}

