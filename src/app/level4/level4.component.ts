import { Component, OnInit, Input } from '@angular/core';
import { Iitem, Iitem4 } from '../iitem';
import { RowClassArgs } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-level4',
  template: `
      <!--<p>level4 \\/ </p>

      4 ===> {{item4.Name}}
      <div *ngFor="let iiii of item4.Items4">
          <ul>P -> {{iiii.Name}}</ul>
        </div>
      

      <p>level4 /\\ </p> -->

      <kendo-grid
          [kendoGridBinding]="item4"
          [resizable]="true"
          [reorderable]="true"
          [columnMenu]="{ filter: true }"
          [sortable]="true"
          [rowClass]="rowCallback"
          >
          <kendo-grid-column field="Target.Name" title="Name" width="120" [style]="{'background-color': green,'color': '#aaa'}"></kendo-grid-column>
          <kendo-grid-column field="Target.ID" title="Product ID" width="120"></kendo-grid-column>
          <kendo-grid-column field="Target.ItemType" title="Item type" width="120"></kendo-grid-column>
          <kendo-grid-column field="FullCost" title="FullCost" width="120"  [style]="{'background-color': '#e2e8ee','color': '#aaa'}"></kendo-grid-column>
          <kendo-grid-column field="SalesPrice" title="SalesPrice" width="120"  [style]="{'background-color': '#e2e8ee','color': '#aaa'}"></kendo-grid-column>
          <kendo-grid-column field="Consumption" title="Consumption" width="120"  [style]="{'background-color': '#e2e8ee','color': '#aaa'}"></kendo-grid-column>
          <kendo-grid-column field="TimeConsumption" title="TimeConsumption" width="120"  [style]="{'background-color': '#e2e8ee','color': '#aaa'}"></kendo-grid-column>
          <kendo-grid-column field="Rate" title="Rate" width="120"  [style]="{'background-color': '#e2e8ee','color': '#aaa'}"></kendo-grid-column>
        </kendo-grid>

  `
})
export class Level4Component implements OnInit {
  @Input() public item4: Iitem4;
  
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