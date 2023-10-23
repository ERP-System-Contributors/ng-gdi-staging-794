import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrbNatureOfInformation } from '../crb-nature-of-information.model';
import { CrbNatureOfInformationService } from '../service/crb-nature-of-information.service';

@Injectable({ providedIn: 'root' })
export class CrbNatureOfInformationRoutingResolveService implements Resolve<ICrbNatureOfInformation | null> {
  constructor(protected service: CrbNatureOfInformationService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrbNatureOfInformation | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crbNatureOfInformation: HttpResponse<ICrbNatureOfInformation>) => {
          if (crbNatureOfInformation.body) {
            return of(crbNatureOfInformation.body);
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
