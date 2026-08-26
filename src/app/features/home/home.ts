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
}
