import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICounterPartyCategory } from '../counter-party-category.model';
import { CounterPartyCategoryService } from '../service/counter-party-category.service';

@Injectable({ providedIn: 'root' })
export class CounterPartyCategoryRoutingResolveService implements Resolve<ICounterPartyCategory | null> {
  constructor(protected service: CounterPartyCategoryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICounterPartyCategory | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((counterPartyCategory: HttpResponse<ICounterPartyCategory>) => {
          if (counterPartyCategory.body) {
            return of(counterPartyCategory.body);
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
