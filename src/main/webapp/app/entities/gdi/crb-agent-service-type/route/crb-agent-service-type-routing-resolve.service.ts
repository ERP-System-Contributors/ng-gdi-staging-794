import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrbAgentServiceType } from '../crb-agent-service-type.model';
import { CrbAgentServiceTypeService } from '../service/crb-agent-service-type.service';

@Injectable({ providedIn: 'root' })
export class CrbAgentServiceTypeRoutingResolveService implements Resolve<ICrbAgentServiceType | null> {
  constructor(protected service: CrbAgentServiceTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrbAgentServiceType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crbAgentServiceType: HttpResponse<ICrbAgentServiceType>) => {
          if (crbAgentServiceType.body) {
            return of(crbAgentServiceType.body);
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
