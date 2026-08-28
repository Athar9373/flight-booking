import { Component, inject } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { FlightSearch } from './flight-search/flight-search';
import { FlightCardList } from '../flight-card-lists/flight-cards-list';

@Component({
  imports: [Navbar, FlightSearch, FlightCardList],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
