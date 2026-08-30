import { Component, signal } from '@angular/core';
import { provideIcons, NgIcon } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmTabsImports } from '@spartan-ng/helm/tabs';

@Component({
  selector: 'app-flight-sort-tabs',
  standalone: true,
  imports: [
    HlmTabsImports,
    HlmLabelImports,
    HlmInputImports,
    HlmButtonImports,
    NgIcon,
    HlmDropdownMenuImports,
  ],
  styleUrl: './flight-sort-tabs.css',
  templateUrl: './flight-sort-tabs.html',
  providers: [provideIcons({ lucideChevronDown })],
})
export class FlightSortTabs {
  public selectedTab = signal<string>('best');
}
