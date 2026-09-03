export type TripTypeOption = 'one-way' | 'round-trip';

export interface CabinFeature {
  feature: string;
  icon: string;
}

export interface FareFilterCategory {
  id: string;
  title: string;
  subtitle: string;
  badge?: string | null;
  hoverContent: string;
}

export interface CabinOption {
  id: number;
  name: string;
  features: CabinFeature[];
  icon: string;
}

export interface AirportType {
  code: string;
  name: string; // City / General Name (e.g., 'Kolkata')
  airport: string; // Full Airport Name with Terminal (e.g., 'Netaji Subhas Chandra Bose International Airport')
}

export interface BaggageAllowance {
  cabin: string; // e.g., '7 KGS/Adult'
  checkIn: string; // e.g., '15 KGS/Adult'
}

export interface LayoverAirport extends AirportType {
  layoverDuration: string;
  arrivalTime: string; // Arrival time at layover (e.g., '13:40')
  arrivalDate: string; // e.g., 'Sun, 30 May'
  departureTime: string; // Departure time from layover (e.g., '14:50')
  departureDate: string; // e.g., 'Sun, 30 May'
}

export type faresType = {
  id: string;
  title: string;
  subtitle?: string;
  priceINR: number;
  features: string[];
  badge?: string | null;
  hoverContent?: string;
};

export interface FlightDetails {
  flightNumber: string;
  airlineName: string;
  airlineLogo: string;
  departureTime: string;
  departureDate: string; // e.g., 'Sun, 30 May'
  arrivalTime: string;
  arrivalDate: string; // e.g., 'Sun, 30 May'
  departureAirport: AirportType;
  arrivalAirport: AirportType;
  duration: string;
  stops: string;
  stopsCount: number;
  stopLocation?: string;
  stopAirports?: LayoverAirport[];
  baggage: BaggageAllowance;
  onTimePercentage: number;
  priceINR: number;
  promoCode?: string;
  discountText?: string;
  fareOptions: faresType[];
}
