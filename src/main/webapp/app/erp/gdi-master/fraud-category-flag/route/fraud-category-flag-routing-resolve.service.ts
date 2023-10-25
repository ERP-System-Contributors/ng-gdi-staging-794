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

import { IFraudCategoryFlag } from '../fraud-category-flag.model';
import { FraudCategoryFlagService } from '../service/fraud-category-flag.service';

@Injectable({ providedIn: 'root' })
export class FraudCategoryFlagRoutingResolveService implements Resolve<IFraudCategoryFlag | null> {
  constructor(protected service: FraudCategoryFlagService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFraudCategoryFlag | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((fraudCategoryFlag: HttpResponse<IFraudCategoryFlag>) => {
          if (fraudCategoryFlag.body) {
            return of(fraudCategoryFlag.body);
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
