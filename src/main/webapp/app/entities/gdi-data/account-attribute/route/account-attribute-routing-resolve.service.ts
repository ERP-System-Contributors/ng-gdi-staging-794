import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAccountAttribute } from '../account-attribute.model';
import { AccountAttributeService } from '../service/account-attribute.service';

@Injectable({ providedIn: 'root' })
export class AccountAttributeRoutingResolveService implements Resolve<IAccountAttribute | null> {
  constructor(protected service: AccountAttributeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAccountAttribute | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((accountAttribute: HttpResponse<IAccountAttribute>) => {
          if (accountAttribute.body) {
            return of(accountAttribute.body);
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
