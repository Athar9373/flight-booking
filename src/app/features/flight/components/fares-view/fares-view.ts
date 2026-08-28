import { Component, input, output } from '@angular/core';
import { faresType, FlightDetails } from '../../../home/model/types';
import { CurrencyPipe } from '@angular/common';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { lucideCheck } from '@ng-icons/lucide';

@Component({
  imports: [CurrencyPipe, NgIcon],
  providers: [
    provideIcons({
      lucideCheck,
    }),
  ],
  selector: 'app-fares-view',
  styleUrl: './fares-view.css',
  template: ` <div
    class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
    (click)="closePriceModal.emit()"
  >
    <div
      class="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden my-auto"
    >
      <div
        class="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50"
        (click)="$event.stopPropagation()"
      >
        <h3 class="text-base font-black text-slate-900">Select Fare Type</h3>
        <button
          type="button"
          (click)="closePriceModal.emit()"
          class="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors flex items-center justify-center font-bold cursor-pointer"
        >
          ✕
        </button>
      </div>
      <div class="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
        @for (fare of flight().fareOptions; track fare.id) {
          <div
            class="border border-slate-200 rounded-2xl p-5 hover:border-blue-500 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white shadow-xs"
          >
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <h4 class="text-sm font-black text-slate-900">{{ fare.title }}</h4>
                <span
                  class="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 border border-blue-100"
                >
                  {{ fare.badge }}
                </span>
              </div>
              @if (fare.features && fare.features.length > 0) {
                <ul class="space-y-1 mt-2">
                  @for (feature of fare.features; track feature) {
                    <li class="text-xs text-slate-600 flex items-center gap-1.5 ">
                      <span class="text-emerald-500 font-bold"
                        ><ng-icon
                          name="lucideCheck"
                          size="14"
                          class="text-green-600 [&>svg]:stroke-green-600"
                      /></span>
                      {{ feature }}
                    </li>
                  }
                </ul>
              }
            </div>

            <!-- PRICE & BOOK BUTTON -->
            <div
              class="flex sm:flex-col items-center sm:items-center justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 gap-2"
            >
              <span class="text-2xl font-black text-slate-900">
                {{ fare.priceINR | currency: 'INR' : 'symbol' : '1.0-0' }}</span
              >
              <button
                type="button"
                (click)="
                  proceedToSeatSelection.emit({
                    Selectedfare: fare,
                    flight: flight(),
                  })
                "
                class="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-2 rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                BOOK NOW
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  </div>`,
})
export class FaresView {
  flight = input.required<FlightDetails>();
  closePriceModal = output<void>();
  proceedToSeatSelection = output<{
    Selectedfare: faresType;
    flight: FlightDetails;
  }>();
}
