import { Service, signal } from '@angular/core';

export type LoginFormType = { email: string; password: string };

@Service()
export class Auth {
  isLoggedIn = signal<boolean>(false);

  Login(data: LoginFormType) {
    console.log(data);
    this.isLoggedIn.set(true);
  }
  Logout() {}
  SignUp() {}
}
