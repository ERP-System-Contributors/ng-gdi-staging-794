import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICountySubCountyCode } from '../county-sub-county-code.model';
import { CountySubCountyCodeService } from '../service/county-sub-county-code.service';

@Injectable({ providedIn: 'root' })
export class CountySubCountyCodeRoutingResolveService implements Resolve<ICountySubCountyCode | null> {
  constructor(protected service: CountySubCountyCodeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICountySubCountyCode | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((countySubCountyCode: HttpResponse<ICountySubCountyCode>) => {
          if (countySubCountyCode.body) {
            return of(countySubCountyCode.body);
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
