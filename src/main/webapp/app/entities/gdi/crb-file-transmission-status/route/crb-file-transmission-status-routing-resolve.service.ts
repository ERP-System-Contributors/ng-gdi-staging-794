import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrbFileTransmissionStatus } from '../crb-file-transmission-status.model';
import { CrbFileTransmissionStatusService } from '../service/crb-file-transmission-status.service';

@Injectable({ providedIn: 'root' })
export class CrbFileTransmissionStatusRoutingResolveService implements Resolve<ICrbFileTransmissionStatus | null> {
  constructor(protected service: CrbFileTransmissionStatusService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrbFileTransmissionStatus | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crbFileTransmissionStatus: HttpResponse<ICrbFileTransmissionStatus>) => {
          if (crbFileTransmissionStatus.body) {
            return of(crbFileTransmissionStatus.body);
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
