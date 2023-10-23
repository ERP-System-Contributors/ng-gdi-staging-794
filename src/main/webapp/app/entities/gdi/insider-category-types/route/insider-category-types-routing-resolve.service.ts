import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IInsiderCategoryTypes } from '../insider-category-types.model';
import { InsiderCategoryTypesService } from '../service/insider-category-types.service';

@Injectable({ providedIn: 'root' })
export class InsiderCategoryTypesRoutingResolveService implements Resolve<IInsiderCategoryTypes | null> {
  constructor(protected service: InsiderCategoryTypesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInsiderCategoryTypes | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((insiderCategoryTypes: HttpResponse<IInsiderCategoryTypes>) => {
          if (insiderCategoryTypes.body) {
            return of(insiderCategoryTypes.body);
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
