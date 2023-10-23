import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrbProductServiceFeeType } from '../crb-product-service-fee-type.model';
import { CrbProductServiceFeeTypeService } from '../service/crb-product-service-fee-type.service';

@Injectable({ providedIn: 'root' })
export class CrbProductServiceFeeTypeRoutingResolveService implements Resolve<ICrbProductServiceFeeType | null> {
  constructor(protected service: CrbProductServiceFeeTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrbProductServiceFeeType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crbProductServiceFeeType: HttpResponse<ICrbProductServiceFeeType>) => {
          if (crbProductServiceFeeType.body) {
            return of(crbProductServiceFeeType.body);
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
