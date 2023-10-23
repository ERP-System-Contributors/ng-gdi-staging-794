import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IStaffRoleType } from '../staff-role-type.model';
import { StaffRoleTypeService } from '../service/staff-role-type.service';

@Injectable({ providedIn: 'root' })
export class StaffRoleTypeRoutingResolveService implements Resolve<IStaffRoleType | null> {
  constructor(protected service: StaffRoleTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStaffRoleType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((staffRoleType: HttpResponse<IStaffRoleType>) => {
          if (staffRoleType.body) {
            return of(staffRoleType.body);
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
