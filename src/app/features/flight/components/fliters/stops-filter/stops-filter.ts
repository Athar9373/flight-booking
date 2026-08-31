import { Component } from '@angular/core';
import { HlmAccordionImports } from '@spartan-ng/helm/accordion';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmLabelImports } from '@spartan-ng/helm/label';

@Component({
  imports: [HlmAccordionImports, HlmLabelImports, HlmCheckboxImports, HlmFieldImports],
  selector: 'app-stops-filter',
  styleUrl: './stops-filter.css',
  templateUrl: './stops-filter.html',
  host: {
    class: 'max-w-sm h-[380px] flex flex-col justify-between',
  },
})
export class StopsFilter {}
