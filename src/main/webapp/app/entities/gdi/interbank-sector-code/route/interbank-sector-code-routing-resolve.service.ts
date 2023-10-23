import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IInterbankSectorCode } from '../interbank-sector-code.model';
import { InterbankSectorCodeService } from '../service/interbank-sector-code.service';

@Injectable({ providedIn: 'root' })
export class InterbankSectorCodeRoutingResolveService implements Resolve<IInterbankSectorCode | null> {
  constructor(protected service: InterbankSectorCodeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInterbankSectorCode | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((interbankSectorCode: HttpResponse<IInterbankSectorCode>) => {
          if (interbankSectorCode.body) {
            return of(interbankSectorCode.body);
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
