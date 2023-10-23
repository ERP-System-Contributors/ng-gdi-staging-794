import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICardCharges } from '../card-charges.model';
import { CardChargesService } from '../service/card-charges.service';

@Injectable({ providedIn: 'root' })
export class CardChargesRoutingResolveService implements Resolve<ICardCharges | null> {
  constructor(protected service: CardChargesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICardCharges | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((cardCharges: HttpResponse<ICardCharges>) => {
          if (cardCharges.body) {
            return of(cardCharges.body);
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
