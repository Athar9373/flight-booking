import { TitleCasePipe } from '@angular/common';
import { Component, inject, model, signal } from '@angular/core';
import { TripTypeOption } from '../../model/types';
import { FlightSearchService } from '../../flight-search/service/flight-search';

@Component({
  selector: 'app-trip-type',
  imports: [TitleCasePipe],
  template: `
    <div
      class="absolute -top-6 left-1/2 -translate-x-1/2 z-50 bg-white rounded-xl shadow-lg border border-slate-100 px-6 py-3 flex items-center gap-6 whitespace-nowrap"
    >
      @for (option of tripOptions(); track option) {
        <label
          (click)="setTripType(option)"
          class="flex items-center gap-2 cursor-pointer select-none font-medium text-sm transition-all rounded-2xl py-1.5 px-3"
          [class]="
            tripType() === option ? 'bg-blue-100 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
          "
        >
          <div class="relative flex items-center">
            <input
              type="radio"
              name="tripType"
              [checked]="tripType() === option"
              class="peer appearance-none w-5 h-5 rounded-full border-2 border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none focus:ring-0 transition-colors cursor-pointer"
            />
            <svg
              class="absolute w-3 h-3 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white pointer-events-none opacity-0 scale-50 peer-checked:opacity-100 peer-checked:scale-100 transition-all duration-200 ease-out"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="3.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span class="font-semibold">{{ option.replace('-', ' ') | titlecase }}</span>
        </label>
      }
    </div>
  `,
  styleUrl: './trip-type.css',
})
export class TripType {
  flightSearchService = inject(FlightSearchService);
  tripType = this.flightSearchService.tripType;
  tripOptions = signal<TripTypeOption[]>(['one-way', 'round-trip']);

  setTripType(type: TripTypeOption) {
    this.tripType.set(type);
    console.log(this.tripType());
  }
}
