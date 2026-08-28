import { Service, signal } from '@angular/core';
import { faresType, FlightDetails } from '../../home/model/types';

@Service()
export class FlightCardService {
  FareViewModal = signal<FlightDetails | null>(null);
  showFlightDetailsModel = signal<boolean>(false);
  selectedFlight = signal<FlightDetails | null>(null);

  proceedToSeatSelection(selectedFlight: { Selectedfare: faresType; flight: FlightDetails }): void {
    console.log(selectedFlight);
  }
}
