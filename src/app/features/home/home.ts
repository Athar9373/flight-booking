import { Component, inject } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { FlightSearch } from './flight-search/flight-search';
import { FlightCard } from '../flight-card/flight-card';
import { FlightApi } from '../../core/api/flight-api';

@Component({
  imports: [Navbar, FlightSearch, FlightCard],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  flightService = inject(FlightApi);

  flightData = this.flightService.flightDetails;
}
