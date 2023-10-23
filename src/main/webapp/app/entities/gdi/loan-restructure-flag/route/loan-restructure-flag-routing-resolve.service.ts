import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILoanRestructureFlag } from '../loan-restructure-flag.model';
import { LoanRestructureFlagService } from '../service/loan-restructure-flag.service';

@Injectable({ providedIn: 'root' })
export class LoanRestructureFlagRoutingResolveService implements Resolve<ILoanRestructureFlag | null> {
  constructor(protected service: LoanRestructureFlagService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILoanRestructureFlag | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((loanRestructureFlag: HttpResponse<ILoanRestructureFlag>) => {
          if (loanRestructureFlag.body) {
            return of(loanRestructureFlag.body);
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
