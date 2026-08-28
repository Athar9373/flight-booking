import { Component, computed, inject, input, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideHeart, lucideChevronDown, lucideMoveRight, lucideChevronUp } from '@ng-icons/lucide';
import { FlightDetails } from '../home/model/types';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { FlightDetailsModel } from './components/flight-details-model/flight-details-model';
import { FlightCardService } from './service/flight-card';
import { FlightApi } from '../../core/api/flight-api';
import { FlightCard } from './components/flight-card/flight-card';

@Component({
  selector: 'app-flight-card-list',
  standalone: true,
  imports: [CommonModule, HlmButtonImports, FlightDetailsModel, FlightCard],
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

  onFlightSelectFromCard(flight: FlightDetails) {
    this.selectedFlight.set(flight);
  }

  onFlightSelectFromModal(flight: FlightDetails): void {
    this.selectedFlight.set(null);
  }

  onFareViewClick(flightData: FlightDetails): void {
    this.FareViewModal.set(flightData);
  }
}
