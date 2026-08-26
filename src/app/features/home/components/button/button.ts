import { Component, input, output } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'spartan-button',
  imports: [HlmButtonImports],
  host: { class: 'flex flex-wrap items-center gap-2 md:flex-row ' },
  template: `
    <button
      hlmBtn
      variant="outline"
      size="lg"
      (click)="notifyParent()"
      class="text-white hover:text-white active:scale-[0.9]! text-[12px] flex justify-center items-center cursor-pointer gap-1 px-4 py-2.5 border-0 font-bold rounded-xl bg-linear-to-r from-blue-400 to-blue-600 hover:opacity-80 transition-opacity"
    >
      {{ buttonName() }}
    </button>
  `,
})
export class Button {
  buttonName = input<string>('Button');
  actionTriggered = output();
  notifyParent() {
    this.actionTriggered.emit();
  }
}
