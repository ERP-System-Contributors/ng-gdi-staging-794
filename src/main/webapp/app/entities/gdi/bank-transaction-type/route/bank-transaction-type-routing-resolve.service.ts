import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBankTransactionType } from '../bank-transaction-type.model';
import { BankTransactionTypeService } from '../service/bank-transaction-type.service';

@Injectable({ providedIn: 'root' })
export class BankTransactionTypeRoutingResolveService implements Resolve<IBankTransactionType | null> {
  constructor(protected service: BankTransactionTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBankTransactionType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((bankTransactionType: HttpResponse<IBankTransactionType>) => {
          if (bankTransactionType.body) {
            return of(bankTransactionType.body);
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
