import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMoratoriumItem } from '../moratorium-item.model';
import { MoratoriumItemService } from '../service/moratorium-item.service';

@Injectable({ providedIn: 'root' })
export class MoratoriumItemRoutingResolveService implements Resolve<IMoratoriumItem | null> {
  constructor(protected service: MoratoriumItemService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMoratoriumItem | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((moratoriumItem: HttpResponse<IMoratoriumItem>) => {
          if (moratoriumItem.body) {
            return of(moratoriumItem.body);
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
