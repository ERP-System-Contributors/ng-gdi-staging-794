import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICardClassType } from '../card-class-type.model';
import { CardClassTypeService } from '../service/card-class-type.service';

@Injectable({ providedIn: 'root' })
export class CardClassTypeRoutingResolveService implements Resolve<ICardClassType | null> {
  constructor(protected service: CardClassTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICardClassType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cardClassType: HttpResponse<ICardClassType>) => {
          if (cardClassType.body) {
            return of(cardClassType.body);
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
