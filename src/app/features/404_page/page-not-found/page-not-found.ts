import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from '../../home/components/button/button';
import { Navbar } from '../../home/components/navbar/navbar';
import { FlightSearch } from '../../home/flight-search/flight-search';

@Component({
  imports: [Button, FlightSearch, Navbar],
  selector: 'app-page-not-found',
  styleUrl: './page-not-found.css',
  template: `
    <div class="min-h-screen flex flex-col w-full bg-transperant overflow-x-hidden">
      <!-- Navbar -->
      <app-navbar class="w-full z-20"></app-navbar>

      <!-- Flight Search Container -->
      <div class="w-full relative z-10">
        <app-flight-search></app-flight-search>
      </div>

      <!-- 404 Content Container -->
      <main
        class="relative z-20 flex-1 flex flex-col justify-center items-center text-center px-4 py-8 sm:py-12 -mt-16 sm:-mt-24 md:-mt-28"
      >
        <div
          class="max-w-md sm:max-w-lg flex flex-col items-center gap-4 sm:gap-6  sm:mb-10  p-6 sm:p-0 rounded-2xl  sm:shadow-none"
        >
          <!-- 404 Graphic -->
          <img
            src="https://jsak.mmtcdn.com/pwa_v3/pwa_commons/build/client/images/404.3bdd0da4.png"
            alt="Page Not Found"
            class="h-32 sm:h-44 md:h-52 w-auto object-contain drop-shadow-md"
          />

          <!-- Text Block -->
          <div class="flex flex-col items-center gap-1.5 sm:gap-2">
            <h1
              class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight"
            >
              Page not found !
            </h1>

            <p class="text-xs sm:text-sm text-slate-500 max-w-xs sm:max-w-sm leading-relaxed">
              With MakeMyTrip you can go anywhere. But first you need to go back to the homepage.
            </p>
          </div>

          <!-- Action Button -->
          <spartan-button
            buttonName="Go back"
            (actionTriggered)="HomePageRedirect()"
            class="mt-2 sm:mt-4"
          ></spartan-button>
        </div>
      </main>
    </div>
  `,
})
export class PageNotFound {
  private router = inject(Router);

  HomePageRedirect() {
    this.router.navigateByUrl('');
  }
}
