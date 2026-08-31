import { Component, computed, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';
import { hlm } from '@spartan-ng/helm/utils';

@Component({
  selector: 'app-traveler-count-picker',
  standalone: true,
  imports: [HlmRadioGroupImports, HlmLabelImports, FormsModule],
  template: `
    <div class="w-full">
      <!-- Label Header -->
      <div class="flex flex-col justify-between mb-1.5">
        <span class="text-xs font-bold text-slate-800 uppercase tracking-tight">
          {{ label() }}
        </span>
        <span class="text-[10px] text-slate-500"> on the day of travel </span>
      </div>

      <!-- Fluid Container with Flex Wrapping / Overflow Support -->
      <div
        class="w-full overflow-x-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-0.5"
      >
        <hlm-radio-group
          class="grid gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-center w-full"
          [style.grid-template-columns]="gridColumns()"
          [ngModel]="count()"
          (ngModelChange)="count.set($event)"
        >
          @for (n of numArray(); track n) {
            <label hlmLabel [class]="getCardClass(n)">
              <hlm-radio [value]="n" class="sr-only" />
              <span>{{ n }}</span>
            </label>
          }
        </hlm-radio-group>
      </div>
    </div>
  `,
})
export class TravelerCountPickerComponent {
  public readonly label = input.required<string>();
  public readonly numArray = input<number[]>([0, 1, 2, 3, 4, 5, 6, 7]);

  /** Two-way model signal */
  public readonly count = model<number>(0);

  /** Dynamically compute grid layout based on array length */
  public readonly gridColumns = computed(() => `repeat(${this.numArray().length}, minmax(0, 1fr))`);

  getCardClass(n: number): string {
    const isSelected = this.count() === n;

    return hlm(
      'flex items-center justify-center min-w-[1.75rem] sm:min-w-0 h-8 sm:h-9 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer select-none',
      isSelected
        ? 'bg-blue-600 text-white shadow-sm'
        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 active:bg-slate-100',
    );
  }
}
