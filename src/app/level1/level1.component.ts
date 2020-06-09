import { Component, OnInit, Input, AfterViewInit, ViewChild, ViewEncapsulation, NgZone } from '@angular/core';
import { Iitem }  from '../iitem'
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { GridDataResult, GridComponent, PageChangeEvent, RowClassArgs } from '@progress/kendo-angular-grid';
import { GridSettings } from '../grid-settings.interface';
import { ColumnSettings } from '../column-settings.interface';
import { StatePersistingService } from '../state-persisting.service';
import { State, process } from '@progress/kendo-data-query';

@Component({
  selector: 'app-level1',
  encapsulation: ViewEncapsulation.None,
  providers: [StatePersistingService],
  styles: [`
     
   `],
  template: `
       <!-- <p style="color: green">level1 \\/ </p> 
       <p> 1 => {{item.Name}} </p>-->

        <kendo-grid
          #grid
          [kendoGridBinding]="item.OutEdges"
          [rowClass]="rowCallback"
          [resizable]="true"
          [reorderable]="true"
          [columnMenu]="{ filter: true }"
          
          [sortable]="true"
          >
          <kendo-grid-column field="Target.Number" title="Number" width="120"
            [class]="{'codeColumn': true}">
          </kendo-grid-column>

           <kendo-grid-column field="Target.Code" title="Code" width="120"  
            [class]="{'codeColumn': true}">
          </kendo-grid-column>

          <!--[headerStyle]="{'background-color': '#666','color': '#fff','line-height': '1em'}" -->
          <kendo-grid-column field="Target.Name" title="Name" width="120"  
            [class]="{'codeColumn': true}">
          </kendo-grid-column>

          <!--<kendo-grid-column field="Target.ItemType" title="Item type" 
            width="120"  
            [class]="{'codeColumn': true}">
          </kendo-grid-column>-->

          <kendo-grid-column field="Quantity" title="Quantity" width="120" 
            [class]="{'codeColumn': true}"> 
          </kendo-grid-column>

          <kendo-grid-column field="Target.Dimension" title="Dimension" width="120" 
            [class]="{'codeColumn': true}"> 
          </kendo-grid-column>

          <kendo-grid-column field="TimeConsumption" title="TimeConsumption" width="120" 
            [class]="{'codeColumn': true}"> 
          </kendo-grid-column>
          
          <kendo-grid-column field="UnitTimeConsumption" title="UnitTimeConsumption" width="120"  
            [class]="{'codeColumn': true}">
          ></kendo-grid-column>
          
          <kendo-grid-column field="UnitFullCost" title="UnitFullCost" width="120"  
            [class]="{'codeColumn': true}">
          </kendo-grid-column>

          <kendo-grid-column field="UnitSalesPrice" title="UnitSalesPrice" width="120"  
            [class]="{'codeColumn': true}">
          </kendo-grid-column>
          
          <kendo-grid-column field="TimeConsumption" title="TimeConsumption"  
            width="120" 
            [class]="{'codeColumn': true}"> 
          </kendo-grid-column>
          
          <kendo-grid-column field="FullCost" title="FullCost" width="120"  
            [class]="{'codeColumn': true}">
          </kendo-grid-column>

          <kendo-grid-column field="SalesPrice" title="SalesPrice" width="120"  
            [class]="{'codeColumn': true}">
          </kendo-grid-column>

          <ng-template  kendoGridDetailTemplate let-dataItem1>
            <app-level2 [item2]="dataItem1.Target.OutEdges"></app-level2>
          </ng-template>

        </kendo-grid>
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

  constructor(private ngZone: NgZone, public persistingService: StatePersistingService) {
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





//REMEMBER GRID ColumnSettings
  public gridSettings: GridSettings;

  public get savedStateExists(): boolean {
    return !!this.persistingService.get('gridSettings');
  }

  public dataStateChange(state: State): void {
      this.gridSettings.state = state;
     // this.gridSettings.gridData = process(sampleProducts, state);
  }

  public saveGridSettings(grid: GridComponent): void {
    const columns = grid.columns;

    const gridConfig = {
      state: this.gridSettings.state,
      columnsConfig: columns.toArray().map(item => {
        return Object.keys(item)
          .filter(propName => !propName.toLowerCase()
            .includes('template'))
            .reduce((acc, curr) => ({...acc, ...{[curr]: item[curr]}}), <ColumnSettings> {});
      })
    };

    this.persistingService.set('gridSettings', gridConfig);
  }

  public mapGridSettings(gridSettings: GridSettings): GridSettings {
    const state = gridSettings.state;
    this.mapDateFilter(state.filter);

    return {
      state,
      columnsConfig: gridSettings.columnsConfig.sort((a, b) => a.orderIndex - b.orderIndex),
      //gridData: process(sampleProducts, state)
    };
  }

  private mapDateFilter = (descriptor: any) => {
    const filters = descriptor.filters || [];

    filters.forEach(filter => {
        if (filter.filters) {
            this.mapDateFilter(filter);
        } else if (filter.field === 'FirstOrderedOn' && filter.value) {
            filter.value = new Date(filter.value);
        }
    });
  }
}


