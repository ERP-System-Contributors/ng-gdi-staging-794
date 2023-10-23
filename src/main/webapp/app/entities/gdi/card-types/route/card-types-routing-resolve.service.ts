import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICardTypes } from '../card-types.model';
import { CardTypesService } from '../service/card-types.service';

@Injectable({ providedIn: 'root' })
export class CardTypesRoutingResolveService implements Resolve<ICardTypes | null> {
  constructor(protected service: CardTypesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICardTypes | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cardTypes: HttpResponse<ICardTypes>) => {
          if (cardTypes.body) {
            return of(cardTypes.body);
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
