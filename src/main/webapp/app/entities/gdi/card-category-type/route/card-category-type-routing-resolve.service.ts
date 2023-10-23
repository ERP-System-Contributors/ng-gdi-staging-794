import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICardCategoryType } from '../card-category-type.model';
import { CardCategoryTypeService } from '../service/card-category-type.service';

@Injectable({ providedIn: 'root' })
export class CardCategoryTypeRoutingResolveService implements Resolve<ICardCategoryType | null> {
  constructor(protected service: CardCategoryTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICardCategoryType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cardCategoryType: HttpResponse<ICardCategoryType>) => {
          if (cardCategoryType.body) {
            return of(cardCategoryType.body);
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
