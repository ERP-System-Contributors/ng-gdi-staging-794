import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDerivativeUnderlyingAsset } from '../derivative-underlying-asset.model';
import { DerivativeUnderlyingAssetService } from '../service/derivative-underlying-asset.service';

@Injectable({ providedIn: 'root' })
export class DerivativeUnderlyingAssetRoutingResolveService implements Resolve<IDerivativeUnderlyingAsset | null> {
  constructor(protected service: DerivativeUnderlyingAssetService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDerivativeUnderlyingAsset | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((derivativeUnderlyingAsset: HttpResponse<IDerivativeUnderlyingAsset>) => {
          if (derivativeUnderlyingAsset.body) {
            return of(derivativeUnderlyingAsset.body);
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
