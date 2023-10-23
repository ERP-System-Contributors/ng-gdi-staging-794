import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICrbAccountHolderType, NewCrbAccountHolderType } from '../crb-account-holder-type.model';

export type PartialUpdateCrbAccountHolderType = Partial<ICrbAccountHolderType> & Pick<ICrbAccountHolderType, 'id'>;

export type EntityResponseType = HttpResponse<ICrbAccountHolderType>;
export type EntityArrayResponseType = HttpResponse<ICrbAccountHolderType[]>;

@Injectable({ providedIn: 'root' })
export class CrbAccountHolderTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crb-account-holder-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/crb-account-holder-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crbAccountHolderType: NewCrbAccountHolderType): Observable<EntityResponseType> {
    return this.http.post<ICrbAccountHolderType>(this.resourceUrl, crbAccountHolderType, { observe: 'response' });
  }

  update(crbAccountHolderType: ICrbAccountHolderType): Observable<EntityResponseType> {
    return this.http.put<ICrbAccountHolderType>(
      `${this.resourceUrl}/${this.getCrbAccountHolderTypeIdentifier(crbAccountHolderType)}`,
      crbAccountHolderType,
      { observe: 'response' }
    );
  }

  partialUpdate(crbAccountHolderType: PartialUpdateCrbAccountHolderType): Observable<EntityResponseType> {
    return this.http.patch<ICrbAccountHolderType>(
      `${this.resourceUrl}/${this.getCrbAccountHolderTypeIdentifier(crbAccountHolderType)}`,
      crbAccountHolderType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrbAccountHolderType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbAccountHolderType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbAccountHolderType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCrbAccountHolderTypeIdentifier(crbAccountHolderType: Pick<ICrbAccountHolderType, 'id'>): number {
    return crbAccountHolderType.id;
  }

  compareCrbAccountHolderType(o1: Pick<ICrbAccountHolderType, 'id'> | null, o2: Pick<ICrbAccountHolderType, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrbAccountHolderTypeIdentifier(o1) === this.getCrbAccountHolderTypeIdentifier(o2) : o1 === o2;
  }

  addCrbAccountHolderTypeToCollectionIfMissing<Type extends Pick<ICrbAccountHolderType, 'id'>>(
    crbAccountHolderTypeCollection: Type[],
    ...crbAccountHolderTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crbAccountHolderTypes: Type[] = crbAccountHolderTypesToCheck.filter(isPresent);
    if (crbAccountHolderTypes.length > 0) {
      const crbAccountHolderTypeCollectionIdentifiers = crbAccountHolderTypeCollection.map(
        crbAccountHolderTypeItem => this.getCrbAccountHolderTypeIdentifier(crbAccountHolderTypeItem)!
      );
      const crbAccountHolderTypesToAdd = crbAccountHolderTypes.filter(crbAccountHolderTypeItem => {
        const crbAccountHolderTypeIdentifier = this.getCrbAccountHolderTypeIdentifier(crbAccountHolderTypeItem);
        if (crbAccountHolderTypeCollectionIdentifiers.includes(crbAccountHolderTypeIdentifier)) {
          return false;
        }
        crbAccountHolderTypeCollectionIdentifiers.push(crbAccountHolderTypeIdentifier);
        return true;
      });
      return [...crbAccountHolderTypesToAdd, ...crbAccountHolderTypeCollection];
    }
    return crbAccountHolderTypeCollection;
  }
}
