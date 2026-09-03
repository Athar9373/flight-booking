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
  standalone: true,
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
      class="w-full h-full"
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
        <div class="p-2.5 sm:p-4 rounded-l-2xl cursor-pointer min-w-0 w-full">
          <span
            class="font-light text-slate-500 uppercase tracking-normal text-[11px] sm:text-xs block"
          >
            {{ label() }}
          </span>

          <h1
            class="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5 sm:mt-1 truncate mr-2"
          >
            {{ city()?.name }}
          </h1>

          <p class="text-xs sm:text-[14px] text-slate-500 truncate mt-0.5">
            {{ city()?.airport }}
          </p>
        </div>
      </button>

      <!-- Popover Content -->
      <hlm-popover-content
        class="w-[94vw] sm:w-104 max-w-md p-3.5 sm:p-5 shadow-3xl rounded-2xl sm:max-h-[80vh] max-h-[40vh] flex flex-col"
        *brnPopoverContent="let ctx"
        appear
      >
        <!-- Search Input -->
        <hlm-input-group class="h-10! shrink-0 mb-3">
          <input
            hlmInputGroupInput
            [placeholder]="'Search ' + label()"
            [(ngModel)]="citySearchQuery"
            class="placeholder:font-bold focus:outline-none text-xs sm:text-sm"
          />

          <hlm-input-group-addon>
            <ng-icon name="lucideSearch" class="mr-1.5" />
          </hlm-input-group-addon>
        </hlm-input-group>

        <!-- Airports Scroll Container -->
        <div
          class="flex-1 overflow-y-auto space-y-1 max-h-[calc(80vh-5rem)]
                 scrollbar-none
                 [-ms-overflow-style:none]
                 [&::-webkit-scrollbar]:hidden"
        >
          @if (!citySearchQuery()) {
            <h2
              class="tracking-tighter font-bold text-muted-foreground text-[11px] sm:text-xs mb-1 px-1"
            >
              POPULAR SEARCHES
            </h2>

            @for (airport of airports; track airport.code) {
              <button
                type="button"
                class="flex items-center justify-between p-2 sm:p-2.5
                       hover:bg-slate-100 rounded-md cursor-pointer
                       transition-colors w-full text-left"
                (click)="selectCity(airport)"
              >
                <div class="flex items-center gap-2.5 sm:gap-3 w-full min-w-0">
                  <span
                    class="bg-slate-200/80 text-slate-700 font-medium
                           text-xs px-2 py-1.5 rounded-md shrink-0
                           flex items-center justify-center
                           w-9 h-9 sm:w-11 sm:h-11"
                  >
                    {{ airport.code }}
                  </span>

                  <div class="min-w-0 flex-1">
                    <p class="text-xs sm:text-sm font-light text-slate-900 truncate">
                      {{ airport.name }}
                    </p>

                    <p class="text-[11px] sm:text-xs text-slate-500 truncate">
                      {{ airport.airport }}
                    </p>
                  </div>
                </div>
              </button>
            }
          } @else {
            <h2
              class="tracking-tighter font-bold text-muted-foreground text-[11px] sm:text-xs mb-1 px-1"
            >
              SUGGESTIONS
            </h2>

            @for (airport of filteredAirports(); track airport.code) {
              <button
                type="button"
                class="flex items-center justify-between p-2 sm:p-2.5
                       hover:bg-slate-100 rounded-md cursor-pointer
                       transition-colors w-full text-left"
                (click)="selectCity(airport)"
              >
                <div class="flex items-center gap-2.5 sm:gap-3 w-full min-w-0">
                  <span
                    class="bg-slate-200/80 text-slate-700 font-medium
                           text-xs px-2 py-1.5 rounded-md shrink-0
                           flex items-center justify-center
                           w-9 h-9 sm:w-11 sm:h-11"
                  >
                    {{ airport.code }}
                  </span>

                  <div class="min-w-0 flex-1">
                    <p class="text-xs sm:text-sm font-light text-slate-900 truncate">
                      {{ airport.name }}
                    </p>

                    <p class="text-[11px] sm:text-xs text-slate-500 truncate">
                      {{ airport.airport }}
                    </p>
                  </div>
                </div>
              </button>
            } @empty {
              <p class="text-center text-xs text-slate-400 py-6">
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
