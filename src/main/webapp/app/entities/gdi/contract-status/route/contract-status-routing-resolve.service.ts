import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IContractStatus } from '../contract-status.model';
import { ContractStatusService } from '../service/contract-status.service';

@Injectable({ providedIn: 'root' })
export class ContractStatusRoutingResolveService implements Resolve<IContractStatus | null> {
  constructor(protected service: ContractStatusService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContractStatus | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((contractStatus: HttpResponse<IContractStatus>) => {
          if (contractStatus.body) {
            return of(contractStatus.body);
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
