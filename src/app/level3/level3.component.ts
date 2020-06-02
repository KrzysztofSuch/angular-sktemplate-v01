import { Component, OnInit, Input } from '@angular/core';
import { Iitem } from '../iitem';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-level3',
  template: `
    <!--  <p style="color: blue">level3 \\/ </p>

      3 ===> {{item3.Name}}
      <div *ngFor="let iii of item3">
          <ul>R -> {{iii.Name}}</ul>


          <app-level4 item4="iii"></app-level4>

        </div>
-->

      <kendo-grid
          [kendoGridBinding]="item3"
          [resizable]="true"
          [reorderable]="true"
          [columnMenu]="{ filter: true }"
          [sortable]="true"
         
          >
          <kendo-grid-column field="Target.Name" title="Name" width="120" [style]="{'background-color': green,'color': '#aaa'}"></kendo-grid-column>
          <kendo-grid-column field="Target.ID" title="Product ID" width="120"></kendo-grid-column>
          <kendo-grid-column field="Target.ItemType" title="Item type" width="120"></kendo-grid-column>
          <kendo-grid-column field="FullCost" title="FullCost" width="120"  [style]="{'background-color': '#e2e8ee','color': '#aaa'}"></kendo-grid-column>
          <kendo-grid-column field="SalesPrice" title="SalesPrice" width="120"  [style]="{'background-color': '#e2e8ee','color': '#aaa'}"></kendo-grid-column>
          <kendo-grid-column field="Consumption" title="Consumption" width="120"  [style]="{'background-color': '#e2e8ee','color': '#aaa'}"></kendo-grid-column>
          <kendo-grid-column field="TimeConsumption" title="TimeConsumption" width="120"  [style]="{'background-color': '#e2e8ee','color': '#aaa'}"></kendo-grid-column>
          <kendo-grid-column field="Rate" title="Rate" width="120"  [style]="{'background-color': '#e2e8ee','color': '#aaa'}"></kendo-grid-column>
          <ng-template kendoGridDetailTemplate let-dataItem3>
            <app-level4 [item4]="dataItem3.Target.OutEdges"></app-level4>
          </ng-template>


        </kendo-grid>

      
<!--
      <p>level3 /\\ </p> -->
  `
})
export class Level3Component implements OnInit {
  @Input() public item3: Observable<Iitem>;
  
  constructor() { }

  ngOnInit() {
  }

}


  // <ng-template kendoGridDetailTemplate let-dataItem2>
  //           <app-level3 [item3]="dataItem2.Items3"></app-level3>
  //         </ng-template>