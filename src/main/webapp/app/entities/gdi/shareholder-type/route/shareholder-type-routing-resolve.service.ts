import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IShareholderType } from '../shareholder-type.model';
import { ShareholderTypeService } from '../service/shareholder-type.service';

@Injectable({ providedIn: 'root' })
export class ShareholderTypeRoutingResolveService implements Resolve<IShareholderType | null> {
  constructor(protected service: ShareholderTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IShareholderType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((shareholderType: HttpResponse<IShareholderType>) => {
          if (shareholderType.body) {
            return of(shareholderType.body);
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
