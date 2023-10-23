import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISnaSectorCode } from '../sna-sector-code.model';
import { SnaSectorCodeService } from '../service/sna-sector-code.service';

@Injectable({ providedIn: 'root' })
export class SnaSectorCodeRoutingResolveService implements Resolve<ISnaSectorCode | null> {
  constructor(protected service: SnaSectorCodeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISnaSectorCode | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((snaSectorCode: HttpResponse<ISnaSectorCode>) => {
          if (snaSectorCode.body) {
            return of(snaSectorCode.body);
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
