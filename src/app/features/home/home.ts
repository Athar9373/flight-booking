import { Component, inject } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { FlightSearch } from './flight-search/flight-search';
import { FlightCardList } from '../flight/flight-cards-list';
import { FlightSortTabs } from '../flight/components/flight-sort-tabs/flight-sort-tabs';
import { DayViewMiniGrid } from '../flight/components/day-view-mini-grid/day-view-mini-grid';
import { FlightCard } from '../flight/components/flight-card/flight-card';
import { StopsFilter } from '../flight/components/fliters/stops-filter/stops-filter';

@Component({
  imports: [Navbar, FlightSearch, FlightCardList, FlightSortTabs, DayViewMiniGrid, StopsFilter],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
