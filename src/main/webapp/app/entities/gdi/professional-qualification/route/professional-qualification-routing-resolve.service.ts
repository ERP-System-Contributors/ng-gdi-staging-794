import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProfessionalQualification } from '../professional-qualification.model';
import { ProfessionalQualificationService } from '../service/professional-qualification.service';

@Injectable({ providedIn: 'root' })
export class ProfessionalQualificationRoutingResolveService implements Resolve<IProfessionalQualification | null> {
  constructor(protected service: ProfessionalQualificationService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProfessionalQualification | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((professionalQualification: HttpResponse<IProfessionalQualification>) => {
          if (professionalQualification.body) {
            return of(professionalQualification.body);
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
