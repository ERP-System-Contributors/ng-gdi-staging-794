import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICardState } from '../card-state.model';
import { CardStateService } from '../service/card-state.service';

@Injectable({ providedIn: 'root' })
export class CardStateRoutingResolveService implements Resolve<ICardState | null> {
  constructor(protected service: CardStateService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICardState | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cardState: HttpResponse<ICardState>) => {
          if (cardState.body) {
            return of(cardState.body);
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
