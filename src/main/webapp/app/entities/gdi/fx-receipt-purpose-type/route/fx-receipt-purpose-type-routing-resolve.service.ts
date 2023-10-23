import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IFxReceiptPurposeType } from '../fx-receipt-purpose-type.model';
import { FxReceiptPurposeTypeService } from '../service/fx-receipt-purpose-type.service';

@Injectable({ providedIn: 'root' })
export class FxReceiptPurposeTypeRoutingResolveService implements Resolve<IFxReceiptPurposeType | null> {
  constructor(protected service: FxReceiptPurposeTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFxReceiptPurposeType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((fxReceiptPurposeType: HttpResponse<IFxReceiptPurposeType>) => {
          if (fxReceiptPurposeType.body) {
            return of(fxReceiptPurposeType.body);
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
