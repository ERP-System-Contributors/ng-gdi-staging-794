import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ITerminalTypes, NewTerminalTypes } from '../terminal-types.model';

export type PartialUpdateTerminalTypes = Partial<ITerminalTypes> & Pick<ITerminalTypes, 'id'>;

export type EntityResponseType = HttpResponse<ITerminalTypes>;
export type EntityArrayResponseType = HttpResponse<ITerminalTypes[]>;

@Injectable({ providedIn: 'root' })
export class TerminalTypesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/terminal-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/terminal-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(terminalTypes: NewTerminalTypes): Observable<EntityResponseType> {
    return this.http.post<ITerminalTypes>(this.resourceUrl, terminalTypes, { observe: 'response' });
  }

  update(terminalTypes: ITerminalTypes): Observable<EntityResponseType> {
    return this.http.put<ITerminalTypes>(`${this.resourceUrl}/${this.getTerminalTypesIdentifier(terminalTypes)}`, terminalTypes, {
      observe: 'response',
    });
  }

  partialUpdate(terminalTypes: PartialUpdateTerminalTypes): Observable<EntityResponseType> {
    return this.http.patch<ITerminalTypes>(`${this.resourceUrl}/${this.getTerminalTypesIdentifier(terminalTypes)}`, terminalTypes, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITerminalTypes>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITerminalTypes[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITerminalTypes[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getTerminalTypesIdentifier(terminalTypes: Pick<ITerminalTypes, 'id'>): number {
    return terminalTypes.id;
  }

  compareTerminalTypes(o1: Pick<ITerminalTypes, 'id'> | null, o2: Pick<ITerminalTypes, 'id'> | null): boolean {
    return o1 && o2 ? this.getTerminalTypesIdentifier(o1) === this.getTerminalTypesIdentifier(o2) : o1 === o2;
  }

  addTerminalTypesToCollectionIfMissing<Type extends Pick<ITerminalTypes, 'id'>>(
    terminalTypesCollection: Type[],
    ...terminalTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const terminalTypes: Type[] = terminalTypesToCheck.filter(isPresent);
    if (terminalTypes.length > 0) {
      const terminalTypesCollectionIdentifiers = terminalTypesCollection.map(
        terminalTypesItem => this.getTerminalTypesIdentifier(terminalTypesItem)!
      );
      const terminalTypesToAdd = terminalTypes.filter(terminalTypesItem => {
        const terminalTypesIdentifier = this.getTerminalTypesIdentifier(terminalTypesItem);
        if (terminalTypesCollectionIdentifiers.includes(terminalTypesIdentifier)) {
          return false;
        }
        terminalTypesCollectionIdentifiers.push(terminalTypesIdentifier);
        return true;
      });
      return [...terminalTypesToAdd, ...terminalTypesCollection];
    }
    return terminalTypesCollection;
  }
}
