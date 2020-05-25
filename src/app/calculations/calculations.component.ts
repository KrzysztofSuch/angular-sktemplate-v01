import { Component, OnInit } from '@angular/core';
import { Ielement } from '../ielement';
import { CalculationService } from '../calculation.service';
import { Icalculation } from '../icalculation';

import { Observable } from 'rxjs';
import {
    GridComponent,
    GridDataResult,
    DataStateChangeEvent
} from '@progress/kendo-angular-grid';

import { SortDescriptor } from '@progress/kendo-data-query';


@Component({
  selector: 'app-calculations',
  templateUrl: './calculations.component.html',
  styleUrls: ['./calculations.component.css']
})
export class CalculationsComponent implements OnInit {
  activeCalculation: Icalculation[];


  constructor(private calculationSerivce : CalculationService) { }

  ngOnInit() {
    this.getItems();

  }

  getItems(): void {
    this.calculationSerivce.getCalculations()
        .subscribe(items => this.activeCalculation = items);
  }
}