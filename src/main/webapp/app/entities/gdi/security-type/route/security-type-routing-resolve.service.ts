import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISecurityType } from '../security-type.model';
import { SecurityTypeService } from '../service/security-type.service';

@Injectable({ providedIn: 'root' })
export class SecurityTypeRoutingResolveService implements Resolve<ISecurityType | null> {
  constructor(protected service: SecurityTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISecurityType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((securityType: HttpResponse<ISecurityType>) => {
          if (securityType.body) {
            return of(securityType.body);
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
