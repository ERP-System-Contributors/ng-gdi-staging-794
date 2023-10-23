import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICardFraudInformation } from '../card-fraud-information.model';
import { CardFraudInformationService } from '../service/card-fraud-information.service';

@Injectable({ providedIn: 'root' })
export class CardFraudInformationRoutingResolveService implements Resolve<ICardFraudInformation | null> {
  constructor(protected service: CardFraudInformationService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICardFraudInformation | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cardFraudInformation: HttpResponse<ICardFraudInformation>) => {
          if (cardFraudInformation.body) {
            return of(cardFraudInformation.body);
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
