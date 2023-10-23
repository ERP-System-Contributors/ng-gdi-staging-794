import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFiscalMonth } from '../fiscal-month.model';
import { FiscalMonthService } from '../service/fiscal-month.service';

@Injectable({ providedIn: 'root' })
export class FiscalMonthRoutingResolveService implements Resolve<IFiscalMonth | null> {
  constructor(protected service: FiscalMonthService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFiscalMonth | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((fiscalMonth: HttpResponse<IFiscalMonth>) => {
          if (fiscalMonth.body) {
            return of(fiscalMonth.body);
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
