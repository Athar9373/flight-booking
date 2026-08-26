import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrnPopoverImports } from '@spartan-ng/brain/popover';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmPopoverImports } from '@spartan-ng/helm/popover';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSearch } from '@ng-icons/lucide';
import { FlightSearchService } from '../../flight-search/service/flight-search';

export interface AirportType {
  code: string;
  name: string;
  airport: string;
}

@Component({
  selector: 'city-popover',
  imports: [
    BrnPopoverImports,
    HlmPopoverImports,
    HlmButtonImports,
    HlmInputGroupImports,
    NgIcon,
    FormsModule,
  ],
  providers: [
    provideIcons({
      lucideSearch,
    }),
  ],
  template: `
    <hlm-popover
      sideOffset="5"
      [state]="popoverState()"
      (stateChanged)="onPopoverStateChange($event)"
    >
      <!-- Trigger -->
      <button
        hlmPopoverTrigger
        hlmBtn
        variant="ghost"
        size="lg"
        class="h-auto p-0 w-full min-w-0 text-left justify-start shadow-none
               hover:bg-transparent focus:bg-transparent
               aria-expanded:bg-transparent
               data-[state=open]:bg-transparent"
      >
        <div class="p-4 rounded-l-2xl cursor-pointer min-w-0">
          <span class="font-light text-slate-500 uppercase tracking-normal block">
            {{ label() }}
          </span>

          <h1 class="text-2xl font-extrabold text-slate-900 mt-1 overflow-hidden mr-2">
            {{ city()?.name }}
          </h1>

          <p class="text-[14px] text-slate-500 truncate mt-0.5">
            {{ city()?.airport }}
          </p>
        </div>
      </button>

      <!-- Popover -->
      <hlm-popover-content
        class="min-w-90 shadow-3xl h-100 p-5! rounded-2xl!"
        *brnPopoverContent="let ctx"
        appear
      >
        <!-- Search -->
        <hlm-input-group class="h-10!">
          <input
            hlmInputGroupInput
            [placeholder]="'Search ' + label()"
            [(ngModel)]="citySearchQuery"
            class="placeholder:font-bold focus:outline-none"
          />

          <hlm-input-group-addon>
            <ng-icon name="lucideSearch" class="mr-1.5" />
          </hlm-input-group-addon>
        </hlm-input-group>

        <!-- Airports -->
        <div
          class="h-100 overflow-y-auto space-y-1
                 scrollbar-none
                 [-ms-overflow-style:none]
                 [&::-webkit-scrollbar]:hidden"
        >
          @if (!citySearchQuery()) {
            <h2 class="tracking-tighter font-bold text-muted-foreground">POPULAR SEARCHES</h2>

            @for (airport of airports; track airport.code) {
              <button
                type="button"
                class="flex items-center justify-between p-2.5
                       hover:bg-gray-100 rounded-md cursor-pointer
                       transition-colors w-full text-left"
                (click)="selectCity(airport)"
              >
                <div class="flex items-center gap-3 w-full">
                  <span
                    class="bg-gray-300/70 text-gray-700 font-medium
                           text-xs px-2 py-1.5 rounded-md shrink-0
                           flex items-center justify-center
                           w-11 h-11"
                  >
                    {{ airport.code }}
                  </span>

                  <div class="min-w-0">
                    <p class="text-sm font-light text-slate-900 truncate">
                      {{ airport.name }}
                    </p>

                    <p class="text-xs text-slate-500 truncate">
                      {{ airport.airport }}
                    </p>
                  </div>
                </div>
              </button>
            }
          } @else {
            <h2 class="tracking-tighter font-bold text-muted-foreground">SUGGESTIONS</h2>

            @for (airport of filteredAirports(); track airport.code) {
              <button
                type="button"
                class="flex items-center justify-between p-2.5
                       hover:bg-gray-100 rounded-md cursor-pointer
                       transition-colors w-full text-left"
                (click)="selectCity(airport)"
              >
                <div class="flex items-center gap-3 w-full">
                  <span
                    class="bg-gray-300/70 text-gray-700 font-medium
                           text-xs px-2 py-1.5 rounded-md shrink-0
                           flex items-center justify-center
                           w-11 h-11"
                  >
                    {{ airport.code }}
                  </span>

                  <div class="min-w-0">
                    <p class="text-sm font-light text-slate-900 truncate">
                      {{ airport.name }}
                    </p>

                    <p class="text-xs text-slate-500 truncate">
                      {{ airport.airport }}
                    </p>
                  </div>
                </div>
              </button>
            } @empty {
              <p class="text-center text-xs text-slate-400 py-4">
                No airports found matching "{{ citySearchQuery() }}"
              </p>
            }
          }
        </div>
      </hlm-popover-content>
    </hlm-popover>
  `,
})
export class CityPopover {
  flightSearchService = inject(FlightSearchService);
  // Inputs
  city = input.required<AirportType>();
  label = input.required<'FROM' | 'TO'>();

  // Output
  cityChange = output<AirportType>();

  // Local state
  citySearchQuery = signal('');
  popoverState = signal<'open' | 'closed'>('closed');

  readonly airports = this.flightSearchService.airports;
  filteredAirports = computed(() => {
    const query = this.citySearchQuery().toLowerCase().trim();

    if (!query) {
      return this.airports;
    }

    return this.airports.filter(
      (airport) =>
        airport.name.toLowerCase().includes(query) ||
        airport.code.toLowerCase().includes(query) ||
        airport.airport.toLowerCase().includes(query),
    );
  });

  selectCity(airport: AirportType) {
    // Tell parent about the selected airport
    this.cityChange.emit(airport);

    // Close popover
    this.popoverState.set('closed');

    // Clear search
    this.citySearchQuery.set('');
  }

  onPopoverStateChange(state: 'open' | 'closed') {
    this.popoverState.set(state);
  }
}
