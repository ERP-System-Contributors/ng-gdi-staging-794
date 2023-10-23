import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRemittanceFlag } from '../remittance-flag.model';
import { RemittanceFlagService } from '../service/remittance-flag.service';

@Injectable({ providedIn: 'root' })
export class RemittanceFlagRoutingResolveService implements Resolve<IRemittanceFlag | null> {
  constructor(protected service: RemittanceFlagService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRemittanceFlag | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((remittanceFlag: HttpResponse<IRemittanceFlag>) => {
          if (remittanceFlag.body) {
            return of(remittanceFlag.body);
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
