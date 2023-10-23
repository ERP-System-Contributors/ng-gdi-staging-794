import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrbGlCode } from '../crb-gl-code.model';
import { CrbGlCodeService } from '../service/crb-gl-code.service';

@Injectable({ providedIn: 'root' })
export class CrbGlCodeRoutingResolveService implements Resolve<ICrbGlCode | null> {
  constructor(protected service: CrbGlCodeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrbGlCode | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crbGlCode: HttpResponse<ICrbGlCode>) => {
          if (crbGlCode.body) {
            return of(crbGlCode.body);
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
