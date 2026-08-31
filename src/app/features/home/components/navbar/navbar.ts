import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { lucideHeart, lucideLuggage, lucideMenu, lucideX } from '@ng-icons/lucide';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { NgOptimizedImage } from '@angular/common';
import { Avatar } from '../avtaar/avtaar';
import { Auth } from '../../../Auth/auth';
import { FlightSearchService } from '../../flight-search/service/flight-search';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, Avatar, NgIcon, NgOptimizedImage],
  providers: [provideIcons({ lucideHeart, lucideLuggage, lucideMenu, lucideX })],
  template: `
    <nav
      class="fixed top-0 left-0 w-full z-50 transition-transform duration-300"
      [class.-translate-y-full]="isHidden()"
    >
      <div
        class="max-w-7xl mx-auto w-[95%] sm:w-[90%] lg:w-[70%] h-14 sm:h-15 flex justify-between items-center px-3 sm:px-4 bg-black/40 my-1 rounded-xl backdrop-blur-md"
      >
        <!-- Logo Section -->
        <a routerLink="">
          <div class="h-9 sm:h-12 flex items-center">
            <img
              ngSrc="/logo.png"
              alt="Company Logo"
              class="object-contain h-full w-auto"
              priority
              width="1406"
              height="440"
            />
          </div>
        </a>

        <!-- Desktop Navigation Actions -->
        <div class="hidden md:flex items-center justify-end gap-3 lg:gap-5">
          <!-- My Trips -->
          <a
            routerLink="/mytrip"
            class="inline-flex items-center text-gray-200 hover:text-red-500 transition-colors font-medium group gap-2 border-r-2 pr-3 lg:pr-5 border-white/20 border-dashed"
          >
            <div
              class="bg-white/20 rounded-full w-8 h-8 p-1 flex items-center justify-center shrink-0"
            >
              <ng-icon
                name="lucideLuggage"
                class="text-gray-700 [&>svg]:fill-yellow-500 [&>svg]:stroke-gray-700"
                size="20"
              />
            </div>
            <div class="flex flex-col">
              <span class="text-[12px] text-white font-semibold leading-tight">My Trips</span>
              <span class="text-[11px] text-white/80 leading-tight">Manage Your Bookings</span>
            </div>
          </a>

          <!-- Wishlist -->
          <a
            routerLink="wishlist"
            class="inline-flex items-center gap-2 text-gray-200 hover:text-red-500 transition-colors font-medium group border-r-2 pr-3 lg:pr-5 border-white/20 border-dashed"
          >
            <div
              class="bg-white/20 rounded-full w-8 h-8 p-1 flex items-center justify-center shrink-0"
            >
              <ng-icon
                name="lucideHeart"
                class="text-red-500 [&>svg]:fill-red-500 [&>svg]:stroke-red-500"
              />
            </div>

            <div class="flex flex-col">
              <span class="text-[12px] text-white font-semibold leading-tight">Wishlist</span>
              <span class="text-[11px] text-white/80 leading-tight">Save favourites</span>
            </div>
          </a>

          <!-- Login Button / Avatar -->
          @if (isLoggedIn) {
            <spartan-avatar></spartan-avatar>
          } @else {
            <div>
              <button
                hlmBtn
                variant="outline"
                size="lg"
                (click)="showLoginModel.set(true)"
                class="text-white hover:text-white active:scale-[0.9]! text-[12px] flex justify-center items-center cursor-pointer gap-1 px-3 sm:px-4 py-2 sm:py-2.5 border-0 font-bold rounded-xl bg-linear-to-r from-blue-400 to-blue-600 hover:opacity-80 transition-opacity"
              >
                Login or Create Account
              </button>
            </div>
          }
        </div>

        <!-- Mobile Controls (Avatar/Login + Hamburger toggle) -->
        <div class="flex items-center gap-2 md:hidden">
          @if (isLoggedIn) {
            <spartan-avatar></spartan-avatar>
          }

          <button
            type="button"
            (click)="toggleMobileMenu()"
            class="p-1.5 text-white hover:text-gray-300 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <ng-icon [name]="isMobileMenuOpen() ? 'lucideX' : 'lucideMenu'" size="24" />
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      @if (isMobileMenuOpen()) {
        <div
          class="md:hidden max-w-7xl mx-auto w-[95%] bg-black/90 rounded-xl mt-1 p-4 flex flex-col gap-4 border border-white/10 shadow-xl backdrop-blur-md"
        >
          <a
            routerLink="/mytrip"
            (click)="closeMobileMenu()"
            class="flex items-center gap-3 text-white hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-white/10"
          >
            <div
              class="bg-white/20 rounded-full w-8 h-8 p-1 flex items-center justify-center shrink-0"
            >
              <ng-icon
                name="lucideLuggage"
                class="text-gray-700 [&>svg]:fill-yellow-500 [&>svg]:stroke-gray-700"
                size="20"
              />
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-semibold">My Trips</span>
              <span class="text-xs text-white/70">Manage Your Bookings</span>
            </div>
          </a>

          <a
            routerLink="wishlist"
            (click)="closeMobileMenu()"
            class="flex items-center gap-3 text-white hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-white/10"
          >
            <div
              class="bg-white/20 rounded-full w-8 h-8 p-1 flex items-center justify-center shrink-0"
            >
              <ng-icon
                name="lucideHeart"
                class="text-red-500 [&>svg]:fill-red-500 [&>svg]:stroke-red-500"
              />
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-semibold">Wishlist</span>
              <span class="text-xs text-white/70">Save favourites</span>
            </div>
          </a>

          @if (!isLoggedIn) {
            <button
              hlmBtn
              variant="outline"
              size="lg"
              (click)="openLoginFromMobile()"
              class="w-full text-white active:scale-[0.98] text-xs flex justify-center items-center cursor-pointer py-2.5 border-0 font-bold rounded-xl bg-linear-to-r from-blue-400 to-blue-600 hover:opacity-90 transition-opacity"
            >
              Login or Create Account
            </button>
          }
        </div>
      }
    </nav>
  `,
})
export class Navbar {
  private readonly auth = inject(Auth);
  private readonly flightService = inject(FlightSearchService);

  showLoginModel = this.auth.showLoginModal;
  isLoggedIn = this.auth.isLoggedIn();
  isHidden = this.flightService.isHidden;

  isMobileMenuOpen = signal<boolean>(false);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((val) => !val);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  openLoginFromMobile(): void {
    this.closeMobileMenu();
    this.showLoginModel.set(true);
  }
}
