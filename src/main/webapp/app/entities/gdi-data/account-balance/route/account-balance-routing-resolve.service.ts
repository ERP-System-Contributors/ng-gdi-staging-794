import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAccountBalance } from '../account-balance.model';
import { AccountBalanceService } from '../service/account-balance.service';

@Injectable({ providedIn: 'root' })
export class AccountBalanceRoutingResolveService implements Resolve<IAccountBalance | null> {
  constructor(protected service: AccountBalanceService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAccountBalance | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((accountBalance: HttpResponse<IAccountBalance>) => {
          if (accountBalance.body) {
            return of(accountBalance.body);
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
