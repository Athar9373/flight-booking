import { Component, computed, effect, input, output, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideHeart, lucideChevronDown, lucideMoveRight } from '@ng-icons/lucide';
import { FlightDetails } from '../home/model/types';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { FlightDetailsModel } from './components/flight-details-model/flight-details-model';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [CommonModule, NgIcon, HlmButtonImports, FlightDetailsModel, CurrencyPipe],
  providers: [
    provideIcons({
      lucideHeart,
      lucideChevronDown,
      lucideMoveRight,
    }),
  ],
  templateUrl: './flight-card.html',
  styleUrls: ['./flight-card.css'],
})
export class FlightCard {
  flightData = input.required<FlightDetails>();
  showFlightDetailsModel = signal<boolean>(false);

  // Computed helper for safe stops collection
  stopAirportsList = computed(() => this.flightData().stopAirports || []);

  // Dynamically builds the stop label (e.g., "Non-stop", "1 stop • DEL", "3 stops • DEL, BOM, MAA")
  stopsSummary = computed(() => {
    const stops = this.stopAirportsList();
    if (stops.length === 0) {
      return 'Non-stop';
    }
    const countText = `${stops.length} ${stops.length === 1 ? 'stop' : 'stops'}`;
    const codesText = stops.map((s) => s.code).join(', ');
    return `${countText} • ${codesText}`;
  });
}
