import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFraudCategoryFlag } from '../fraud-category-flag.model';
import { FraudCategoryFlagService } from '../service/fraud-category-flag.service';

@Injectable({ providedIn: 'root' })
export class FraudCategoryFlagRoutingResolveService implements Resolve<IFraudCategoryFlag | null> {
  constructor(protected service: FraudCategoryFlagService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFraudCategoryFlag | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((fraudCategoryFlag: HttpResponse<IFraudCategoryFlag>) => {
          if (fraudCategoryFlag.body) {
            return of(fraudCategoryFlag.body);
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
