import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmHoverCardImports } from '@spartan-ng/helm/hover-card';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';
import { FlightSearchService } from '../../flight-search/service/flight-search';

@Component({
  selector: 'app-special-fares',
  imports: [
    FormsModule,
    HlmRadioGroupImports,
    HlmHoverCardImports,
    HlmButtonImports,
    HlmAvatarImports,
  ],
  template: `
    <div class="mt-6 flex flex-col lg:flex-row lg:items-center  gap-4">
      <div>
        <span class="text-sm font-bold text-slate-800 mb-2 block"> Select a special fare </span>
        @if (selectedCabinClass().id === 1) {
          <hlm-radio-group class="flex flex-wrap items-center gap-2" [(ngModel)]="selectedFare">
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
                  class="rounded-xl px-3.5 py-2 cursor-pointer transition-all relative"
                >
                  <div class="flex items-center  gap-1.5">
                    <p
                      [class]="
                        selectedFare() === fare.id
                          ? 'text-blue-600 font-bold'
                          : 'text-slate-800 font-semibold'
                      "
                      class="text-sm"
                    >
                      {{ fare.title }}
                    </p>

                    @if (fare.badge) {
                      <span
                        class="bg-purple-600 text-white text-[9px] font-extrabold
                         px-1.5 py-0.5 rounded-md uppercase tracking-wide"
                      >
                        {{ fare.badge }}
                      </span>
                    }
                  </div>

                  <p class="text-[12px] text-slate-500 mt-0.5">
                    {{ fare.subtitle }}
                  </p>
                </div>

                <!-- Hover content -->
                @if (fare.hoverContent !== '') {
                  <hlm-hover-card-content *hlmHoverCardPortal class="w-75 p-4 rounded-md! ">
                    <div class="flex justify-between space-4 font-sans">
                      <p class="text-[11px] text-slate-800 font-[560px]">
                        {{ fare.hoverContent }}
                      </p>
                    </div>
                  </hlm-hover-card-content>
                }
              </hlm-hover-card>
            }
          </hlm-radio-group>
        } @else {
          <hlm-radio-group class="flex flex-wrap items-center gap-2" [(ngModel)]="selectedFare">
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
                  class="rounded-xl px-3.5 py-2 cursor-pointer transition-all relative"
                >
                  <div class="flex items-center gap-1.5">
                    <p
                      [class]="
                        selectedFare() === fare.id
                          ? 'text-blue-600 font-bold'
                          : 'text-slate-800 font-semibold'
                      "
                      class="text-xs"
                    >
                      {{ fare.title }}
                    </p>

                    @if (fare.badge) {
                      <span
                        class="bg-purple-600 text-white text-[9px] font-extrabold
                         px-1.5 py-0.5 rounded-md uppercase tracking-wide"
                      >
                        {{ fare.badge }}
                      </span>
                    }
                  </div>

                  <p class="text-[10px] text-slate-500 mt-0.5">
                    {{ fare.subtitle }}
                  </p>
                </div>

                <!-- Hover content -->
                @if (fare.hoverContent !== '') {
                  <hlm-hover-card-content *hlmHoverCardPortal class="w-75 p-4 rounded-md! ">
                    <div class="flex justify-between space-4 font-sans">
                      <p class="text-[11px] text-slate-800 font-[560px]">
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
