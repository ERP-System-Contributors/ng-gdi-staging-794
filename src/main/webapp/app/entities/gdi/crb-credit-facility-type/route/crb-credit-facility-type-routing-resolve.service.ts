import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrbCreditFacilityType } from '../crb-credit-facility-type.model';
import { CrbCreditFacilityTypeService } from '../service/crb-credit-facility-type.service';

@Injectable({ providedIn: 'root' })
export class CrbCreditFacilityTypeRoutingResolveService implements Resolve<ICrbCreditFacilityType | null> {
  constructor(protected service: CrbCreditFacilityTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrbCreditFacilityType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crbCreditFacilityType: HttpResponse<ICrbCreditFacilityType>) => {
          if (crbCreditFacilityType.body) {
            return of(crbCreditFacilityType.body);
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
