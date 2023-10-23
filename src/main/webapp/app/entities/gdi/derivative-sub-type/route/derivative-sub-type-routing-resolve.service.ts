import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDerivativeSubType } from '../derivative-sub-type.model';
import { DerivativeSubTypeService } from '../service/derivative-sub-type.service';

@Injectable({ providedIn: 'root' })
export class DerivativeSubTypeRoutingResolveService implements Resolve<IDerivativeSubType | null> {
  constructor(protected service: DerivativeSubTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDerivativeSubType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((derivativeSubType: HttpResponse<IDerivativeSubType>) => {
          if (derivativeSubType.body) {
            return of(derivativeSubType.body);
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
