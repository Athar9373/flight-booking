import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { provideIcons } from '@ng-icons/core';
import { lucideHeart, lucideChevronDown, lucideMoveRight, lucideChevronUp } from '@ng-icons/lucide';
import { faresType, FlightDetails } from '../home/model/types';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { FlightDetailsModel } from './components/flight-details-model/flight-details-model';
import { FlightCardService } from './service/flight-card';
import { FlightApi } from '../../core/api/flight-api';
import { FlightCard } from './components/flight-card/flight-card';
import { FaresView } from './components/fares-view/fares-view';
import { Router } from '@angular/router';
import { DayViewMiniGrid } from './components/day-view-mini-grid/day-view-mini-grid';
import { FlightSortTabs } from './components/flight-sort-tabs/flight-sort-tabs';

@Component({
  selector: 'app-flight-card-list',
  standalone: true,
  imports: [
    CommonModule,
    HlmButtonImports,
    FlightDetailsModel,
    FlightCard,
    FaresView,
    DayViewMiniGrid,
    FlightSortTabs,
  ],
  providers: [
    provideIcons({
      lucideHeart,
      lucideChevronDown,
      lucideMoveRight,
      lucideChevronUp,
    }),
  ],
  templateUrl: './flight-cards-list.html',
})
export class FlightCardList {
  flightCardService = inject(FlightCardService);
  FareViewModal = this.flightCardService.FareViewModal;
  flightData = inject(FlightApi).flightDetails;
  showFlightDetailsModel = this.flightCardService.showFlightDetailsModel;
  selectedFlight = this.flightCardService.selectedFlight;
  router = inject(Router);

  proceedToSeatSelection = this.flightCardService.proceedToSeatSelection;

  onFlightSelectFromCard(flight: FlightDetails) {
    this.selectedFlight.set(flight);
  }

  onFlightSelectFromModal(flight: FlightDetails): void {
    this.selectedFlight.set(null);
  }

  onFaresViewClick(flightData: FlightDetails): void {
    this.FareViewModal.set(flightData);
  }

  SeatSelection(selectedFlight: { Selectedfare: faresType; flight: FlightDetails }): void {
    this.proceedToSeatSelection(selectedFlight);
    this.router.navigateByUrl('/booking');
  }
}
