import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICardBrandType } from '../card-brand-type.model';
import { CardBrandTypeService } from '../service/card-brand-type.service';

@Injectable({ providedIn: 'root' })
export class CardBrandTypeRoutingResolveService implements Resolve<ICardBrandType | null> {
  constructor(protected service: CardBrandTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICardBrandType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cardBrandType: HttpResponse<ICardBrandType>) => {
          if (cardBrandType.body) {
            return of(cardBrandType.body);
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
