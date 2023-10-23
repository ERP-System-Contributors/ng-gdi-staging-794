import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IInstitutionContactDetails } from '../institution-contact-details.model';
import { InstitutionContactDetailsService } from '../service/institution-contact-details.service';

@Injectable({ providedIn: 'root' })
export class InstitutionContactDetailsRoutingResolveService implements Resolve<IInstitutionContactDetails | null> {
  constructor(protected service: InstitutionContactDetailsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IInstitutionContactDetails | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((institutionContactDetails: HttpResponse<IInstitutionContactDetails>) => {
          if (institutionContactDetails.body) {
            return of(institutionContactDetails.body);
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
