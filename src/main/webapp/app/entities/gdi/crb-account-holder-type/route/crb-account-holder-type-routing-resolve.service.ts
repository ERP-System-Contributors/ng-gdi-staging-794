import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrbAccountHolderType } from '../crb-account-holder-type.model';
import { CrbAccountHolderTypeService } from '../service/crb-account-holder-type.service';

@Injectable({ providedIn: 'root' })
export class CrbAccountHolderTypeRoutingResolveService implements Resolve<ICrbAccountHolderType | null> {
  constructor(protected service: CrbAccountHolderTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrbAccountHolderType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crbAccountHolderType: HttpResponse<ICrbAccountHolderType>) => {
          if (crbAccountHolderType.body) {
            return of(crbAccountHolderType.body);
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
