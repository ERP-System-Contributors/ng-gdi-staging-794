import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICurrencyServiceabilityFlag } from '../currency-serviceability-flag.model';
import { CurrencyServiceabilityFlagService } from '../service/currency-serviceability-flag.service';

@Injectable({ providedIn: 'root' })
export class CurrencyServiceabilityFlagRoutingResolveService implements Resolve<ICurrencyServiceabilityFlag | null> {
  constructor(protected service: CurrencyServiceabilityFlagService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICurrencyServiceabilityFlag | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((currencyServiceabilityFlag: HttpResponse<ICurrencyServiceabilityFlag>) => {
          if (currencyServiceabilityFlag.body) {
            return of(currencyServiceabilityFlag.body);
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
