import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrbReportRequestReasons } from '../crb-report-request-reasons.model';
import { CrbReportRequestReasonsService } from '../service/crb-report-request-reasons.service';

@Injectable({ providedIn: 'root' })
export class CrbReportRequestReasonsRoutingResolveService implements Resolve<ICrbReportRequestReasons | null> {
  constructor(protected service: CrbReportRequestReasonsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrbReportRequestReasons | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crbReportRequestReasons: HttpResponse<ICrbReportRequestReasons>) => {
          if (crbReportRequestReasons.body) {
            return of(crbReportRequestReasons.body);
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
