import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IIsicEconomicActivity } from '../isic-economic-activity.model';
import { IsicEconomicActivityService } from '../service/isic-economic-activity.service';

@Injectable({ providedIn: 'root' })
export class IsicEconomicActivityRoutingResolveService implements Resolve<IIsicEconomicActivity | null> {
  constructor(protected service: IsicEconomicActivityService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IIsicEconomicActivity | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((isicEconomicActivity: HttpResponse<IIsicEconomicActivity>) => {
          if (isicEconomicActivity.body) {
            return of(isicEconomicActivity.body);
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
