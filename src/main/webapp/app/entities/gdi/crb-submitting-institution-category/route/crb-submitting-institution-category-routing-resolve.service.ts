import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrbSubmittingInstitutionCategory } from '../crb-submitting-institution-category.model';
import { CrbSubmittingInstitutionCategoryService } from '../service/crb-submitting-institution-category.service';

@Injectable({ providedIn: 'root' })
export class CrbSubmittingInstitutionCategoryRoutingResolveService implements Resolve<ICrbSubmittingInstitutionCategory | null> {
  constructor(protected service: CrbSubmittingInstitutionCategoryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrbSubmittingInstitutionCategory | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crbSubmittingInstitutionCategory: HttpResponse<ICrbSubmittingInstitutionCategory>) => {
          if (crbSubmittingInstitutionCategory.body) {
            return of(crbSubmittingInstitutionCategory.body);
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
