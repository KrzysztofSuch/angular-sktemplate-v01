import { Component, OnInit } from '@angular/core';
import { Icalculation } from '../icalculation';
import { CalculationService } from '../calculation.service';

@Component({
  selector: 'app-calculation',
  template: `

    {{activeCalculation.Name}}

  <app-level1 [item]="activeCalculation.Root"></app-level1>
  `
})
export class CalculationComponent implements OnInit {
  activeCalculation: Icalculation;

  constructor(private calculationSerivce : CalculationService) { }

  ngOnInit() {
    this.getCalculationItems();
  }

   getCalculationItems(): void {
    this.calculationSerivce.getCalculation()
        .subscribe(items => this.activeCalculation = items);
  }

}