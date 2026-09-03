import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import { BrnPopoverImports } from '@spartan-ng/brain/popover';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmPopoverImports } from '@spartan-ng/helm/popover';
import { CabinOption } from '../../model/types';
import { FlightSearchService } from '../../flight-search/service/flight-search';

@Component({
  selector: 'app-cabin-class-popover',
  standalone: true,
  imports: [BrnPopoverImports, HlmPopoverImports, HlmButtonImports, NgIcon, FormsModule],
  providers: [
    provideIcons({
      lucideChevronDown,
    }),
  ],
  template: `
    <hlm-popover
      side="bottom"
      align="start"
      sideOffset="8"
      class="w-full h-full block"
      [state]="popoverState()"
      (stateChanged)="onPopoverStateChange($event)"
    >
      <!-- Trigger Button Aligned with Travellers Trigger -->
      <button
        hlmPopoverTrigger
        hlmBtn
        variant="ghost"
        size="lg"
        class="h-auto p-2.5 sm:p-4 w-full min-w-0 text-left justify-start flex-col items-start shadow-none hover:bg-transparent focus:bg-transparent aria-expanded:bg-transparent data-[state=open]:bg-transparent"
      >
        <div class="w-full min-w-0">
          <div class="flex items-center justify-between sm:justify-start w-full">
            <span
              class="font-light text-slate-500 uppercase tracking-normal text-[11px] sm:text-xs block leading-none"
            >
              Cabin Class
            </span>
            <ng-icon
              name="lucideChevronDown"
              class="text-[14px] sm:text-[16px] shrink-0 ml-1 sm:ml-2 text-blue-400 [&>svg]:stroke-blue-400"
            />
          </div>
          <div class="min-w-0 w-full mt-1.5 sm:mt-2">
            <h1 class="text-base sm:text-lg font-bold text-slate-900 truncate leading-tight">
              {{ selectedCabinClass().name }}
            </h1>
          </div>
        </div>
      </button>

      <!-- Popover Content with Higher Stacking Context -->
      <hlm-popover-content
        class="w-[94vw] sm:w-[26rem] max-w-md p-4 sm:p-5 shadow-2xl rounded-2xl max-h-[85vh] overflow-y-auto z-50"
        *brnPopoverContent="let ctx"
        appear
      >
        <h4
          class="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider px-1 mb-3"
        >
          CHOOSE CABIN CLASS
        </h4>

        <div class="space-y-2.5 sm:space-y-3">
          @for (opt of cabinOption; track opt.name) {
            <div
              (click)="selectCabinClass(opt)"
              [class]="
                selectedCabinClass().name === opt.name
                  ? 'border-2 border-blue-500 bg-blue-50/50 shadow-sm'
                  : 'border border-slate-200 hover:border-slate-300 bg-white'
              "
              class="rounded-xl p-3 sm:p-4 cursor-pointer transition-all relative"
            >
              <div class="flex items-center justify-between gap-2">
                <div class="flex items-start gap-2.5 sm:gap-3 min-w-0">
                  <!-- Custom CSS Radio Button Indicator -->
                  <div class="relative flex items-center mt-1 shrink-0">
                    <input
                      type="radio"
                      name="cabinClassRadio"
                      [checked]="selectedCabinClass().name === opt.name"
                      class="peer appearance-none w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-slate-300 bg-white checked:border-blue-600 focus:outline-none cursor-pointer"
                    />
                    <div
                      class="absolute w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-blue-600 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                    ></div>
                  </div>

                  <div class="min-w-0">
                    <h5 class="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                      {{ opt.name }}
                    </h5>

                    <!-- Feature Tags -->
                    @if (opt.features && opt.features.length > 0) {
                      <div class="flex flex-wrap gap-x-3 gap-y-1 mt-1.5">
                        @for (feat of opt.features; track feat.feature) {
                          <span
                            class="text-[11px] sm:text-xs text-slate-600 flex items-center gap-1.5 font-medium"
                          >
                            @if (feat.icon) {
                              <img
                                [src]="feat.icon"
                                [alt]="feat.feature"
                                class="w-3 h-3 sm:w-3.5 sm:h-3.5 object-contain"
                              />
                            }
                            {{ feat.feature }}
                          </span>
                        }
                      </div>
                    }
                  </div>
                </div>

                <!-- Seat/Bed Graphic Icon -->
                @if (opt.icon) {
                  <div class="shrink-0 ml-2 self-center">
                    <img
                      [src]="opt.icon"
                      [alt]="opt.name"
                      class="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                    />
                  </div>
                }
              </div>
            </div>
          }
        </div>
      </hlm-popover-content>
    </hlm-popover>
  `,
  styleUrl: './cabin-class-popover.css',
})
export class CabinClassPopover {
  flightSearchService = inject(FlightSearchService);
  readonly cabinOption: CabinOption[] = this.flightSearchService.cabinOption;

  public readonly selectedCabinClass = this.flightSearchService.selectedCabinClass;
  public readonly popoverState = signal<'open' | 'closed'>('closed');

  onPopoverStateChange(state: 'open' | 'closed') {
    this.popoverState.set(state);
  }

  selectCabinClass(value: CabinOption) {
    this.selectedCabinClass.set(value);
    this.popoverState.set('closed');
  }
}
