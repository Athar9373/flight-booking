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
    <div class="w-full h-full min-w-0 relative flex flex-col justify-start">
      @if (tripType() === 'one-way') {
        <button
          (click)="enableRoundTrip()"
          hlmBtn
          variant="ghost"
          size="lg"
          class="w-full h-auto min-h-full min-w-0 box-border p-2.5 sm:p-4 text-left justify-start flex-col items-start shadow-none hover:bg-transparent focus:bg-transparent aria-expanded:bg-transparent overflow-visible whitespace-normal"
        >
          <div class="w-full min-w-0">
            <!-- Fixed Top Header Label -->
            <div class="flex items-center justify-between sm:justify-start w-full">
              <span
                class="font-light text-slate-500 uppercase tracking-normal text-[11px] sm:text-xs block leading-none"
              >
                Return
              </span>
              <ng-icon
                name="lucideChevronDown"
                class="text-[14px] sm:text-[16px] shrink-0 ml-1 sm:ml-3 text-blue-400 [&>svg]:stroke-blue-400"
              />
            </div>

            <!-- Content Slot: Full text visibility -->
            <div class="w-full min-w-0 mt-1.5 flex items-center">
              <p
                class="text-[11px] sm:text-xs text-slate-400 leading-normal wrap-break-word whitespace-normal font-normal"
              >
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
            class="w-full h-auto min-h-full min-w-0 box-border p-2.5 sm:p-4 text-left justify-start flex-col items-start shadow-none hover:bg-transparent focus:bg-transparent aria-expanded:bg-transparent overflow-visible whitespace-normal"
          >
            <div class="w-full min-w-0 pr-6 sm:pr-4">
              <!-- Fixed Top Header Label -->
              <div class="flex items-center justify-between sm:justify-start w-full">
                <span
                  class="font-light text-slate-500 uppercase tracking-normal text-[11px] sm:text-xs block leading-none"
                >
                  Return
                </span>
                <ng-icon
                  name="lucideChevronDown"
                  class="text-[14px] sm:text-[16px] shrink-0 ml-1 sm:ml-3 text-blue-400 [&>svg]:stroke-blue-400"
                />
              </div>

              <!-- Content Slot: Date View -->
              <div class="w-full min-w-0 mt-1 flex flex-col justify-center">
                <h1 class="text-slate-900 flex items-baseline min-w-0">
                  <span class="text-2xl sm:text-3xl font-extrabold tracking-tight shrink-0">
                    {{ activeReturnDate().getDate() }}
                  </span>

                  <span class="text-lg sm:text-xl font-light ml-1.5 truncate">
                    {{ activeReturnDate() | date: "MMM ''yy" }}
                  </span>
                </h1>

                <p class="text-xs sm:text-sm text-slate-500 truncate mt-0.5">
                  {{ activeReturnDate() | date: 'EEEE' }}
                </p>
              </div>
            </div>
          </button>

          <hlm-popover-content
            class="w-[94vw] sm:w-auto max-w-[calc(100vw-2rem)] p-3 sm:p-6 shadow-2xl rounded-2xl sm:rounded-3xl max-h-[85vh] overflow-y-auto"
            *brnPopoverContent="let ctx"
            appear
          >
            <app-dual-calendar-grid
              mode="range"
              [selectedRange]="dateRange()"
              [minSelectableDate]="startDate()"
              (rangeSelect)="onReturnDateSelect($event, ctx)"
            />
          </hlm-popover-content>
        </hlm-popover>

        <button
          type="button"
          aria-label="Remove return trip"
          class="flex items-center justify-center bg-slate-200 hover:bg-slate-300 rounded-full w-6 h-6 sm:w-5 sm:h-5 absolute top-2 right-2 sm:top-3 sm:right-3 cursor-pointer z-10 transition-colors"
          (click)="disableRoundTrip()"
        >
          <ng-icon
            name="lucideX"
            class="text-slate-600 [&>svg]:stroke-slate-600 text-[11px] sm:text-[13px]"
          />
        </button>
      }
    </div>
  `,
})
export class ReturnDatePicker {
  readonly flightSearchService = inject(FlightSearchService);
  readonly tripType = this.flightSearchService.tripType;
  readonly startDate = this.flightSearchService.startDate;
  readonly endDate = this.flightSearchService.endDate;

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
