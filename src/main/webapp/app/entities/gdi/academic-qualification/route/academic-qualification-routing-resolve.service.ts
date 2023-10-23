import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAcademicQualification } from '../academic-qualification.model';
import { AcademicQualificationService } from '../service/academic-qualification.service';

@Injectable({ providedIn: 'root' })
export class AcademicQualificationRoutingResolveService implements Resolve<IAcademicQualification | null> {
  constructor(protected service: AcademicQualificationService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAcademicQualification | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((academicQualification: HttpResponse<IAcademicQualification>) => {
          if (academicQualification.body) {
            return of(academicQualification.body);
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
