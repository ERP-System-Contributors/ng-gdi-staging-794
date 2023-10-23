import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILoanApplicationType } from '../loan-application-type.model';
import { LoanApplicationTypeService } from '../service/loan-application-type.service';

@Injectable({ providedIn: 'root' })
export class LoanApplicationTypeRoutingResolveService implements Resolve<ILoanApplicationType | null> {
  constructor(protected service: LoanApplicationTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILoanApplicationType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((loanApplicationType: HttpResponse<ILoanApplicationType>) => {
          if (loanApplicationType.body) {
            return of(loanApplicationType.body);
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
