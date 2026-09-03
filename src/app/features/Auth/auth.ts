import { Service, signal } from '@angular/core';
import { LoginFormType, SignupFormType } from './model/AuthTypes';

@Service()
export class Auth {
  isLoggedIn = signal<boolean>(false);
  showLoginModal = signal<boolean>(false);
  showSignUpModal = signal<boolean>(false);
  showForgotPasswordModal = signal<boolean>(false);

  Login(data: LoginFormType) {
    console.log(data);
  }
  Logout() {}
  Signup(formData: SignupFormType) {
    console.log(formData);
  }
}
