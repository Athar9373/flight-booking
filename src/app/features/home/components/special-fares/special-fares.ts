import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmHoverCardImports } from '@spartan-ng/helm/hover-card';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';
import { FlightSearchService } from '../../flight-search/service/flight-search';

@Component({
  selector: 'app-special-fares',
  standalone: true,
  imports: [
    FormsModule,
    HlmRadioGroupImports,
    HlmHoverCardImports,
    HlmButtonImports,
    HlmAvatarImports,
  ],
  template: `
    <div class="mt-4 sm:mt-6 flex flex-col w-full">
      <span class="text-xs sm:text-sm font-bold text-slate-800 mb-2 block">
        Select a special fare
      </span>

      <!-- Scrollable container for smaller viewports -->
      <div class="w-full overflow-x-auto no-scrollbar pb-2 -mx-1 px-1 sm:mx-0 sm:px-0">
        @if (selectedCabinClass().id === 1) {
          <hlm-radio-group
            class="flex flex-nowrap sm:flex-wrap items-center gap-2 min-w-max sm:min-w-0"
            [(ngModel)]="selectedFare"
          >
            @for (fare of Economyfare(); track fare.id) {
              <hlm-hover-card>
                <!-- Fare option / Hover trigger -->
                <div
                  hlmHoverCardTrigger
                  (click)="onFareSelect(fare.id)"
                  [class]="
                    selectedFare() === fare.id
                      ? 'border-2 border-blue-500 bg-white shadow-xs'
                      : 'border-2 border-slate-200 hover:border-slate-300 bg-white'
                  "
                  class="rounded-xl px-2.5 sm:px-3.5 py-1.5 sm:py-2 cursor-pointer transition-all relative shrink-0"
                >
                  <div class="flex items-center gap-1.5">
                    <p
                      [class]="
                        selectedFare() === fare.id
                          ? 'text-blue-600 font-bold'
                          : 'text-slate-800 font-semibold'
                      "
                      class="text-xs sm:text-sm"
                    >
                      {{ fare.title }}
                    </p>

                    @if (fare.badge) {
                      <span
                        class="bg-purple-600 text-white text-[8px] sm:text-[9px] font-extrabold
                         px-1 sm:px-1.5 py-0.5 rounded-md uppercase tracking-wide"
                      >
                        {{ fare.badge }}
                      </span>
                    }
                  </div>

                  <p class="text-[10px] sm:text-[12px] text-slate-500 mt-0.5">
                    {{ fare.subtitle }}
                  </p>
                </div>

                <!-- Hover content -->
                @if (fare.hoverContent !== '') {
                  <hlm-hover-card-content
                    *hlmHoverCardPortal
                    class="w-[85vw] max-w-[18rem] sm:w-75 p-3 sm:p-4 rounded-md shadow-xl"
                  >
                    <div class="flex justify-between font-sans">
                      <p class="text-[11px] text-slate-800 font-normal leading-relaxed">
                        {{ fare.hoverContent }}
                      </p>
                    </div>
                  </hlm-hover-card-content>
                }
              </hlm-hover-card>
            }
          </hlm-radio-group>
        } @else {
          <hlm-radio-group
            class="flex flex-nowrap sm:flex-wrap items-center gap-2 min-w-max sm:min-w-0"
            [(ngModel)]="selectedFare"
          >
            @for (fare of otherClassFares(); track fare.id) {
              <hlm-hover-card>
                <!-- Fare option / Hover trigger -->
                <div
                  hlmHoverCardTrigger
                  (click)="onFareSelect(fare.id)"
                  [class]="
                    selectedFare() === fare.id
                      ? 'border-2 border-blue-500 bg-white shadow-xs'
                      : 'border-2 border-slate-200 hover:border-slate-300 bg-white'
                  "
                  class="rounded-xl px-2.5 sm:px-3.5 py-1.5 sm:py-2 cursor-pointer transition-all relative shrink-0"
                >
                  <div class="flex items-center gap-1.5">
                    <p
                      [class]="
                        selectedFare() === fare.id
                          ? 'text-blue-600 font-bold'
                          : 'text-slate-800 font-semibold'
                      "
                      class="text-xs sm:text-sm"
                    >
                      {{ fare.title }}
                    </p>

                    @if (fare.badge) {
                      <span
                        class="bg-purple-600 text-white text-[8px] sm:text-[9px] font-extrabold
                         px-1 sm:px-1.5 py-0.5 rounded-md uppercase tracking-wide"
                      >
                        {{ fare.badge }}
                      </span>
                    }
                  </div>

                  <p class="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">
                    {{ fare.subtitle }}
                  </p>
                </div>

                <!-- Hover content -->
                @if (fare.hoverContent !== '') {
                  <hlm-hover-card-content
                    *hlmHoverCardPortal
                    class="w-[85vw] max-w-[18rem] sm:w-75 p-3 sm:p-4 rounded-md shadow-xl"
                  >
                    <div class="flex justify-between font-sans">
                      <p class="text-[11px] text-slate-800 font-normal leading-relaxed">
                        {{ fare.hoverContent }}
                      </p>
                    </div>
                  </hlm-hover-card-content>
                }
              </hlm-hover-card>
            }
          </hlm-radio-group>
        }
      </div>
    </div>
  `,
})
export class SpecialFares {
  flightSearchService = inject(FlightSearchService);
  selectedCabinClass = this.flightSearchService.selectedCabinClass;
  Economyfare = this.flightSearchService.Economyfare;
  otherClassFares = this.flightSearchService.otherClassFares;
  selectedFare = this.flightSearchService.selectedFare;

  onFareSelect(fare: string) {
    this.selectedFare.set(fare);
  }
}
