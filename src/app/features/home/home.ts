import { Component, HostListener, signal } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { FlightSearch } from './flight-search/flight-search';

@Component({
  imports: [Navbar, FlightSearch],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  lastScrollY = signal<number>(0);
  isHidden = signal<boolean>(false);

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
