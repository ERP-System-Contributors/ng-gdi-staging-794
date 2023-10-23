import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrbCreditApplicationStatus } from '../crb-credit-application-status.model';
import { CrbCreditApplicationStatusService } from '../service/crb-credit-application-status.service';

@Injectable({ providedIn: 'root' })
export class CrbCreditApplicationStatusRoutingResolveService implements Resolve<ICrbCreditApplicationStatus | null> {
  constructor(protected service: CrbCreditApplicationStatusService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrbCreditApplicationStatus | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crbCreditApplicationStatus: HttpResponse<ICrbCreditApplicationStatus>) => {
          if (crbCreditApplicationStatus.body) {
            return of(crbCreditApplicationStatus.body);
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
