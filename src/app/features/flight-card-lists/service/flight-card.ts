import { input, Service, signal } from '@angular/core';
import { FlightDetails } from '../../home/model/types';

@Service()
export class FlightCardService {
  FareViewModal = signal<FlightDetails | null>(null);
  showFlightDetailsModel = signal<boolean>(false);
  selectedFlight = signal<FlightDetails | null>(null);
}
