import { Component, inject, model, signal } from '@angular/core';
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
      sideOffset="5"
      class="w-40 h-full"
      [state]="popoverState()"
      (stateChanged)="onPopoverStateChange($event)"
    >
      <!-- Trigger Button -->
      <button
        hlmPopoverTrigger
        hlmBtn
        variant="ghost"
        size="lg"
        class="h-auto p-4 w-full min-w-0 text-left justify-start shadow-none hover:bg-transparent focus:bg-transparent aria-expanded:bg-transparent data-[state=open]:bg-transparent"
      >
        <div class="w-full min-w-0">
          <div class="flex items-center">
            <span class="font-light text-slate-500 uppercase tracking-normal block">
              Cabin Class
            </span>
            <ng-icon
              name="lucideChevronDown"
              class="text-[16px] shrink-0 ml-1 text-blue-400 [&>svg]:stroke-blue-400"
            />
          </div>
          <div class="rounded-l-2xl cursor-pointer min-w-0">
            <h1
              class="text-xl font-extrabold text-slate-900 mt-1 mr-2 min-w-0 max-w-full whitespace-normal wrap-break-word line-clamp-2"
            >
              {{ selectedCabinClass().name }}
            </h1>
          </div>
        </div>
      </button>

      <!-- Popover Content -->
      <hlm-popover-content
        class="w-105! p-5! shadow-2xl! rounded-3xl!"
        *brnPopoverContent="let ctx"
        appear
      >
        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
          CHOOSE CABIN CLASS
        </h4>

        <div class="space-y-3">
          @for (opt of cabinOption; track opt.name) {
            <div
              (click)="selectCabinClass(opt)"
              [class]="
                selectedCabinClass().name === opt.name
                  ? 'border-2 border-blue-500 bg-linear-to-r from-white to-[#d3e7ff] shadow-sm bg-[linear-gradient(35deg,#fff,#fff,#d3e7ff)]'
                  : 'border border-slate-200 hover:border-slate-300 bg-white'
              "
              class="rounded-xl p-4 cursor-pointer transition-all relative"
            >
              <div class="flex items-center justify-between ">
                <div class="flex items-start gap-3 min-w-0">
                  <!-- Custom CSS Radio Button Indicator -->
                  <div class="relative flex items-center mt-0.5 shrink-0">
                    <input
                      type="radio"
                      name="cabinClassRadio"
                      [checked]="selectedCabinClass().name === opt.name"
                      class="peer appearance-none w-5 h-5 rounded-full border-2 border-slate-300 bg-[linear-gradient(35deg,#fff,#fff,#d3e7ff)] checked:border-blue-600 focus:outline-none cursor-pointer checked:bg-[linear-gradient(35deg,#fff,#fff,#d3e7ff)]"
                    />
                    <div
                      class="absolute w-2.5 h-2.5 rounded-full bg-blue-600 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                    ></div>
                  </div>

                  <div>
                    <h5 class="text-[18px] font-extrabold text-slate-900 leading-tight">
                      {{ opt.name }}
                    </h5>

                    <!-- Feature Tags -->
                    @if (opt.features && opt.features.length > 0) {
                      <div class="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                        @for (feat of opt.features; track feat.feature) {
                          <span
                            class="text-xs text-slate-600 flex items-center gap-1.5 font-medium"
                          >
                            @if (feat.icon) {
                              <img
                                [src]="feat.icon"
                                [alt]="feat.feature"
                                class="w-3.5! h-3.5! object-contain"
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
                  <div class="shrink-0 ml-3 self-center">
                    <img [src]="opt.icon" [alt]="opt.name" class="w-17! h-17! object-contain" />
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
