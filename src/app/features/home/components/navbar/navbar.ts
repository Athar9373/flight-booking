import { Component, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { lucideHeart, lucideLuggage } from '@ng-icons/lucide';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { NgOptimizedImage } from '@angular/common';
import { Login } from '../../../Auth/login-model/login-model';
import { Avatar } from '../avtaar/avtaar';
import { Auth } from '../../../Auth/auth';
import { FlightSearchService } from '../../flight-search/service/flight-search';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, Avatar, NgIcon, NgOptimizedImage, Login],
  providers: [provideIcons({ lucideHeart, lucideLuggage })],
  template: `
    <nav
      class="fixed top-0 left-0 w-full z-50  transition-transform duration-300"
      [class.-translate-y-full]="isHidden()"
    >
      <div
        class="max-w-7xl mx-auto w-[90%] lg:w-[70%] h-15 flex justify-between items-center px-4 bg-black/40 my-1 rounded-xl"
      >
        <!-- Logo Section -->
        <a routerLink="">
          <div class="h-12 ">
            <img
              ngSrc="/logo.png"
              alt="Company Logo"
              class="object-contain h-full w-full"
              priority
              width="1406"
              height="440"
            />
          </div>
        </a>

        <!-- Navigation Actions -->
        <div class="flex items-center justify-end gap-5 ">
          <!-- My Trips -->
          <a
            routerLink="/mytrip"
            class="inline-flex items-center text-gray-200 hover:text-red-500 transition-colors font-medium group gap-2 border-r-2 pr-5 border-white/20 border-dashed"
          >
            <div class="bg-white/20 rounded-full w-8 h-8 p-1 flex items-center justify-center">
              <ng-icon
                name="lucideLuggage"
                class="text-gray-700 [&>svg]:fill-yellow-500 [&>svg]:stroke-gray-700"
                size="20"
              />
            </div>
            <div class="flex flex-col">
              <span class="text-[12px] text-white font-semibold">My Trips</span>
              <span class="text-[11px] text-white/80">Manage Your Bookings</span>
            </div>
          </a>

          <!-- Wishlist -->
          <a
            routerLink="wishlist"
            class="inline-flex items-center gap-2 text-gray-200 hover:text-red-500 transition-colors font-medium group border-r-2 pr-5 border-white/20 border-dashed"
          >
            <div class="bg-white/20 rounded-full w-8 h-8 p-1 flex items-center justify-center">
              <ng-icon
                name="lucideHeart"
                class="text-red-500 [&>svg]:fill-red-500 [&>svg]:stroke-red-500"
              />
            </div>

            <div class="flex flex-col">
              <span class="text-[12px] text-white font-semibold">Wishlist</span>
              <span class="text-[11px] text-white/80">Save favourites</span>
            </div>
          </a>

          <!-- Login Button -->
          @if (isLoggedIn) {
            <spartan-avatar></spartan-avatar>
          } @else {
            <div>
              <button
                hlmBtn
                variant="outline"
                size="lg"
                (click)="showLoginModel.set(true)"
                class="text-white hover:text-white active:scale-[0.9]! text-[12px] flex justify-center items-center cursor-pointer gap-1 px-4 py-2.5 border-0 font-bold rounded-xl bg-linear-to-r from-blue-400 to-blue-600 hover:opacity-80 transition-opacity"
              >
                Login or Create Account
              </button>
            </div>
          }
        </div>
      </div>
    </nav>
    @if (showLoginModel() && !isLoggedIn) {
      <login-model [(showLoginModel)]="showLoginModel"></login-model>
    }
  `,
})
export class Navbar {
  private readonly auth = inject(Auth);
  private readonly flightService = inject(FlightSearchService);
  showLoginModel = signal<boolean>(false);

  isLoggedIn = this.auth.isLoggedIn();

  isHidden = this.flightService.isHidden;
}
