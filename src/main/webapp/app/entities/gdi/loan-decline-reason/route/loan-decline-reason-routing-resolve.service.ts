import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILoanDeclineReason } from '../loan-decline-reason.model';
import { LoanDeclineReasonService } from '../service/loan-decline-reason.service';

@Injectable({ providedIn: 'root' })
export class LoanDeclineReasonRoutingResolveService implements Resolve<ILoanDeclineReason | null> {
  constructor(protected service: LoanDeclineReasonService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILoanDeclineReason | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((loanDeclineReason: HttpResponse<ILoanDeclineReason>) => {
          if (loanDeclineReason.body) {
            return of(loanDeclineReason.body);
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
