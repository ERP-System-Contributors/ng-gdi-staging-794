import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INatureOfCustomerComplaints } from '../nature-of-customer-complaints.model';
import { NatureOfCustomerComplaintsService } from '../service/nature-of-customer-complaints.service';

@Injectable({ providedIn: 'root' })
export class NatureOfCustomerComplaintsRoutingResolveService implements Resolve<INatureOfCustomerComplaints | null> {
  constructor(protected service: NatureOfCustomerComplaintsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INatureOfCustomerComplaints | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((natureOfCustomerComplaints: HttpResponse<INatureOfCustomerComplaints>) => {
          if (natureOfCustomerComplaints.body) {
            return of(natureOfCustomerComplaints.body);
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
