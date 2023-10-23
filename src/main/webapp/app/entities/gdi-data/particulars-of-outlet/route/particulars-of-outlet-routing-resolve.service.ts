import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IParticularsOfOutlet } from '../particulars-of-outlet.model';
import { ParticularsOfOutletService } from '../service/particulars-of-outlet.service';

@Injectable({ providedIn: 'root' })
export class ParticularsOfOutletRoutingResolveService implements Resolve<IParticularsOfOutlet | null> {
  constructor(protected service: ParticularsOfOutletService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IParticularsOfOutlet | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((particularsOfOutlet: HttpResponse<IParticularsOfOutlet>) => {
          if (particularsOfOutlet.body) {
            return of(particularsOfOutlet.body);
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
