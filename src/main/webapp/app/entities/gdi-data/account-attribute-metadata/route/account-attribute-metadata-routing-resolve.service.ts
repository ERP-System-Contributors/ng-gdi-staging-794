import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAccountAttributeMetadata } from '../account-attribute-metadata.model';
import { AccountAttributeMetadataService } from '../service/account-attribute-metadata.service';

@Injectable({ providedIn: 'root' })
export class AccountAttributeMetadataRoutingResolveService implements Resolve<IAccountAttributeMetadata | null> {
  constructor(protected service: AccountAttributeMetadataService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAccountAttributeMetadata | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((accountAttributeMetadata: HttpResponse<IAccountAttributeMetadata>) => {
          if (accountAttributeMetadata.body) {
            return of(accountAttributeMetadata.body);
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
