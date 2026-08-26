import { Component, inject } from '@angular/core';
import { Navbar } from '../../home/components/navbar/navbar';
import { Button } from '../../home/components/button/button';
import { Router } from '@angular/router';
import { FlightSearch } from '../../home/flight-search/flight-search';

@Component({
  imports: [Button, FlightSearch, Navbar],
  selector: 'app-page-not-found',
  styleUrl: './page-not-found.css',
  template: `
    <div>
      <app-navbar></app-navbar>
      <app-flight-search class=""></app-flight-search>
      <div class="flex justify-center relative z-10 -mt-30 flex-col gap-5 items-center">
        <img
          src="https://jsak.mmtcdn.com/pwa_v3/pwa_commons/build/client/images/404.3bdd0da4.png"
          alt="Page Not Found"
          class="h-45 w-auto object-contain -top-25"
        />
        <div class="flex justify-center flex-col items-center">
          <h1 class="text-3xl text-center text-sans font-bold">Page not found !</h1>
          <p class="text-muted-foreground text-sm">
            With MakeMyTrip you can go anywhere. But first you need to go back to the homepage.
          </p>
        </div>
        <spartan-button
          buttonName="Go back"
          (actionTriggered)="HomePageRedirect()"
        ></spartan-button>
      </div>
    </div>
  `,
})
export class PageNotFound {
  private router = inject(Router);

  HomePageRedirect() {
    this.router.navigateByUrl('');
  }
}
