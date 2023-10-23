import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILoanApplicationStatus } from '../loan-application-status.model';
import { LoanApplicationStatusService } from '../service/loan-application-status.service';

@Injectable({ providedIn: 'root' })
export class LoanApplicationStatusRoutingResolveService implements Resolve<ILoanApplicationStatus | null> {
  constructor(protected service: LoanApplicationStatusService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILoanApplicationStatus | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((loanApplicationStatus: HttpResponse<ILoanApplicationStatus>) => {
          if (loanApplicationStatus.body) {
            return of(loanApplicationStatus.body);
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
