import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUltimateBeneficiaryTypes } from '../ultimate-beneficiary-types.model';
import { UltimateBeneficiaryTypesService } from '../service/ultimate-beneficiary-types.service';

@Injectable({ providedIn: 'root' })
export class UltimateBeneficiaryTypesRoutingResolveService implements Resolve<IUltimateBeneficiaryTypes | null> {
  constructor(protected service: UltimateBeneficiaryTypesService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUltimateBeneficiaryTypes | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((ultimateBeneficiaryTypes: HttpResponse<IUltimateBeneficiaryTypes>) => {
          if (ultimateBeneficiaryTypes.body) {
            return of(ultimateBeneficiaryTypes.body);
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
