import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown, lucideX } from '@ng-icons/lucide';
import { BrnPopoverImports } from '@spartan-ng/brain/popover';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmPopoverImports } from '@spartan-ng/helm/popover';
import { DualCalendarGrid, DateRange } from '../dual-calendar-grid/dual-calendar-grid';
import { FlightSearchService } from '../../flight-search/service/flight-search';

@Component({
  selector: 'return-date-picker',
  standalone: true,
  imports: [
    DatePipe,
    NgIcon,
    BrnPopoverImports,
    HlmPopoverImports,
    HlmButtonImports,
    DualCalendarGrid,
  ],
  providers: [
    provideIcons({
      lucideChevronDown,
      lucideX,
    }),
  ],
  template: `
    <div class="w-42.25 h-28.5 min-w-0 relative">
      @if (tripType() === 'one-way') {
        <button
          (click)="enableRoundTrip()"
          hlmBtn
          variant="ghost"
          size="lg"
          class="w-full h-full min-w-0 box-border p-4 text-left justify-start shadow-none hover:bg-transparent focus:bg-transparent aria-expanded:bg-transparent"
        >
          <div class="w-full min-w-0">
            <div class="flex items-center w-full">
              <span class="font-light text-slate-500 uppercase tracking-normal"> Return </span>
              <ng-icon
                name="lucideChevronDown"
                class="text-[16px] shrink-0 ml-3 text-blue-400 [&>svg]:stroke-blue-400"
              />
            </div>

            <div class="w-full h-15 border-transparent mt-1">
              <p class="text-xs text-slate-400 text-wrap py-2 px-1">
                Tap to add a return date for bigger discounts
              </p>
            </div>
          </div>
        </button>
      } @else {
        <hlm-popover sideOffset="5" class="block w-full h-full box-border">
          <button
            hlmPopoverTrigger
            hlmBtn
            variant="ghost"
            size="lg"
            class="w-full h-full min-w-0 box-border p-4 text-left justify-start shadow-none hover:bg-transparent focus:bg-transparent aria-expanded:bg-transparent"
          >
            <div class="w-full min-w-0">
              <div class="flex items-center w-full">
                <span class="font-light text-slate-500 uppercase tracking-normal"> Return </span>
                <ng-icon
                  name="lucideChevronDown"
                  class="text-[16px] shrink-0 ml-3 text-blue-400 [&>svg]:stroke-blue-400"
                />
              </div>

              <div class="w-full h-15 px-1 border-transparent">
                <h1 class="text-slate-900 mt-1 flex items-baseline">
                  <span class="text-3xl font-extrabold tracking-tight">
                    {{ activeReturnDate().getDate() }}
                  </span>

                  <span class="text-xl font-light ml-1.5">
                    {{ activeReturnDate() | date: "MMM ''yy" }}
                  </span>
                </h1>

                <p class="text-sm text-slate-500 truncate mt-0.5">
                  {{ activeReturnDate() | date: 'EEEE' }}
                </p>
              </div>
            </div>
          </button>

          <hlm-popover-content class="w-auto p-6 shadow-2xl" *brnPopoverContent="let ctx" appear>
            <app-dual-calendar-grid
              mode="range"
              [selectedRange]="dateRange()"
              [minSelectableDate]="startDate()"
              (rangeSelect)="onReturnDateSelect($event, ctx)"
            />
          </hlm-popover-content>
        </hlm-popover>

        <div
          class="flex items-center justify-center bg-gray-300 rounded-full w-5 h-5 absolute top-3 right-3 cursor-pointer z-10 hover:bg-gray-400 transition-colors"
          (click)="disableRoundTrip()"
        >
          <ng-icon name="lucideX" class="text-gray-600 [&>svg]:stroke-gray-600" size="13" />
        </div>
      }
    </div>
  `,
})
export class ReturnDatePicker {
  readonly flightSearchService = inject(FlightSearchService);
  readonly tripType = this.flightSearchService.tripType;
  readonly startDate = this.flightSearchService.startDate;
  readonly endDate = this.flightSearchService.endDate;

  /** Resolves to endDate if set; defaults safely to startDate */
  readonly activeReturnDate = computed(() => this.endDate() ?? this.startDate());

  readonly dateRange = computed<DateRange>(() => ({
    start: this.startDate(),
    end: this.endDate(),
  }));

  onReturnDateSelect(range: DateRange, ctx: { close: () => void }) {
    if (range.end) {
      this.endDate.set(range.end);
      ctx.close();
    }
  }

  enableRoundTrip() {
    this.tripType.set('round-trip');
    if (!this.endDate()) {
      // Default to same day or next day if no return date was previously picked
      this.endDate.set(
        new Date(new Date(this.startDate()).setDate(new Date(this.startDate()).getDate() + 1)),
      );
    }
  }

  disableRoundTrip() {
    this.tripType.set('one-way');
    this.endDate.set(null);
  }
}
