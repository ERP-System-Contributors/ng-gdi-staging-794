import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICustomerComplaintStatusType } from '../customer-complaint-status-type.model';
import { CustomerComplaintStatusTypeService } from '../service/customer-complaint-status-type.service';

@Injectable({ providedIn: 'root' })
export class CustomerComplaintStatusTypeRoutingResolveService implements Resolve<ICustomerComplaintStatusType | null> {
  constructor(protected service: CustomerComplaintStatusTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICustomerComplaintStatusType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((customerComplaintStatusType: HttpResponse<ICustomerComplaintStatusType>) => {
          if (customerComplaintStatusType.body) {
            return of(customerComplaintStatusType.body);
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
