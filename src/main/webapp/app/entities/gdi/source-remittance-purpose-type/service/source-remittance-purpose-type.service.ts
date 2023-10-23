import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ISourceRemittancePurposeType, NewSourceRemittancePurposeType } from '../source-remittance-purpose-type.model';

export type PartialUpdateSourceRemittancePurposeType = Partial<ISourceRemittancePurposeType> & Pick<ISourceRemittancePurposeType, 'id'>;

export type EntityResponseType = HttpResponse<ISourceRemittancePurposeType>;
export type EntityArrayResponseType = HttpResponse<ISourceRemittancePurposeType[]>;

@Injectable({ providedIn: 'root' })
export class SourceRemittancePurposeTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/source-remittance-purpose-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/source-remittance-purpose-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(sourceRemittancePurposeType: NewSourceRemittancePurposeType): Observable<EntityResponseType> {
    return this.http.post<ISourceRemittancePurposeType>(this.resourceUrl, sourceRemittancePurposeType, { observe: 'response' });
  }

  update(sourceRemittancePurposeType: ISourceRemittancePurposeType): Observable<EntityResponseType> {
    return this.http.put<ISourceRemittancePurposeType>(
      `${this.resourceUrl}/${this.getSourceRemittancePurposeTypeIdentifier(sourceRemittancePurposeType)}`,
      sourceRemittancePurposeType,
      { observe: 'response' }
    );
  }

  partialUpdate(sourceRemittancePurposeType: PartialUpdateSourceRemittancePurposeType): Observable<EntityResponseType> {
    return this.http.patch<ISourceRemittancePurposeType>(
      `${this.resourceUrl}/${this.getSourceRemittancePurposeTypeIdentifier(sourceRemittancePurposeType)}`,
      sourceRemittancePurposeType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISourceRemittancePurposeType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISourceRemittancePurposeType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISourceRemittancePurposeType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getSourceRemittancePurposeTypeIdentifier(sourceRemittancePurposeType: Pick<ISourceRemittancePurposeType, 'id'>): number {
    return sourceRemittancePurposeType.id;
  }

  compareSourceRemittancePurposeType(
    o1: Pick<ISourceRemittancePurposeType, 'id'> | null,
    o2: Pick<ISourceRemittancePurposeType, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getSourceRemittancePurposeTypeIdentifier(o1) === this.getSourceRemittancePurposeTypeIdentifier(o2) : o1 === o2;
  }

  addSourceRemittancePurposeTypeToCollectionIfMissing<Type extends Pick<ISourceRemittancePurposeType, 'id'>>(
    sourceRemittancePurposeTypeCollection: Type[],
    ...sourceRemittancePurposeTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const sourceRemittancePurposeTypes: Type[] = sourceRemittancePurposeTypesToCheck.filter(isPresent);
    if (sourceRemittancePurposeTypes.length > 0) {
      const sourceRemittancePurposeTypeCollectionIdentifiers = sourceRemittancePurposeTypeCollection.map(
        sourceRemittancePurposeTypeItem => this.getSourceRemittancePurposeTypeIdentifier(sourceRemittancePurposeTypeItem)!
      );
      const sourceRemittancePurposeTypesToAdd = sourceRemittancePurposeTypes.filter(sourceRemittancePurposeTypeItem => {
        const sourceRemittancePurposeTypeIdentifier = this.getSourceRemittancePurposeTypeIdentifier(sourceRemittancePurposeTypeItem);
        if (sourceRemittancePurposeTypeCollectionIdentifiers.includes(sourceRemittancePurposeTypeIdentifier)) {
          return false;
        }
        sourceRemittancePurposeTypeCollectionIdentifiers.push(sourceRemittancePurposeTypeIdentifier);
        return true;
      });
      return [...sourceRemittancePurposeTypesToAdd, ...sourceRemittancePurposeTypeCollection];
    }
    return sourceRemittancePurposeTypeCollection;
  }
}
