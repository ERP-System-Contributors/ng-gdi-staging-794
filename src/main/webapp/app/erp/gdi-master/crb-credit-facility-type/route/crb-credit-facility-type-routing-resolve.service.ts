///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrbCreditFacilityType } from '../crb-credit-facility-type.model';
import { CrbCreditFacilityTypeService } from '../service/crb-credit-facility-type.service';

@Injectable({ providedIn: 'root' })
export class CrbCreditFacilityTypeRoutingResolveService implements Resolve<ICrbCreditFacilityType | null> {
  constructor(protected service: CrbCreditFacilityTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrbCreditFacilityType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crbCreditFacilityType: HttpResponse<ICrbCreditFacilityType>) => {
          if (crbCreditFacilityType.body) {
            return of(crbCreditFacilityType.body);
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
