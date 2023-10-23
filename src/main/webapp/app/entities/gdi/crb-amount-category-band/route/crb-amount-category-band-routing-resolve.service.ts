import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrbAmountCategoryBand } from '../crb-amount-category-band.model';
import { CrbAmountCategoryBandService } from '../service/crb-amount-category-band.service';

@Injectable({ providedIn: 'root' })
export class CrbAmountCategoryBandRoutingResolveService implements Resolve<ICrbAmountCategoryBand | null> {
  constructor(protected service: CrbAmountCategoryBandService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrbAmountCategoryBand | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crbAmountCategoryBand: HttpResponse<ICrbAmountCategoryBand>) => {
          if (crbAmountCategoryBand.body) {
            return of(crbAmountCategoryBand.body);
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
