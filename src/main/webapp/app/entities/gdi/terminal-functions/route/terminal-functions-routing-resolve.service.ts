import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITerminalFunctions } from '../terminal-functions.model';
import { TerminalFunctionsService } from '../service/terminal-functions.service';

@Injectable({ providedIn: 'root' })
export class TerminalFunctionsRoutingResolveService implements Resolve<ITerminalFunctions | null> {
  constructor(protected service: TerminalFunctionsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITerminalFunctions | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((terminalFunctions: HttpResponse<ITerminalFunctions>) => {
          if (terminalFunctions.body) {
            return of(terminalFunctions.body);
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
