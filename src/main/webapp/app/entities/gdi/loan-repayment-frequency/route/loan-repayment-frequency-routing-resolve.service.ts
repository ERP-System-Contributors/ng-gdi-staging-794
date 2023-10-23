import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILoanRepaymentFrequency } from '../loan-repayment-frequency.model';
import { LoanRepaymentFrequencyService } from '../service/loan-repayment-frequency.service';

@Injectable({ providedIn: 'root' })
export class LoanRepaymentFrequencyRoutingResolveService implements Resolve<ILoanRepaymentFrequency | null> {
  constructor(protected service: LoanRepaymentFrequencyService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILoanRepaymentFrequency | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((loanRepaymentFrequency: HttpResponse<ILoanRepaymentFrequency>) => {
          if (loanRepaymentFrequency.body) {
            return of(loanRepaymentFrequency.body);
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
