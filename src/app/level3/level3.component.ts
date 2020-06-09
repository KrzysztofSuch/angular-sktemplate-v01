import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Iitem, Iitem3 } from '../iitem';
import { Observable } from 'rxjs';
import { RowClassArgs, GridComponent } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-level3',
  template: `

      <kendo-grid
          [kendoGridBinding]="item3"
          [resizable]="true"
          [reorderable]="true"
          [columnMenu]="{ filter: true }"
          [sortable]="true"
          [rowClass]="rowCallback"
          >
          <kendo-grid-column field="Target.Name" title="Name" width="120"  [class]="{'codeColumn': true}"></kendo-grid-column>
          <kendo-grid-column field="Target.ID" title="Product ID" width="120" [class]="{'codeColumn': true}"></kendo-grid-column>
          <kendo-grid-column field="Target.ItemType" title="Item type" width="120" [class]="{'codeColumn': true}"></kendo-grid-column>
          <kendo-grid-column field="FullCost" title="FullCost" width="120"   [class]="{'codeColumn': true}"></kendo-grid-column>
          <kendo-grid-column field="SalesPrice" title="SalesPrice" width="120"   [class]="{'codeColumn': true}"></kendo-grid-column>
          <kendo-grid-column field="Consumption" title="Consumption" width="120"  [class]="{'codeColumn': true}"></kendo-grid-column>
          <kendo-grid-column field="TimeConsumption" title="TimeConsumption" width="120"   [class]="{'codeColumn': true}"></kendo-grid-column>
          <kendo-grid-column field="Rate" title="Rate" width="120"  [class]="{'codeColumn': true}"></kendo-grid-column>
          <ng-template kendoGridDetailTemplate let-dataItem3>
            <app-level4 [item4]="dataItem3.Target.OutEdges"></app-level4>
          </ng-template>


        </kendo-grid>
  `
})
export class Level3Component implements OnInit {
  @ViewChild(GridComponent) grid: GridComponent;
  @Input() public item3: Observable<Iitem3>;
  
  constructor() { }

  ngOnInit() {
  }


  public rowCallback = (context: RowClassArgs) => {
    switch (context.dataItem.Target.ItemType) {
      case 'G':
        return {GroupColor : true};
      case 'E':
        return {ElementColor : true};
      case 'P':
        return {PostColor : true};
      case 'R':
        return {ResourceColor : true};
      case 'D':
        return {DescriptionColor : true};
      default:
        return {};
     }
   }

}


  // <ng-template kendoGridDetailTemplate let-dataItem2>
  //           <app-level3 [item3]="dataItem2.Items3"></app-level3>
  //         </ng-template>