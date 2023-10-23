import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IInterbankSectorCode, NewInterbankSectorCode } from '../interbank-sector-code.model';

export type PartialUpdateInterbankSectorCode = Partial<IInterbankSectorCode> & Pick<IInterbankSectorCode, 'id'>;

export type EntityResponseType = HttpResponse<IInterbankSectorCode>;
export type EntityArrayResponseType = HttpResponse<IInterbankSectorCode[]>;

@Injectable({ providedIn: 'root' })
export class InterbankSectorCodeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/interbank-sector-codes');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/interbank-sector-codes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(interbankSectorCode: NewInterbankSectorCode): Observable<EntityResponseType> {
    return this.http.post<IInterbankSectorCode>(this.resourceUrl, interbankSectorCode, { observe: 'response' });
  }

  update(interbankSectorCode: IInterbankSectorCode): Observable<EntityResponseType> {
    return this.http.put<IInterbankSectorCode>(
      `${this.resourceUrl}/${this.getInterbankSectorCodeIdentifier(interbankSectorCode)}`,
      interbankSectorCode,
      { observe: 'response' }
    );
  }

  partialUpdate(interbankSectorCode: PartialUpdateInterbankSectorCode): Observable<EntityResponseType> {
    return this.http.patch<IInterbankSectorCode>(
      `${this.resourceUrl}/${this.getInterbankSectorCodeIdentifier(interbankSectorCode)}`,
      interbankSectorCode,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInterbankSectorCode>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInterbankSectorCode[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInterbankSectorCode[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getInterbankSectorCodeIdentifier(interbankSectorCode: Pick<IInterbankSectorCode, 'id'>): number {
    return interbankSectorCode.id;
  }

  compareInterbankSectorCode(o1: Pick<IInterbankSectorCode, 'id'> | null, o2: Pick<IInterbankSectorCode, 'id'> | null): boolean {
    return o1 && o2 ? this.getInterbankSectorCodeIdentifier(o1) === this.getInterbankSectorCodeIdentifier(o2) : o1 === o2;
  }

  addInterbankSectorCodeToCollectionIfMissing<Type extends Pick<IInterbankSectorCode, 'id'>>(
    interbankSectorCodeCollection: Type[],
    ...interbankSectorCodesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const interbankSectorCodes: Type[] = interbankSectorCodesToCheck.filter(isPresent);
    if (interbankSectorCodes.length > 0) {
      const interbankSectorCodeCollectionIdentifiers = interbankSectorCodeCollection.map(
        interbankSectorCodeItem => this.getInterbankSectorCodeIdentifier(interbankSectorCodeItem)!
      );
      const interbankSectorCodesToAdd = interbankSectorCodes.filter(interbankSectorCodeItem => {
        const interbankSectorCodeIdentifier = this.getInterbankSectorCodeIdentifier(interbankSectorCodeItem);
        if (interbankSectorCodeCollectionIdentifiers.includes(interbankSectorCodeIdentifier)) {
          return false;
        }
        interbankSectorCodeCollectionIdentifiers.push(interbankSectorCodeIdentifier);
        return true;
      });
      return [...interbankSectorCodesToAdd, ...interbankSectorCodeCollection];
    }
    return interbankSectorCodeCollection;
  }
}
