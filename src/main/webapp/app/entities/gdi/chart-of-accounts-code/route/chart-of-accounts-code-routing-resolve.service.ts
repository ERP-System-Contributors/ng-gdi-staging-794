import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IChartOfAccountsCode } from '../chart-of-accounts-code.model';
import { ChartOfAccountsCodeService } from '../service/chart-of-accounts-code.service';

@Injectable({ providedIn: 'root' })
export class ChartOfAccountsCodeRoutingResolveService implements Resolve<IChartOfAccountsCode | null> {
  constructor(protected service: ChartOfAccountsCodeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IChartOfAccountsCode | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((chartOfAccountsCode: HttpResponse<IChartOfAccountsCode>) => {
          if (chartOfAccountsCode.body) {
            return of(chartOfAccountsCode.body);
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
