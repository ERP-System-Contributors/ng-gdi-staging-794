import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFxTransactionType } from '../fx-transaction-type.model';
import { FxTransactionTypeService } from '../service/fx-transaction-type.service';

@Injectable({ providedIn: 'root' })
export class FxTransactionTypeRoutingResolveService implements Resolve<IFxTransactionType | null> {
  constructor(protected service: FxTransactionTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFxTransactionType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((fxTransactionType: HttpResponse<IFxTransactionType>) => {
          if (fxTransactionType.body) {
            return of(fxTransactionType.body);
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
