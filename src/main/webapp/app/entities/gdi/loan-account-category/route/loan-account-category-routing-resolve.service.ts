import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILoanAccountCategory } from '../loan-account-category.model';
import { LoanAccountCategoryService } from '../service/loan-account-category.service';

@Injectable({ providedIn: 'root' })
export class LoanAccountCategoryRoutingResolveService implements Resolve<ILoanAccountCategory | null> {
  constructor(protected service: LoanAccountCategoryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILoanAccountCategory | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((loanAccountCategory: HttpResponse<ILoanAccountCategory>) => {
          if (loanAccountCategory.body) {
            return of(loanAccountCategory.body);
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
