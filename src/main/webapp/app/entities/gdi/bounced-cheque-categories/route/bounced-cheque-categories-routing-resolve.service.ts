import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBouncedChequeCategories } from '../bounced-cheque-categories.model';
import { BouncedChequeCategoriesService } from '../service/bounced-cheque-categories.service';

@Injectable({ providedIn: 'root' })
export class BouncedChequeCategoriesRoutingResolveService implements Resolve<IBouncedChequeCategories | null> {
  constructor(protected service: BouncedChequeCategoriesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBouncedChequeCategories | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((bouncedChequeCategories: HttpResponse<IBouncedChequeCategories>) => {
          if (bouncedChequeCategories.body) {
            return of(bouncedChequeCategories.body);
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
