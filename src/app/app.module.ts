import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { HeroService } from './hero.service';
import { HeroesComponent } from './heroes/heroes.component';
import { CalculationsComponent } from './calculations/calculations.component';
import { CalculationService } from './calculation.service';
import { TableComponent } from './table/table.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { Level2Component } from './level2/level2.component';
import { Level3Component } from './level3/level3.component';
import { Level4Component } from './level4/level4.component';
import { Level1Component } from './level1/level1.component';
import { CalculationComponent } from './calculation/calculation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports:      [ BrowserModule, FormsModule, GridModule, BrowserAnimationsModule],
  declarations: [ AppComponent, HelloComponent, HeroesComponent, CalculationsComponent, TableComponent, Level2Component, Level3Component, Level4Component, Level1Component, CalculationComponent ],
  bootstrap:    [ AppComponent ],
  providers: [HeroService, CalculationService]
})
export class AppModule { }
