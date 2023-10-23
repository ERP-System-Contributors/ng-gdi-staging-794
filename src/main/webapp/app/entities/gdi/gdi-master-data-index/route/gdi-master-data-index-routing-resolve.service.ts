import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IGdiMasterDataIndex } from '../gdi-master-data-index.model';
import { GdiMasterDataIndexService } from '../service/gdi-master-data-index.service';

@Injectable({ providedIn: 'root' })
export class GdiMasterDataIndexRoutingResolveService implements Resolve<IGdiMasterDataIndex | null> {
  constructor(protected service: GdiMasterDataIndexService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGdiMasterDataIndex | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((gdiMasterDataIndex: HttpResponse<IGdiMasterDataIndex>) => {
          if (gdiMasterDataIndex.body) {
            return of(gdiMasterDataIndex.body);
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
