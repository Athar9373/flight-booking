import { Component, computed, inject, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeftRight } from '@ng-icons/lucide';
import { CityPopover } from '../components/city-popover/city-popover';
import { DepartureDatePicker } from '../components/departue-date-picker/departue-date-picker';
import { ReturnDatePicker } from '../components/return-date-picker/return-date-picker';
import { Travellers } from '../components/travellers/travellers';
import { CabinClassPopover } from '../components/cabin-class-popover/cabin-class-popover';
import { SpecialFares } from '../components/special-fares/special-fares';
import { TripType } from '../components/trip-type/trip-type';
import { AirportType, TripTypeOption } from '../model/types';
import { FlightSearchService } from './service/flight-search';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [
    TripType,
    CityPopover,
    NgIcon,
    DepartureDatePicker,
    ReturnDatePicker,
    Travellers,
    CabinClassPopover,
    SpecialFares,
    CabinClassPopover,
  ],
  providers: [
    provideIcons({
      lucideArrowLeftRight,
    }),
  ],
  templateUrl: './flight-search.html',
})
export class FlightSearch {
  flightSearchService = inject(FlightSearchService);
  startDate = this.flightSearchService.startDate;

  endDate = this.flightSearchService.endDate;

  fromCity = this.flightSearchService.fromCity;

  toCity = this.flightSearchService.toCity;

  onFromCityChange(city: AirportType) {
    this.fromCity.set(city);
  }

  onToCityChange(city: AirportType) {
    this.toCity.set(city);
  }

  swapCities() {
    const currentFrom = this.fromCity();

    this.fromCity.set(this.toCity());
    this.toCity.set(currentFrom);
  }

  setStartDate(date: Date): void {
    this.startDate.set(date);
    console.log(this.startDate());
    console.log(this.endDate());

    const endDate = new Date(this.startDate());
    endDate.setDate(endDate.getDate() + 1);

    this.endDate.set(endDate);
  }

  onSearch() {
    this.flightSearchService.onSearch();
  }
}
