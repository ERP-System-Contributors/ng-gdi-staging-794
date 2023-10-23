import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILoanProductType } from '../loan-product-type.model';
import { LoanProductTypeService } from '../service/loan-product-type.service';

@Injectable({ providedIn: 'root' })
export class LoanProductTypeRoutingResolveService implements Resolve<ILoanProductType | null> {
  constructor(protected service: LoanProductTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILoanProductType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((loanProductType: HttpResponse<ILoanProductType>) => {
          if (loanProductType.body) {
            return of(loanProductType.body);
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
