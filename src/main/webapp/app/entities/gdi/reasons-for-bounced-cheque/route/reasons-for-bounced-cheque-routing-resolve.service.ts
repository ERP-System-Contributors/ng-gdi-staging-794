import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IReasonsForBouncedCheque } from '../reasons-for-bounced-cheque.model';
import { ReasonsForBouncedChequeService } from '../service/reasons-for-bounced-cheque.service';

@Injectable({ providedIn: 'root' })
export class ReasonsForBouncedChequeRoutingResolveService implements Resolve<IReasonsForBouncedCheque | null> {
  constructor(protected service: ReasonsForBouncedChequeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IReasonsForBouncedCheque | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((reasonsForBouncedCheque: HttpResponse<IReasonsForBouncedCheque>) => {
          if (reasonsForBouncedCheque.body) {
            return of(reasonsForBouncedCheque.body);
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
