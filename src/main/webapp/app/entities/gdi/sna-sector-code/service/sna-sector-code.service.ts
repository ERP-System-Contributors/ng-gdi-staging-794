import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ISnaSectorCode, NewSnaSectorCode } from '../sna-sector-code.model';

export type PartialUpdateSnaSectorCode = Partial<ISnaSectorCode> & Pick<ISnaSectorCode, 'id'>;

export type EntityResponseType = HttpResponse<ISnaSectorCode>;
export type EntityArrayResponseType = HttpResponse<ISnaSectorCode[]>;

@Injectable({ providedIn: 'root' })
export class SnaSectorCodeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/sna-sector-codes');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/sna-sector-codes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(snaSectorCode: NewSnaSectorCode): Observable<EntityResponseType> {
    return this.http.post<ISnaSectorCode>(this.resourceUrl, snaSectorCode, { observe: 'response' });
  }

  update(snaSectorCode: ISnaSectorCode): Observable<EntityResponseType> {
    return this.http.put<ISnaSectorCode>(`${this.resourceUrl}/${this.getSnaSectorCodeIdentifier(snaSectorCode)}`, snaSectorCode, {
      observe: 'response',
    });
  }

  partialUpdate(snaSectorCode: PartialUpdateSnaSectorCode): Observable<EntityResponseType> {
    return this.http.patch<ISnaSectorCode>(`${this.resourceUrl}/${this.getSnaSectorCodeIdentifier(snaSectorCode)}`, snaSectorCode, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISnaSectorCode>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISnaSectorCode[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISnaSectorCode[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getSnaSectorCodeIdentifier(snaSectorCode: Pick<ISnaSectorCode, 'id'>): number {
    return snaSectorCode.id;
  }

  compareSnaSectorCode(o1: Pick<ISnaSectorCode, 'id'> | null, o2: Pick<ISnaSectorCode, 'id'> | null): boolean {
    return o1 && o2 ? this.getSnaSectorCodeIdentifier(o1) === this.getSnaSectorCodeIdentifier(o2) : o1 === o2;
  }

  addSnaSectorCodeToCollectionIfMissing<Type extends Pick<ISnaSectorCode, 'id'>>(
    snaSectorCodeCollection: Type[],
    ...snaSectorCodesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const snaSectorCodes: Type[] = snaSectorCodesToCheck.filter(isPresent);
    if (snaSectorCodes.length > 0) {
      const snaSectorCodeCollectionIdentifiers = snaSectorCodeCollection.map(
        snaSectorCodeItem => this.getSnaSectorCodeIdentifier(snaSectorCodeItem)!
      );
      const snaSectorCodesToAdd = snaSectorCodes.filter(snaSectorCodeItem => {
        const snaSectorCodeIdentifier = this.getSnaSectorCodeIdentifier(snaSectorCodeItem);
        if (snaSectorCodeCollectionIdentifiers.includes(snaSectorCodeIdentifier)) {
          return false;
        }
        snaSectorCodeCollectionIdentifiers.push(snaSectorCodeIdentifier);
        return true;
      });
      return [...snaSectorCodesToAdd, ...snaSectorCodeCollection];
    }
    return snaSectorCodeCollection;
  }
}
