import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IKenyanCurrencyDenomination } from '../kenyan-currency-denomination.model';
import { KenyanCurrencyDenominationService } from '../service/kenyan-currency-denomination.service';

@Injectable({ providedIn: 'root' })
export class KenyanCurrencyDenominationRoutingResolveService implements Resolve<IKenyanCurrencyDenomination | null> {
  constructor(protected service: KenyanCurrencyDenominationService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IKenyanCurrencyDenomination | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((kenyanCurrencyDenomination: HttpResponse<IKenyanCurrencyDenomination>) => {
          if (kenyanCurrencyDenomination.body) {
            return of(kenyanCurrencyDenomination.body);
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
