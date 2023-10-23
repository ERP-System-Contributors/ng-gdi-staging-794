import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISecurityTenure } from '../security-tenure.model';
import { SecurityTenureService } from '../service/security-tenure.service';

@Injectable({ providedIn: 'root' })
export class SecurityTenureRoutingResolveService implements Resolve<ISecurityTenure | null> {
  constructor(protected service: SecurityTenureService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISecurityTenure | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((securityTenure: HttpResponse<ISecurityTenure>) => {
          if (securityTenure.body) {
            return of(securityTenure.body);
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
