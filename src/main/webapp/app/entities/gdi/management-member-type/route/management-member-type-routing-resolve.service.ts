import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IManagementMemberType } from '../management-member-type.model';
import { ManagementMemberTypeService } from '../service/management-member-type.service';

@Injectable({ providedIn: 'root' })
export class ManagementMemberTypeRoutingResolveService implements Resolve<IManagementMemberType | null> {
  constructor(protected service: ManagementMemberTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IManagementMemberType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((managementMemberType: HttpResponse<IManagementMemberType>) => {
          if (managementMemberType.body) {
            return of(managementMemberType.body);
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
