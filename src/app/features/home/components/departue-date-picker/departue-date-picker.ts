import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import { BrnPopoverImports } from '@spartan-ng/brain/popover';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmPopoverImports } from '@spartan-ng/helm/popover';
import { DualCalendarGrid, DateRange } from '../dual-calendar-grid/dual-calendar-grid';
import { FlightSearchService } from '../../flight-search/service/flight-search';

@Component({
  selector: 'depature-date-picker',
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
    }),
  ],
  template: `
    <hlm-popover sideOffset="5" class="w-full h-full">
      <button
        hlmPopoverTrigger
        hlmBtn
        variant="ghost"
        size="lg"
        class="h-auto p-2.5 sm:p-4 w-full min-w-0 text-left justify-start shadow-none hover:bg-transparent focus:bg-transparent aria-expanded:bg-transparent data-[state=open]:bg-transparent"
      >
        <div class="w-full min-w-0">
          <div class="flex items-center justify-between w-full">
            <span
              class="font-light text-slate-500 uppercase tracking-normal text-[11px] sm:text-xs block"
            >
              Departure
            </span>
            <ng-icon
              name="lucideChevronDown"
              class="text-[14px] sm:text-[16px] shrink-0 ml-1 text-blue-400 [&>svg]:stroke-blue-400"
            />
          </div>

          <h1 class="text-slate-900 mt-0.5 sm:mt-1 flex items-baseline min-w-0">
            <span class="text-2xl sm:text-3xl font-extrabold tracking-tight shrink-0">
              {{ startDate().getDate() }}
            </span>
            <span class="text-lg sm:text-xl font-light ml-1.5 truncate">
              {{ startDate() | date: "MMM ''yy" }}
            </span>
          </h1>

          <p class="text-xs sm:text-sm text-slate-500 truncate mt-0.5">
            {{ startDate() | date: 'EEEE' }}
          </p>
        </div>
      </button>

      <hlm-popover-content
        class="w-[94vw] sm:w-auto max-w-[calc(100vw-2rem)] p-3 sm:p-6 shadow-2xl rounded-2xl sm:rounded-3xl max-h-[85vh] overflow-y-auto"
        *brnPopoverContent="let ctx"
        appear
      >
        <app-dual-calendar-grid
          mode="single"
          [selectedDate]="startDate()"
          (dateSelect)="onDepartureSelect($event, ctx)"
        />
      </hlm-popover-content>
    </hlm-popover>
  `,
})
export class DepartureDatePicker {
  private readonly flightSearchService = inject(FlightSearchService);

  public readonly startDate = this.flightSearchService.startDate;

  endDate = this.flightSearchService.endDate;

  // Pass only start date so the calendar renders only 1 selected day
  public readonly dateRange = computed<DateRange>(() => ({
    start: this.startDate(),
    end: null,
  }));

  onDepartureSelect(date: Date, ctx: { close: () => void }) {
    this.startDate.set(date);

    // Clear end date if it is before the new start date
    const currentEnd = this.flightSearchService.endDate();
    if (currentEnd && currentEnd < date) {
      this.flightSearchService.endDate.set(null);
    }
    ctx.close();
  }
}
