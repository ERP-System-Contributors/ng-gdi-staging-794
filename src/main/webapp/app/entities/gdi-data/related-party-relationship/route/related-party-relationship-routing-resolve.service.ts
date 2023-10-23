import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRelatedPartyRelationship } from '../related-party-relationship.model';
import { RelatedPartyRelationshipService } from '../service/related-party-relationship.service';

@Injectable({ providedIn: 'root' })
export class RelatedPartyRelationshipRoutingResolveService implements Resolve<IRelatedPartyRelationship | null> {
  constructor(protected service: RelatedPartyRelationshipService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRelatedPartyRelationship | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((relatedPartyRelationship: HttpResponse<IRelatedPartyRelationship>) => {
          if (relatedPartyRelationship.body) {
            return of(relatedPartyRelationship.body);
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
