import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEmploymentTerms } from '../employment-terms.model';
import { EmploymentTermsService } from '../service/employment-terms.service';

@Injectable({ providedIn: 'root' })
export class EmploymentTermsRoutingResolveService implements Resolve<IEmploymentTerms | null> {
  constructor(protected service: EmploymentTermsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmploymentTerms | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((employmentTerms: HttpResponse<IEmploymentTerms>) => {
          if (employmentTerms.body) {
            return of(employmentTerms.body);
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
