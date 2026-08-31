import { Component, inject, signal } from '@angular/core';
import { BrnPopoverImports } from '@spartan-ng/brain/popover';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmPopoverImports } from '@spartan-ng/helm/popover';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';
import { FormsModule } from '@angular/forms';
import { TravelerCountPickerComponent } from '../traveler-count-picker-component/traveler-count-picker-component';
import { FlightSearchService } from '../../flight-search/service/flight-search';

@Component({
  selector: 'app-travellers',
  standalone: true,
  imports: [
    BrnPopoverImports,
    HlmPopoverImports,
    HlmButtonImports,
    NgIcon,
    FormsModule,
    HlmRadioGroupImports,
    TravelerCountPickerComponent,
  ],
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
      <!-- Trigger Button Aligned with Form Inputs -->
      <button
        hlmPopoverTrigger
        hlmBtn
        variant="ghost"
        size="lg"
        class="h-auto p-2.5 sm:p-4 w-full min-w-0 text-left justify-start flex-col items-start shadow-none hover:bg-transparent focus:bg-transparent aria-expanded:bg-transparent data-[state=open]:bg-transparent"
      >
        <div class="w-full min-w-0 pr-1">
          <div class="flex items-center justify-between w-full">
            <span
              class="font-light text-slate-500 uppercase tracking-normal text-[11px] block leading-none truncate"
            >
              Travellers
            </span>
            <ng-icon
              name="lucideChevronDown"
              class="text-xs shrink-0 ml-1 text-blue-400 [&>svg]:stroke-blue-400"
            />
          </div>

          <div
            class="flex items-center gap-1.5 sm:gap-2 text-slate-500 mt-1 sm:mt-2 font-medium overflow-hidden md:mt-5"
          >
            <span class="flex items-center gap-0.5 shrink-0">
              <div
                class="bg-[url('https://imgak.mmtcdn.com/flights/assets/media/dt/common/landing/adult_pax_icon.png')] bg-cover bg-center h-4 w-4"
              ></div>
              <span class="text-sm sm:text-base font-bold text-slate-900">{{ adultsCount() }}</span>
            </span>

            <span class="flex items-center gap-0.5 shrink-0">
              <div
                class="bg-[url('https://imgak.mmtcdn.com/flights/assets/media/dt/common/landing/child_pax_icon.png')] bg-cover bg-center h-4 w-4"
              ></div>
              <span
                class="text-sm sm:text-base font-bold "
                [class]="childrensCount() === 0 ? 'text-slate-400' : 'text-slate-900'"
                >{{ childrensCount() }}</span
              >
            </span>

            <span class="flex items-center gap-0.5 shrink-0">
              <div
                class="bg-[url('https://imgak.mmtcdn.com/flights/assets/media/dt/common/landing/infant_pax_icon.png')] bg-cover bg-center h-4 w-4"
              ></div>
              <span
                class="text-sm sm:text-base font-bold "
                [class]="infantsCount() === 0 ? 'text-slate-400' : 'text-slate-900'"
                >{{ infantsCount() }}</span
              >
            </span>
          </div>
        </div>
      </button>

      <!-- Popover Content -->
      <hlm-popover-content
        class="w-[94vw] sm:w-[32rem] max-w-lg p-4 sm:p-6 shadow-2xl rounded-2xl max-h-[85vh] overflow-y-auto z-50"
        *brnPopoverContent="let ctx"
        appear
      >
        <div class="flex flex-col gap-4 w-full">
          <!-- Adults Selection -->
          <app-traveler-count-picker
            [(count)]="adultsCount"
            label="ADULTS (12y +)"
            [numArray]="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
            class="w-full"
          ></app-traveler-count-picker>

          <!-- Children & Infants Selection Grid -->
          <div class="flex flex-col sm:flex-row justify-between gap-4 w-full">
            <app-traveler-count-picker
              [(count)]="childrensCount"
              label="CHILDREN (2y - 12y)"
              [numArray]="[0, 1, 2, 3, 4, 5]"
              class="w-full sm:w-1/2"
            ></app-traveler-count-picker>

            <app-traveler-count-picker
              [(count)]="infantsCount"
              label="INFANTS (below 2y)"
              [numArray]="[0, 1, 2, 3, 4, 5]"
              class="w-full sm:w-1/2"
            ></app-traveler-count-picker>
          </div>

          <div class="flex w-full items-center justify-end mt-1 sm:mt-2">
            <button
              hlmBtn
              variant="outline"
              size="lg"
              (click)="onPopoverStateChange('closed')"
              class="w-full sm:w-auto text-white hover:text-white active:scale-[0.98] text-xs sm:text-sm flex justify-center items-center cursor-pointer gap-1 px-6 py-2.5 border-0 font-bold rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 transition-opacity"
            >
              Apply
            </button>
          </div>
        </div>
      </hlm-popover-content>
    </hlm-popover>
  `,
  styleUrl: './travellers.css',
})
export class Travellers {
  flightSearchService = inject(FlightSearchService);
  adultsCount = this.flightSearchService.adultsCount;
  childrensCount = this.flightSearchService.childrenCount;
  infantsCount = this.flightSearchService.infantsCount;

  popoverState = signal<'open' | 'closed'>('closed');

  onPopoverStateChange(state: 'open' | 'closed') {
    this.popoverState.set(state);
  }
}
