import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { HlmCarouselImports } from '@spartan-ng/helm/carousel';
import { HlmHoverCardImports } from '@spartan-ng/helm/hover-card';
import { hlm } from '@spartan-ng/helm/utils';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCalendar } from '@ng-icons/lucide';

export interface DatePriceOption {
  id: string;
  dateStr: string;
  price?: number;
  currency?: string;
  isFlexibleCard?: boolean;
}

@Component({
  selector: 'app-day-view-mini-grid',
  standalone: true,
  imports: [HlmCarouselImports, HlmHoverCardImports, DecimalPipe, NgIcon],
  providers: [provideIcons({ lucideCalendar })],
  templateUrl: './day-view-mini-grid.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex w-full items-center justify-center p-4' },
})
export class DayViewMiniGrid {
  DATE_PRICE_CAROUSEL_DATA: DatePriceOption[] = [
    { id: '1', dateStr: 'Thu, May 27', price: 8142, currency: '₹' },
    { id: '2', dateStr: 'Fri, May 28', price: 7950, currency: '₹' },
    { id: '3', dateStr: 'Sat, May 29', price: 8200, currency: '₹' },
    { id: '4', dateStr: 'Sun, May 30', price: 8142, currency: '₹' },
    { id: '5', dateStr: 'Mon, May 31', price: 7800, currency: '₹' },
    { id: '6', dateStr: 'Tue, Jun 1', price: 7600, currency: '₹' },
    { id: '7', dateStr: 'Wed, Jun 2', price: 7900, currency: '₹' },
    { id: '8', dateStr: 'Thu, Jun 3', price: 8100, currency: '₹' },
    { id: '9', dateStr: 'Fri, Jun 4', price: 8300, currency: '₹' },
    { id: '10', dateStr: 'Sat, Jun 5', price: 8500, currency: '₹' },
    { id: '11', dateStr: 'Sun, Jun 6', price: 8200, currency: '₹' },
    { id: '12', dateStr: 'Mon, Jun 7', price: 7900, currency: '₹' },
    { id: '13', dateStr: 'Tue, Jun 8', price: 7700, currency: '₹' },
    { id: '14', dateStr: 'Wed, Jun 9', price: 7500, currency: '₹' },
    { id: '15', dateStr: 'Thu, Jun 10', price: 7800, currency: '₹' },
    { id: '16', dateStr: 'Flexible dates', isFlexibleCard: true },
  ];

  public selectedDateId = signal<string>('4');
  dateCardClass = hlm(
    'relative flex h-[72px] cursor-pointer flex-col items-center justify-center p-3 text-center transition-all duration-150 select-none rounded-s, border border-transparent',
    'bg-white text-gray-700 hover:bg-blue-100',
  );
}
