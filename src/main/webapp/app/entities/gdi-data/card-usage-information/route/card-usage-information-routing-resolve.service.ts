import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICardUsageInformation } from '../card-usage-information.model';
import { CardUsageInformationService } from '../service/card-usage-information.service';

@Injectable({ providedIn: 'root' })
export class CardUsageInformationRoutingResolveService implements Resolve<ICardUsageInformation | null> {
  constructor(protected service: CardUsageInformationService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICardUsageInformation | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cardUsageInformation: HttpResponse<ICardUsageInformation>) => {
          if (cardUsageInformation.body) {
            return of(cardUsageInformation.body);
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
