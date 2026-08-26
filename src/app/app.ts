import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlightSearchService } from './features/home/flight-search/service/flight-search';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('MakeMyTrip - #1 Flight Booking App');
  flightService = inject(FlightSearchService);
  lastScrollY = signal<number>(0);
  isHidden = this.flightService.isHidden;

  @HostListener('window:scroll')
  onScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > this.lastScrollY() && currentScrollY > 100) {
      // Scrolling down
      this.isHidden.set(true);
    } else {
      // Scrolling up
      this.isHidden.set(false);
    }

    this.lastScrollY.set(currentScrollY);
  }
}
