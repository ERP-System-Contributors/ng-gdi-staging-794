import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IWeeklyCashHolding } from '../weekly-cash-holding.model';
import { WeeklyCashHoldingService } from '../service/weekly-cash-holding.service';

@Injectable({ providedIn: 'root' })
export class WeeklyCashHoldingRoutingResolveService implements Resolve<IWeeklyCashHolding | null> {
  constructor(protected service: WeeklyCashHoldingService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IWeeklyCashHolding | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((weeklyCashHolding: HttpResponse<IWeeklyCashHolding>) => {
          if (weeklyCashHolding.body) {
            return of(weeklyCashHolding.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
