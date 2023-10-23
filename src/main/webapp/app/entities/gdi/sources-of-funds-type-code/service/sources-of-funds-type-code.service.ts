import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ISourcesOfFundsTypeCode, NewSourcesOfFundsTypeCode } from '../sources-of-funds-type-code.model';

export type PartialUpdateSourcesOfFundsTypeCode = Partial<ISourcesOfFundsTypeCode> & Pick<ISourcesOfFundsTypeCode, 'id'>;

export type EntityResponseType = HttpResponse<ISourcesOfFundsTypeCode>;
export type EntityArrayResponseType = HttpResponse<ISourcesOfFundsTypeCode[]>;

@Injectable({ providedIn: 'root' })
export class SourcesOfFundsTypeCodeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/sources-of-funds-type-codes');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/sources-of-funds-type-codes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(sourcesOfFundsTypeCode: NewSourcesOfFundsTypeCode): Observable<EntityResponseType> {
    return this.http.post<ISourcesOfFundsTypeCode>(this.resourceUrl, sourcesOfFundsTypeCode, { observe: 'response' });
  }

  update(sourcesOfFundsTypeCode: ISourcesOfFundsTypeCode): Observable<EntityResponseType> {
    return this.http.put<ISourcesOfFundsTypeCode>(
      `${this.resourceUrl}/${this.getSourcesOfFundsTypeCodeIdentifier(sourcesOfFundsTypeCode)}`,
      sourcesOfFundsTypeCode,
      { observe: 'response' }
    );
  }

  partialUpdate(sourcesOfFundsTypeCode: PartialUpdateSourcesOfFundsTypeCode): Observable<EntityResponseType> {
    return this.http.patch<ISourcesOfFundsTypeCode>(
      `${this.resourceUrl}/${this.getSourcesOfFundsTypeCodeIdentifier(sourcesOfFundsTypeCode)}`,
      sourcesOfFundsTypeCode,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISourcesOfFundsTypeCode>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISourcesOfFundsTypeCode[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISourcesOfFundsTypeCode[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getSourcesOfFundsTypeCodeIdentifier(sourcesOfFundsTypeCode: Pick<ISourcesOfFundsTypeCode, 'id'>): number {
    return sourcesOfFundsTypeCode.id;
  }

  compareSourcesOfFundsTypeCode(o1: Pick<ISourcesOfFundsTypeCode, 'id'> | null, o2: Pick<ISourcesOfFundsTypeCode, 'id'> | null): boolean {
    return o1 && o2 ? this.getSourcesOfFundsTypeCodeIdentifier(o1) === this.getSourcesOfFundsTypeCodeIdentifier(o2) : o1 === o2;
  }

  addSourcesOfFundsTypeCodeToCollectionIfMissing<Type extends Pick<ISourcesOfFundsTypeCode, 'id'>>(
    sourcesOfFundsTypeCodeCollection: Type[],
    ...sourcesOfFundsTypeCodesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const sourcesOfFundsTypeCodes: Type[] = sourcesOfFundsTypeCodesToCheck.filter(isPresent);
    if (sourcesOfFundsTypeCodes.length > 0) {
      const sourcesOfFundsTypeCodeCollectionIdentifiers = sourcesOfFundsTypeCodeCollection.map(
        sourcesOfFundsTypeCodeItem => this.getSourcesOfFundsTypeCodeIdentifier(sourcesOfFundsTypeCodeItem)!
      );
      const sourcesOfFundsTypeCodesToAdd = sourcesOfFundsTypeCodes.filter(sourcesOfFundsTypeCodeItem => {
        const sourcesOfFundsTypeCodeIdentifier = this.getSourcesOfFundsTypeCodeIdentifier(sourcesOfFundsTypeCodeItem);
        if (sourcesOfFundsTypeCodeCollectionIdentifiers.includes(sourcesOfFundsTypeCodeIdentifier)) {
          return false;
        }
        sourcesOfFundsTypeCodeCollectionIdentifiers.push(sourcesOfFundsTypeCodeIdentifier);
        return true;
      });
      return [...sourcesOfFundsTypeCodesToAdd, ...sourcesOfFundsTypeCodeCollection];
    }
    return sourcesOfFundsTypeCodeCollection;
  }
}
