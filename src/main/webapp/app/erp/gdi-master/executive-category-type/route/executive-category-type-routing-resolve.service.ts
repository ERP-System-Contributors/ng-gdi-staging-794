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

import { IExecutiveCategoryType } from '../executive-category-type.model';
import { ExecutiveCategoryTypeService } from '../service/executive-category-type.service';

@Injectable({ providedIn: 'root' })
export class ExecutiveCategoryTypeRoutingResolveService implements Resolve<IExecutiveCategoryType | null> {
  constructor(protected service: ExecutiveCategoryTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExecutiveCategoryType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((executiveCategoryType: HttpResponse<IExecutiveCategoryType>) => {
          if (executiveCategoryType.body) {
            return of(executiveCategoryType.body);
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
