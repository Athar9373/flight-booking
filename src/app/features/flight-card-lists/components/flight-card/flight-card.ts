import { Component, input, output } from '@angular/core';
import { FlightDetails } from '../../../home/model/types';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { lucideChevronDown, lucideHeart, lucideMoveRight } from '@ng-icons/lucide';

@Component({
  imports: [CommonModule, NgIcon, HlmButtonImports, CurrencyPipe],
  providers: [
    provideIcons({
      lucideHeart,
      lucideChevronDown,
      lucideMoveRight,
    }),
  ],
  selector: 'app-flight-card',
  styleUrl: './flight-card.css',
  template: ` <div class="flex items-center justify-center min-w-3xl">
    <div
      class="flex w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl p-2"
    >
      <!-- ================= LEFT: FLIGHT DETAILS ================= -->
      <div class="w-full flex-1 border-r-2 border-gray-300 px-5 py-3 border-dashed">
        <!-- Airline Header -->
        <div class="mb-2">
          <p class="text-xs font-semibold text-gray-700">{{ flightData().airlineName }}</p>
        </div>

        <!-- Flight Details -->
        <div class="flex items-center gap-x-4">
          <!-- Airline Logo -->
          <img
            [src]="flightData().airlineLogo"
            alt="Air India logo"
            class="h-12 w-12 shrink-0 rounded-md object-contain"
          />

          <!-- Flight Route -->
          <div class="flex min-w-0 flex-1 items-center justify-center gap-5">
            <!-- Departure -->
            <div class="shrink-0 text-right">
              <h2 class="text-2xl font-medium text-gray-900">{{ flightData().departureTime }}</h2>
              <p class="text-[16px] font-light text-muted-foreground">
                {{ flightData().departureAirport.code }}
              </p>
            </div>

            <!-- ================= TIMELINE ================= -->
            <div class="flex min-w-30 max-w-30 flex-1 flex-col items-center">
              <!-- Duration -->
              <p class="text-xs text-muted-foreground">{{ flightData().duration }}</p>

              <!-- Timeline -->
              <div class="flex w-full items-center">
                <!-- Left Line -->
                <div class="h-0.5 flex-1 rounded-full bg-gray-300"></div>

                <!-- Stop -->
                @if (flightData().stops !== 'Non-stop') {
                  <div
                    class="h-2 w-2 shrink-0 rounded-full bg-red-500 translate-x-2.5"
                    title="1 stop at Delhi"
                  ></div>

                  <!-- Right Line -->
                  <div class="h-0.5 flex-1 rounded-full bg-gray-300"></div>
                }

                <!-- Plane -->
                <div class="ml-2 h-3.5 w-3.5 shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 12 12"
                    class="h-full w-full fill-gray-500"
                    aria-hidden="true"
                  >
                    <path
                      d="M3.922 12h.499a.52.52 0 0 0 .444-.247L7.949 6.8l3.233-.019A.8.8 0 0 0 12 6a.8.8 0 0 0-.818-.781L7.949 5.2 4.866.246A.53.53 0 0 0 4.421 0h-.499a.523.523 0 0 0-.489.71L5.149 5.2H2.296l-.664-1.33a.52.52 0 0 0-.436-.288L0 3.509 1.097 6 0 8.491l1.196-.073a.52.52 0 0 0 .436-.288l.664-1.33h2.853l-1.716 4.49a.523.523 0 0 0 .489.71"
                    />
                  </svg>
                </div>
              </div>

              <!-- Stop Details -->
              <p
                class="mt-0.5 text-xs font-medium text-muted-foreground underline decoration-dashed underline-offset-5"
              >
                @for (stop of flightData().stopAirports; track stop.code; let i = $index) {
                  @if (i < 2) {
                    {{ stop.code }}
                  }
                }
                <span
                  class="ml-0.5"
                  [class]="!flightData().stopLocation ? 'text-green-600' : 'text-red-500'"
                >
                  {{ flightData().stops }}
                </span>
              </p>
            </div>

            <!-- Arrival -->
            <div class="shrink-0 text-left">
              <h2 class="text-2xl font-medium text-gray-900">{{ flightData().arrivalTime }}</h2>
              <p class="text-[16px] font-light text-muted-foreground">
                {{ flightData().arrivalAirport.code }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="px-2 py-0.5 bg-[linear-gradient(91deg,#eaf3ff_0.97%,#fff_67.37%)] rounded-md flex gap-x-2 mt-5"
        >
          <div
            class="flex gap-x-1.5 border-r justify-center items-center pr-3 border-gray-300 border-dashed "
          >
            <img
              src="https://imgak.mmtcdn.com/flights/assets/media/dt/common/amenitiesV2/beverages.png"
              alt="Bevrages"
              width="14px"
              height="14px"
            />
            <img
              src="https://imgak.mmtcdn.com/flights/assets/media/mobile/common/2X/amenityLayout.webp"
              alt="Layout"
              width="14px"
              height="14px"
            />
            <p class="text-[13px] font-[560px] text-gray-600">Amenities</p>
          </div>
          <div
            class="flex gap-x-2 items-center cursor-pointer"
            (click)="onFlightSelect.emit(flightData())"
          >
            <img
              src="https://imgak.mmtcdn.com/flights/assets/media/dt/listing/flightDetails.png"
              alt="flightDetails"
              height="14px"
              width="14px"
              class="w-3.5 h-3.5"
            />
            <div class="flex items-center gap-1">
              <p class="text-[13px] font-[560px] text-gray-600">More flight details</p>
              <ng-icon
                name="lucideChevronDown"
                size="14"
                class="text-blue-600 [&>svg]:stroke-blue-600"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- ================= RIGHT: PRICE ================= -->
      <div class="relative flex w-60 shrink-0 flex-col justify-between bg-white p-4">
        <!-- Favorite -->
        <button
          type="button"
          aria-label="Add flight to favorites"
          class="absolute right-4 top-3 cursor-pointer"
          (click)="showFaresModal.emit(flightData())"
        >
          <ng-icon name="lucideHeart" size="22" class="text-gray-900 [&>svg]:stroke-gray-900" />
        </button>

        <!-- Price + CTA -->
        <div class="mt-1.5">
          <h2 class="text-2xl font-bold text-gray-900 mt-3">
            {{ flightData().priceINR | currency: 'INR' : 'symbol' : '1.0-0' }}
          </h2>

          <button
            hlmBtn
            variant="outline"
            size="lg"
            class="mt-2 flex w-full cursor-pointer items-center justify-center gap-1 rounded-md bg-primary text-sm font-semibold uppercase text-white active:scale-[0.98]! hover:bg-primary/90 hover:text-white"
          >
            View Fare

            <ng-icon
              name="lucideMoveRight"
              size="20"
              class="ml-2 text-white [&>svg]:stroke-white"
            />
          </button>
        </div>
      </div>
    </div>
  </div>`,
})
export class FlightCard {
  flightData = input.required<FlightDetails>();
  onFlightSelect = output<FlightDetails>();
  showFaresModal = output<FlightDetails>();
}
