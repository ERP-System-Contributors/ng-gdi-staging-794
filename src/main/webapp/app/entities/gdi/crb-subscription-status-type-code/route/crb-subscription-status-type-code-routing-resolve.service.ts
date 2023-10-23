import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrbSubscriptionStatusTypeCode } from '../crb-subscription-status-type-code.model';
import { CrbSubscriptionStatusTypeCodeService } from '../service/crb-subscription-status-type-code.service';

@Injectable({ providedIn: 'root' })
export class CrbSubscriptionStatusTypeCodeRoutingResolveService implements Resolve<ICrbSubscriptionStatusTypeCode | null> {
  constructor(protected service: CrbSubscriptionStatusTypeCodeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrbSubscriptionStatusTypeCode | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crbSubscriptionStatusTypeCode: HttpResponse<ICrbSubscriptionStatusTypeCode>) => {
          if (crbSubscriptionStatusTypeCode.body) {
            return of(crbSubscriptionStatusTypeCode.body);
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
