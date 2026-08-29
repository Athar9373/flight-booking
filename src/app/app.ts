import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlightSearchService } from './features/home/flight-search/service/flight-search';
import { Auth } from './features/Auth/auth';
import { Login } from './features/Auth/login-model/login-model';
import { Signup } from './features/Auth/signup/signup';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, Signup],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('MakeMyTrip - #1 Flight Booking App');

  //Auth
  AuthService = inject(Auth);
  readonly isLoggedIn = this.AuthService.isLoggedIn;
  readonly showLoginModal = this.AuthService.showLoginModal;
  readonly showSignUpModal = this.AuthService.showSignUpModal;
}
