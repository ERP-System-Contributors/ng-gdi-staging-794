import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IGenderType } from '../gender-type.model';
import { GenderTypeService } from '../service/gender-type.service';

@Injectable({ providedIn: 'root' })
export class GenderTypeRoutingResolveService implements Resolve<IGenderType | null> {
  constructor(protected service: GenderTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGenderType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((genderType: HttpResponse<IGenderType>) => {
          if (genderType.body) {
            return of(genderType.body);
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
