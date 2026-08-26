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
    <hlm-popover sideOffset="5" class="w-full">
      <button
        hlmPopoverTrigger
        hlmBtn
        variant="ghost"
        size="lg"
        class="h-auto p-4 w-full min-w-0 text-left justify-start shadow-none hover:bg-transparent focus:bg-transparent aria-expanded:bg-transparent data-[state=open]:bg-transparent"
      >
        <div class="w-full min-w-0">
          <div class="flex items-center justify-between w-full">
            <span class="font-light text-slate-500 uppercase tracking-normal block">
              Departure
            </span>
            <ng-icon
              name="lucideChevronDown"
              class="text-[16px] shrink-0 ml-1 text-blue-400 [&>svg]:stroke-blue-400"
            />
          </div>

          <h1 class="text-slate-900 mt-1 flex items-baseline">
            <span class="text-3xl font-extrabold tracking-tight">
              {{ startDate().getDate() }}
            </span>
            <span class="text-xl font-light ml-1.5">
              {{ startDate() | date: "MMM ''yy" }}
            </span>
          </h1>

          <p class="text-sm text-slate-500 truncate mt-0.5">
            {{ startDate() | date: 'EEEE' }}
          </p>
        </div>
      </button>

      <hlm-popover-content class="w-auto p-6 shadow-2xl" *brnPopoverContent="let ctx" appear>
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
