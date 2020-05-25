import { Component, OnInit, Input, AfterViewInit, ViewChild, ViewEncapsulation, NgZone } from '@angular/core';
import { Iitem }  from '../iitem'
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { GridDataResult, GridComponent, PageChangeEvent, RowClassArgs } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-level1',
  encapsulation: ViewEncapsulation.None,
  styles: [`
     
   `],
  template: `
       <!-- <p style="color: green">level1 \\/ </p> 
       <p> 1 => {{item.Name}} </p>-->
    
        

        <kendo-grid
          #grid
          [data]="item.OutEdges"
          [rowClass]="rowCallback"
          [resizable]="true"
          >
          <kendo-grid-column field="Target.Name" title="1Name" width="120"  
            [headerStyle]="{'background-color': '#666','color': '#fff','line-height': '1em'}"
            [class]="{'codeColumn': true}">
          </kendo-grid-column>
          
          <kendo-grid-column field="Target.ID" title="Product ID" 
            width="120"
            [class]="{'codeColumn': true}">
          </kendo-grid-column>

          <kendo-grid-column field="Target.ItemType" title="Item type" 
            width="120"  
            [class]="{'codeColumn': true}">
          </kendo-grid-column>

          <kendo-grid-column field="FullCost" title="FullCost" width="120"  
          [class]="{'codeColumn': true}">
          ></kendo-grid-column>
          
          <kendo-grid-column field="SalesPrice" title="SalesPrice" width="120"  
          [class]="{'codeColumn': true}">
          ></kendo-grid-column>
          
          <kendo-grid-column field="Consumption" title="Consumption" width="120"  
          [class]="{'codeColumn': true}">
          ></kendo-grid-column>
          
          <kendo-grid-column field="TimeConsumption" title="TimeConsumption" width="120" 
          [class]="{'codeColumn': true}"> 
          
          ></kendo-grid-column>
          
          <kendo-grid-column field="Rate" title="Rate" width="120"  
          [class]="{'codeColumn': true}">
          ></kendo-grid-column>

          <ng-template  kendoGridDetailTemplate let-dataItem1>
            <app-level2 [item2]="dataItem1.Target.OutEdges"></app-level2>
          </ng-template>

      

        </kendo-grid>


    
<!--
      <div *ngFor="let i of item.Items">
        <app-level2 [item2]="i"></app-level2>
      </div>

      <p>level1 /\\ </p>
      -->
  `
})
export class Level1Component implements OnInit , AfterViewInit {
//  public pageSize = 10;

//   public ngAfterViewInit(): void {
//         // Expand all first rows initially

//         for(let i = 0; i < this.pageSize; i++) {
//           this.grid.expandRow(i);
//         }
//     }
  public ngAfterViewInit(): void {
      this.fitColumns();
  }

  private fitColumns(): void {    
      this.ngZone.onStable.asObservable().pipe(take(1)).subscribe(() => {
        this.grid.autoFitColumns();
      });
  } 

  @ViewChild(GridComponent) grid: GridComponent;
  
  @Input() public item: Observable<Iitem>;

  constructor(private ngZone: NgZone) {
    }

  ngOnInit() {
  }

  // Use an arrow function to capture the 'this' execution context of the class.
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


