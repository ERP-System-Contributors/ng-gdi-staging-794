import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICounterPartyDealType } from '../counter-party-deal-type.model';
import { CounterPartyDealTypeService } from '../service/counter-party-deal-type.service';

@Injectable({ providedIn: 'root' })
export class CounterPartyDealTypeRoutingResolveService implements Resolve<ICounterPartyDealType | null> {
  constructor(protected service: CounterPartyDealTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICounterPartyDealType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((counterPartyDealType: HttpResponse<ICounterPartyDealType>) => {
          if (counterPartyDealType.body) {
            return of(counterPartyDealType.body);
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
