import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Ielement } from './ielement';
import { fastcalculations, fastcalculation } from './mock-calculation';
import { Icalculation } from './icalculation';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {

  //constructor(private messageService: MessageService) { }

  getCalculations(): Observable<Icalculation[]> {
    // TODO: send the message _after_ fetching the heroes
    //this.messageService.add('HeroService: fetched heroes');
    return of(fastcalculations);
  }

  getCalculation(): Observable<Icalculation> {
    return of(fastcalculation);
  }

}
