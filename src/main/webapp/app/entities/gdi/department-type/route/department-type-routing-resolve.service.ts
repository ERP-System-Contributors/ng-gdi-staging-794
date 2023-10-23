import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDepartmentType } from '../department-type.model';
import { DepartmentTypeService } from '../service/department-type.service';

@Injectable({ providedIn: 'root' })
export class DepartmentTypeRoutingResolveService implements Resolve<IDepartmentType | null> {
  constructor(protected service: DepartmentTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDepartmentType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((departmentType: HttpResponse<IDepartmentType>) => {
          if (departmentType.body) {
            return of(departmentType.body);
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
