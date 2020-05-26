import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Iitem, Iitem2 } from '../iitem';
import { GridComponent, RowClassArgs } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-level2',
  template: `
      <!--<p style="color: red">level2 \\/ </p>

      2 ==> {{item2.Name}} -->


      <kendo-grid
          [data]="item2"
          [resizable]="true"
          >
          <kendo-grid-column field="Target.Name" title="Name" width="120" 
          [class]="{'codeColumn': true}">
          </kendo-grid-column>
          
          <kendo-grid-column field="Target.ID" title="Product ID" width="120" 
          [class]="{'codeColumn': true}">
          </kendo-grid-column>
          
          <kendo-grid-column field="Target.ItemType" title="Item type" width="120"
          [class]="{'codeColumn': true}">
          </kendo-grid-column>
          
          <kendo-grid-column field="FullCost" title="FullCost" width="120"
          [class]="{'codeColumn': true}">
          </kendo-grid-column>
          
          <kendo-grid-column field="SalesPrice" title="SalesPrice" width="120"
          [class]="{'codeColumn': true}">
          </kendo-grid-column>

          <kendo-grid-column field="Consumption" title="Consumption" width="120" 
          [class]="{'codeColumn': true}">        
          </kendo-grid-column>

          <kendo-grid-column field="TimeConsumption" title="TimeConsumption" width="120" 
          [class]="{'codeColumn': true}">
          </kendo-grid-column>

          <kendo-grid-column field="Rate" title="Rate" width="120" 
          [class]="{'codeColumn': true}">
          </kendo-grid-column>
          
          <ng-template kendoGridDetailTemplate let-dataItem2>
            <app-level3 [item3]="dataItem2.Target.OutEdges"></app-level3>
          </ng-template>


        </kendo-grid>
    

<!--      
      <div *ngFor="let ii of item2.Items3">
          <ul>P -> {{ii.Name}}</ul>
          <app-level3 item3="ii"></app-level3>
        </div>
      

      <p>level2 /\\ </p> -->
  `
})
export class Level2Component implements OnInit {// , AfterViewInit {
//  public pageSize = 10;

//   public ngAfterViewInit(): void {
//         // Expand all first rows initially

//         for(let i = 0; i < this.pageSize; i++) {
//           this.grid.expandRow(i);
//         }
//     }
    
  @ViewChild(GridComponent) grid: GridComponent;
  
  @Input() public item2: Observable<Iitem2>;


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
