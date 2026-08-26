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
  template: ` <hlm-popover
    sideOffset="5"
    class="w-full h-full "
    [state]="popoverState()"
    (stateChanged)="onPopoverStateChange($event)"
  >
    <!-- Trigger Button -->
    <button
      hlmPopoverTrigger
      hlmBtn
      variant="ghost"
      size="lg"
      class="h-auto pt-4 px-2 w-full min-w-0 text-left justify-start shadow-none hover:bg-transparent focus:bg-transparent aria-expanded:bg-transparent data-[state=open]:bg-transparent"
    >
      <div class="w-full min-w-0">
        <div class="flex items-center justify-between w-full">
          <span class="font-light text-slate-500 uppercase tracking-normal block">
            Travellers
          </span>
          <ng-icon
            name="lucideChevronDown"
            class="text-[16px] shrink-0 ml-1 text-blue-400 [&>svg]:stroke-blue-400"
          />
        </div>

        <div class="flex items-center gap-3 text-xs text-slate-500 mt-5 font-medium">
          <span class="flex items-center gap-1">
            <div
              class="bg-[url('https://imgak.mmtcdn.com/flights/assets/media/dt/common/landing/adult_pax_icon.png')] bg-cover bg-center h-5.5 w-5.5"
            ></div>
            <span
              class="text-xl font-bold"
              [class.text-black]="adultsCount() > 0"
              [class.text-slate-500]="adultsCount() === 0"
              >{{ adultsCount() }}</span
            >
          </span>
          <span class="flex items-center gap-1">
            <div
              class="bg-[url('https://imgak.mmtcdn.com/flights/assets/media/dt/common/landing/child_pax_icon.png')] bg-cover bg-center h-5.5 w-5.5"
            ></div>
            <span
              class="text-xl font-bold"
              [class.text-black]="childrensCount() > 0"
              [class.text-slate-500]="childrensCount() === 0"
              >{{ childrensCount() }}</span
            >
          </span>
          <span class="flex items-center gap-1">
            <div
              class="bg-[url('https://imgak.mmtcdn.com/flights/assets/media/dt/common/landing/infant_pax_icon.png')] bg-cover bg-center h-5.5 w-5.5"
            ></div>
            <span
              class="text-xl font-bold"
              [class.text-black]="infantsCount() > 0"
              [class.text-slate-500]="infantsCount() === 0"
              >{{ infantsCount() }}</span
            >
          </span>
        </div>
      </div>
    </button>

    <!-- Popover Content -->
    <hlm-popover-content class="w-130 p-6 shadow-2xl" *brnPopoverContent="let ctx" appear>
      <!-- Adults Selection -->
      <app-traveler-count-picker
        [(count)]="adultsCount"
        label="ADULTS (12y +)"
        [numArray]="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
        class="w-115"
      ></app-traveler-count-picker>

      <div class="flex justify-center gap-5 w-full">
        <!-- Children Selection -->
        <app-traveler-count-picker
          [(count)]="childrensCount"
          label="CHILDREN (2y - 12y)"
          [numArray]="[0, 1, 2, 3, 4, 5]"
          class="w-69 "
        ></app-traveler-count-picker>

        <!-- Infants Selection -->
        <app-traveler-count-picker
          [(count)]="infantsCount"
          label="INFANTS (below 2y)"
          [numArray]="[0, 1, 2, 3, 4, 5]"
          class="w-69"
        ></app-traveler-count-picker>
      </div>

      <div class="flex w-full items-center justify-between ">
        <button
          hlmBtn
          variant="outline"
          size="lg"
          (click)="onPopoverStateChange('closed')"
          class="text-white hover:text-white active:scale-[0.9]!  text-[12px] flex justify-center items-center cursor-pointer gap-1 px-4 py-2.5 border-0 font-bold rounded-xl bg-linear-to-r from-blue-400 to-blue-600 hover:opacity-80 transition-opacity"
        >
          Apply
        </button>
      </div>
    </hlm-popover-content>
  </hlm-popover>`,
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
