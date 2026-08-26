import { Component, computed, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';
import { hlm } from '@spartan-ng/helm/utils';

@Component({
  selector: 'app-traveler-count-picker',
  imports: [HlmRadioGroupImports, HlmLabelImports, FormsModule],
  template: `
    <div class="mb-5">
      <div class="flex justify-between gap-0.5 flex-col">
        <span class="text-xs font-medium text-slate-800 uppercase">{{ label() }}</span>
        <span class="text-[10px] text-slate-500"> on the day of travel </span>
      </div>

      <hlm-radio-group
        class="grid gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200 text-center w-full mt-2"
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
      'flex items-center justify-center p-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer border',
      isSelected
        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100',
    );
  }
}
