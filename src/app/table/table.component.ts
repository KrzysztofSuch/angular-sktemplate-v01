import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GridDataResult, GridComponent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Icalculation } from '../icalculation';
import { CalculationService } from '../calculation.service';


@Component({
  selector: 'app-table',
  template: `
      <kendo-grid
        [data]="activeCalculations"
        [selectable]="true"
        >
        <kendo-grid-column field="Name" title="0Name" [width]="300" [style]="{'background-color': '#e2e8ee','color': '#aaa'}"></kendo-grid-column>
        <kendo-grid-column field="Id" title="Id" [width]="50" [style]="{'background-color': '#e2e8ee','color': '#aaa'}"></kendo-grid-column>
        <kendo-grid-column field="ItemType" title="Item type" [width]="100" [style]="{'background-color': '#e2e8ee','color': '#aaa'}"></kendo-grid-column>
  
        <ng-template kendoGridDetailTemplate let-dataItem1>
          <app-level1 [item]="dataItem1.Root"></app-level1>
        </ng-template>

      </kendo-grid>

asasd
          <kendo-grid
          [data]="[{id: 1, Text: 'Level 5', AAA:'aa'}]">

      <div *kendoGridDetailTemplate="let dataItem">
            <kendo-grid [data]="[{id: 1, Text: 'Level 5', AAA:'aa'}]">
              <div *kendoGridDetailTemplate="let dataItem">
                  <kendo-grid [data]="[{id: 1, text: 'Level 4'}]">
                    <div *kendoGridDetailTemplate="let dataItem">
                      <kendo-grid [data]="[{id: 1, Text: 'Level 5', AAA:'aa'}]">
                        
                      </kendo-grid>
                  </div>
                  </kendo-grid>
              </div>
            </kendo-grid>
        </div>
      </kendo-grid>
  `
})
export class TableComponent implements OnInit {
  // public pageSize = 10;

  // public ngAfterViewInit(): void {
  //       // Expand all first rows initially

  //       for(let i = 0; i < this.pageSize; i++) {
  //         this.grid.expandRow(i);
  //       }
  //   }
    
  @ViewChild(GridComponent) grid: GridComponent;
  
  activeCalculations: Icalculation[];
 

  constructor(private calculationSerivce : CalculationService) { }

  ngOnInit() {
    this.getItems();
    

  }

  getItems(): void {
    this.calculationSerivce.getCalculations()
        .subscribe(items => this.activeCalculations = items);
  }

 
   

}
// <div style="background-color:#d0ded2">{{dataItem.Root.Name}}</div>
//           <div style="background-color:#d0ded2">{{dataItem.Root.Id}}</div>
//           <div style="background-color:#d0ded2">{{dataItem.Root.ItemType}}</div>




   // [selectable]="true"
          // [pageSize]="5"
          // [skip]="skip"
          // [pageable]="true"
          // [navigable]="true"
          // kendoGridFocusable


        // <ng-template *kendoGridDetailTemplate="let dataItem">
        //   <a>sss</a>
        //   <section *ngIf="dataItem.Root">
        //     <p><strong>In Stock:</strong> {{dataItem.Name}} units</p>
        //     <p><strong>In Stock:</strong> {{dataItem.Id}} units</p>
        //   </section>
        // </ng-template>