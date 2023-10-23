import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICreditCardFacility } from '../credit-card-facility.model';
import { CreditCardFacilityService } from '../service/credit-card-facility.service';

@Injectable({ providedIn: 'root' })
export class CreditCardFacilityRoutingResolveService implements Resolve<ICreditCardFacility | null> {
  constructor(protected service: CreditCardFacilityService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICreditCardFacility | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((creditCardFacility: HttpResponse<ICreditCardFacility>) => {
          if (creditCardFacility.body) {
            return of(creditCardFacility.body);
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
