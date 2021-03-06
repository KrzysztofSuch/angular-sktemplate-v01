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
  styles: [``],
  template: `
       <!-- <button class="k-button" (click)="saveGridSettings(grid)">Save current state</button>
        <button
            class="k-button"
            *ngIf="savedStateExists"
            (click)="gridSettings = mapGridSettings(persistingService.get('gridSettings'))">Load saved state</button>
            -->
        <kendo-grid
          #grid
          [kendoGridBinding]="item.OutEdges"
          [rowClass]="rowCallback"
          [resizable]="true"
          [reorderable]="true"
          [columnMenu]="{ filter: true }"
          
          [sortable]="true"
          >
          <kendo-grid-column field="Target.Number" title="Number" 
            [class]="{'codeColumn': true}">
          </kendo-grid-column>

           <kendo-grid-column field="Target.Code" title="Code"   
            [class]="{'codeColumn': true}">
          </kendo-grid-column>

          <!--[headerStyle]="{'background-color': '#666','color': '#fff','line-height': '1em'}" -->
          <kendo-grid-column field="Target.Name" title="Name"   
            [class]="{'codeColumn': true}">
          </kendo-grid-column>

          <!--<kendo-grid-column field="Target.ItemType" title="Item type" 
              
            [class]="{'codeColumn': true}">
          </kendo-grid-column>-->

          <kendo-grid-column field="Quantity" title="Quantity"  
            [class]="{'codeColumn': true}"> 
          </kendo-grid-column>

          <kendo-grid-column field="Target.Dimension" title="Dimension"  
            [class]="{'codeColumn': true}"> 
          </kendo-grid-column>

          <kendo-grid-column field="TimeConsumption" title="TimeConsumption"  
            [class]="{'codeColumn': true}"> 
          </kendo-grid-column>
          
          <kendo-grid-column field="UnitTimeConsumption" title="UnitTimeConsumption"   
            [class]="{'codeColumn': true}">
          ></kendo-grid-column>
          
          <kendo-grid-column field="UnitFullCost" title="UnitFullCost"   
            [class]="{'codeColumn': true}">
          </kendo-grid-column>

          <kendo-grid-column field="UnitSalesPrice" title="UnitSalesPrice"   
            [class]="{'codeColumn': true}">
          </kendo-grid-column>
          
          <kendo-grid-column field="TimeConsumption" title="TimeConsumption"  
             
            [class]="{'codeColumn': true}"> 
          </kendo-grid-column>
          
          <kendo-grid-column field="FullCost" title="FullCost"   
            [class]="{'codeColumn': true}">
          </kendo-grid-column>

          <kendo-grid-column field="SalesPrice" title="SalesPrice"   
            [class]="{'codeColumn': true}">
          </kendo-grid-column>

          
          <ng-template kendoGridDetailTemplate let-dataItem1 [kendoGridDetailTemplateShowIf]="showUnderLevel">
            <div *ngIf="dataItem1.Target.OutEdges">
              <app-level2 [item2]="dataItem1.Target.OutEdges"></app-level2>
            </div>
          </ng-template>

        </kendo-grid>
  `
})

// <ng-template kendoGridDetailTemplate let-dataItem1 kendoGridDetailTemplateShowIf="showUnderLevel" >
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

  showUnderLevel(dataItem: any, index: number) : boolean {
    if( dataItem == null)
       return false;

    if( dataItem.Target == null)
       return false;

    if( dataItem.Target.OutEdges == null)
       return false;

    try{
        return dataItem.Target.OutEdges.length > 0;
    }
    catch(error){
        return false;
    }
  }



//REMEMBER GRID ColumnSettings
  public gridSettings: GridSettings;

  public get savedStateExists(): boolean {
    return !!this.persistingService.get('gridSettingsLvl1');
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

    this.persistingService.set('gridSettingsLvl1', gridConfig);
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


