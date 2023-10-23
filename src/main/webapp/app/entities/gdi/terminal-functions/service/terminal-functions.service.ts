import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ITerminalFunctions, NewTerminalFunctions } from '../terminal-functions.model';

export type PartialUpdateTerminalFunctions = Partial<ITerminalFunctions> & Pick<ITerminalFunctions, 'id'>;

export type EntityResponseType = HttpResponse<ITerminalFunctions>;
export type EntityArrayResponseType = HttpResponse<ITerminalFunctions[]>;

@Injectable({ providedIn: 'root' })
export class TerminalFunctionsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/terminal-functions');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/terminal-functions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(terminalFunctions: NewTerminalFunctions): Observable<EntityResponseType> {
    return this.http.post<ITerminalFunctions>(this.resourceUrl, terminalFunctions, { observe: 'response' });
  }

  update(terminalFunctions: ITerminalFunctions): Observable<EntityResponseType> {
    return this.http.put<ITerminalFunctions>(
      `${this.resourceUrl}/${this.getTerminalFunctionsIdentifier(terminalFunctions)}`,
      terminalFunctions,
      { observe: 'response' }
    );
  }

  partialUpdate(terminalFunctions: PartialUpdateTerminalFunctions): Observable<EntityResponseType> {
    return this.http.patch<ITerminalFunctions>(
      `${this.resourceUrl}/${this.getTerminalFunctionsIdentifier(terminalFunctions)}`,
      terminalFunctions,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITerminalFunctions>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITerminalFunctions[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITerminalFunctions[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getTerminalFunctionsIdentifier(terminalFunctions: Pick<ITerminalFunctions, 'id'>): number {
    return terminalFunctions.id;
  }

  compareTerminalFunctions(o1: Pick<ITerminalFunctions, 'id'> | null, o2: Pick<ITerminalFunctions, 'id'> | null): boolean {
    return o1 && o2 ? this.getTerminalFunctionsIdentifier(o1) === this.getTerminalFunctionsIdentifier(o2) : o1 === o2;
  }

  addTerminalFunctionsToCollectionIfMissing<Type extends Pick<ITerminalFunctions, 'id'>>(
    terminalFunctionsCollection: Type[],
    ...terminalFunctionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const terminalFunctions: Type[] = terminalFunctionsToCheck.filter(isPresent);
    if (terminalFunctions.length > 0) {
      const terminalFunctionsCollectionIdentifiers = terminalFunctionsCollection.map(
        terminalFunctionsItem => this.getTerminalFunctionsIdentifier(terminalFunctionsItem)!
      );
      const terminalFunctionsToAdd = terminalFunctions.filter(terminalFunctionsItem => {
        const terminalFunctionsIdentifier = this.getTerminalFunctionsIdentifier(terminalFunctionsItem);
        if (terminalFunctionsCollectionIdentifiers.includes(terminalFunctionsIdentifier)) {
          return false;
        }
        terminalFunctionsCollectionIdentifiers.push(terminalFunctionsIdentifier);
        return true;
      });
      return [...terminalFunctionsToAdd, ...terminalFunctionsCollection];
    }
    return terminalFunctionsCollection;
  }
}
