import { Component, computed, input, output } from '@angular/core';
import { FlightDetails } from '../../../home/model/types';

export interface FlightSegment {
  departureTime: string;
  departureDate: string;
  departureAirport: { code: string; name: string; airport: string };
  arrivalTime: string;
  arrivalDate: string;
  arrivalAirport: { code: string; name: string; airport: string };
  layoverAfter?: {
    duration: string;
    locationName: string;
  };
}

@Component({
  imports: [],
  selector: 'app-flight-details-model',
  styleUrl: './flight-details-model.css',
  template: `
    <div
      class="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4 overflow-y-auto border-white backdrop-blur-sm"
      (click)="closeModal.emit()"
    >
      <div class="flex justify-center flex-col items-center gap-3">
        <div class="w-screen flex justify-center items-center "><ng-content></ng-content></div>
        <div
          class="bg-white flex flex-col gap-4 p-6 rounded-xl w-full max-w-3xl shadow-2xl max-h-[60vh] overflow-y-auto"
          (click)="$event.stopPropagation()"
        >
          <!-- Modal Header -->
          <div class="flex justify-between items-center">
            <h1 class="text-xl font-bold text-gray-800">Flight Details</h1>
            <button
              type="button"
              class="text-gray-400 hover:text-gray-600 font-bold text-xl px-2 transition-colors cursor-pointer sticky top-0"
              (click)="closeModal.emit()"
            >
              ✕
            </button>
          </div>

          <!-- Dynamic Segments Loop (Supports Direct, 1-Stop, Multi-Stops) -->
          @for (segment of flightSegments(); track $index) {
            <div
              class="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row gap-6 items-stretch bg-gray-50/50"
            >
              <!-- Timeline & Details -->
              <div class="flex-1 grid grid-cols-[100px_auto_1fr] gap-x-6 items-center">
                <!-- Segment Departure -->
                <div class="text-right">
                  <h2 class="text-xl font-bold text-gray-900 leading-none">
                    {{ segment.departureTime }}
                  </h2>
                  <p class="text-xs text-gray-500 font-medium mt-1">
                    {{ segment.departureDate }}
                  </p>
                </div>

                <div class="flex justify-center items-center py-1">
                  <div
                    class="bg-blue-400 rounded-full w-3.5 h-3.5 flex justify-center items-center shrink-0"
                  >
                    <div class="bg-white rounded-full w-2 h-2"></div>
                  </div>
                </div>

                <div>
                  <h2 class="text-xl font-bold text-gray-900 leading-tight">
                    {{ segment.departureAirport.name }}
                    <span class="text-sm font-semibold text-gray-500"
                      >({{ segment.departureAirport.code }})</span
                    >
                  </h2>
                  <p class="text-sm text-gray-500 mt-0.5 font-light">
                    {{ segment.departureAirport.airport }}
                  </p>
                </div>

                <!-- Mid Flight Info -->
                <div class="text-right">
                  <span class="text-[15px] font-medium text-gray-500 inline-block">
                    {{ flightData().duration }}
                  </span>
                </div>

                <div class="flex flex-col items-center justify-center self-stretch flex-1">
                  <div class="w-0.5 min-h-6 flex-1 bg-blue-300 "></div>
                  <img
                    [src]="flightData().airlineLogo"
                    [alt]="flightData().airlineName"
                    class="h-7 w-7 rounded-md object-contain my-1 p-0.5 border bg-white shadow-xs shrink-0"
                  />
                  <div class="w-0.5 min-h-6 flex-1 bg-blue-300"></div>
                </div>

                <div class="py-4">
                  <p class="text-xs font-semibold text-gray-600 inline-block">
                    {{ flightData().airlineName }} • {{ flightData().flightNumber }}
                    @if (flightData().stopsCount === 0) {
                      • {{ flightData().stops }}
                    }
                  </p>
                </div>

                <!-- Segment Arrival -->
                <div class="text-right">
                  <h2 class="text-xl font-bold text-gray-900 leading-none">
                    {{ segment.arrivalTime }}
                  </h2>
                  <p class="text-xs text-gray-500 font-medium mt-1">
                    {{ segment.arrivalDate }}
                  </p>
                </div>

                <div class="flex justify-center items-center py-1">
                  <div
                    class="bg-blue-400 rounded-full w-3.5 h-3.5 flex justify-center items-center shrink-0"
                  >
                    <div class="bg-white rounded-full w-2 h-2"></div>
                  </div>
                </div>

                <div>
                  <h2 class="text-xl font-bold text-gray-900 leading-tight">
                    {{ segment.arrivalAirport.name }}
                    <span class="text-sm font-semibold text-gray-500"
                      >({{ segment.arrivalAirport.code }})</span
                    >
                  </h2>
                  <p class="text-sm text-gray-500 mt-0.5 font-light">
                    {{ segment.arrivalAirport.airport }}
                  </p>
                </div>
              </div>

              <!-- Baggage Column -->
              <div
                class="w-full md:w-64 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6 flex flex-col justify-center gap-1"
              >
                <h3 class="text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Baggage Allowance
                </h3>
                <div
                  class="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-gray-100"
                >
                  <img
                    src="https://imgak.mmtcdn.com/flights/assets/media/dt/listing/cabin_baggage_revamp.webp"
                    alt="Cabin Baggage"
                    class="w-5 h-5 object-contain"
                  />
                  <div class="flex flex-col">
                    <span class="text-xs text-gray-500 font-medium">Cabin Baggage</span>
                    <span class="text-xs font-bold text-gray-800">{{
                      flightData().baggage.cabin
                    }}</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-gray-100"
                >
                  <img
                    src="https://imgak.mmtcdn.com/flights/assets/media/dt/listing/checkin_revamp.webp"
                    alt="Check-in Baggage"
                    class="w-5 h-5 object-contain"
                  />
                  <div class="flex flex-col">
                    <span class="text-xs text-gray-500 font-medium">Check-in Baggage</span>
                    <span class="text-xs font-bold text-gray-800">{{
                      flightData().baggage.checkIn
                    }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- LAYOVER CONNECTOR BAND (Renders dynamically between segments) -->
            @if (segment.layoverAfter) {
              <div class="flex items-center gap-6   px-6">
                <div class="w-25 shrink-0"></div>
                <div class="w-3.5 flex justify-center shrink-0">
                  <div class="border-l-2 border-dashed border-blue-400 h-12"></div>
                </div>
                <div
                  class="bg-amber-50 border border-amber-200 text-amber-900 px-4  rounded-lg text-sm font-semibold flex items-center gap-2"
                >
                  <span>{{ segment.layoverAfter.duration }} Layover</span>
                  <span>•</span>
                  <span class="font-bold">
                    Change of Plane at {{ segment.layoverAfter.locationName }}
                  </span>
                </div>
              </div>
            }
          }
        </div>
      </div>
    </div>
  `,
})
export class FlightDetailsModel {
  flightData = input.required<FlightDetails>();
  closeModal = output<void>();
  // Signal computed property to map any N number of stops into flight legs dynamically
  flightSegments = computed<FlightSegment[]>(() => {
    const flight = this.flightData();
    const stops = flight.stopAirports || [];

    // If direct flight, return 1 single segment
    if (stops.length === 0) {
      return [
        {
          departureTime: flight.departureTime,
          departureDate: flight.departureDate,
          departureAirport: flight.departureAirport,
          arrivalTime: flight.arrivalTime,
          arrivalDate: flight.arrivalDate,
          arrivalAirport: flight.arrivalAirport,
        },
      ];
    }

    const segments: FlightSegment[] = [];

    // Segment 1: Departure -> Stop 1
    segments.push({
      departureTime: flight.departureTime,
      departureDate: flight.departureDate,
      departureAirport: flight.departureAirport,
      arrivalTime: stops[0].arrivalTime,
      arrivalDate: stops[0].arrivalDate,
      arrivalAirport: stops[0],
      layoverAfter: {
        duration: stops[0].layoverDuration,
        locationName: stops[0].name,
      },
    });

    // Intermediate Segments: Stop[i] -> Stop[i+1]
    for (let i = 0; i < stops.length - 1; i++) {
      const currentStop = stops[i];
      const nextStop = stops[i + 1];

      segments.push({
        departureTime: currentStop.departureTime,
        departureDate: currentStop.departureDate,
        departureAirport: currentStop,
        arrivalTime: nextStop.arrivalTime,
        arrivalDate: nextStop.arrivalDate,
        arrivalAirport: nextStop,
        layoverAfter: {
          duration: nextStop.layoverDuration,
          locationName: nextStop.name,
        },
      });
    }

    // Final Segment: Last Stop -> Final Destination
    const lastStop = stops[stops.length - 1];
    segments.push({
      departureTime: lastStop.departureTime,
      departureDate: lastStop.departureDate,
      departureAirport: lastStop,
      arrivalTime: flight.arrivalTime,
      arrivalDate: flight.arrivalDate,
      arrivalAirport: flight.arrivalAirport,
    });

    return segments;
  });
}
