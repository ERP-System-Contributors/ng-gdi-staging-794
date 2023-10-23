import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUltimateBeneficiaryCategory } from '../ultimate-beneficiary-category.model';
import { UltimateBeneficiaryCategoryService } from '../service/ultimate-beneficiary-category.service';

@Injectable({ providedIn: 'root' })
export class UltimateBeneficiaryCategoryRoutingResolveService implements Resolve<IUltimateBeneficiaryCategory | null> {
  constructor(protected service: UltimateBeneficiaryCategoryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUltimateBeneficiaryCategory | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((ultimateBeneficiaryCategory: HttpResponse<IUltimateBeneficiaryCategory>) => {
          if (ultimateBeneficiaryCategory.body) {
            return of(ultimateBeneficiaryCategory.body);
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
