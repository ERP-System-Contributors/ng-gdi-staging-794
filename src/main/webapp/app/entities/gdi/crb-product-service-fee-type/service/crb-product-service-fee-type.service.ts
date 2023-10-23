import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICrbProductServiceFeeType, NewCrbProductServiceFeeType } from '../crb-product-service-fee-type.model';

export type PartialUpdateCrbProductServiceFeeType = Partial<ICrbProductServiceFeeType> & Pick<ICrbProductServiceFeeType, 'id'>;

export type EntityResponseType = HttpResponse<ICrbProductServiceFeeType>;
export type EntityArrayResponseType = HttpResponse<ICrbProductServiceFeeType[]>;

@Injectable({ providedIn: 'root' })
export class CrbProductServiceFeeTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crb-product-service-fee-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/crb-product-service-fee-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crbProductServiceFeeType: NewCrbProductServiceFeeType): Observable<EntityResponseType> {
    return this.http.post<ICrbProductServiceFeeType>(this.resourceUrl, crbProductServiceFeeType, { observe: 'response' });
  }

  update(crbProductServiceFeeType: ICrbProductServiceFeeType): Observable<EntityResponseType> {
    return this.http.put<ICrbProductServiceFeeType>(
      `${this.resourceUrl}/${this.getCrbProductServiceFeeTypeIdentifier(crbProductServiceFeeType)}`,
      crbProductServiceFeeType,
      { observe: 'response' }
    );
  }

  partialUpdate(crbProductServiceFeeType: PartialUpdateCrbProductServiceFeeType): Observable<EntityResponseType> {
    return this.http.patch<ICrbProductServiceFeeType>(
      `${this.resourceUrl}/${this.getCrbProductServiceFeeTypeIdentifier(crbProductServiceFeeType)}`,
      crbProductServiceFeeType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrbProductServiceFeeType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbProductServiceFeeType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbProductServiceFeeType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCrbProductServiceFeeTypeIdentifier(crbProductServiceFeeType: Pick<ICrbProductServiceFeeType, 'id'>): number {
    return crbProductServiceFeeType.id;
  }

  compareCrbProductServiceFeeType(
    o1: Pick<ICrbProductServiceFeeType, 'id'> | null,
    o2: Pick<ICrbProductServiceFeeType, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getCrbProductServiceFeeTypeIdentifier(o1) === this.getCrbProductServiceFeeTypeIdentifier(o2) : o1 === o2;
  }

  addCrbProductServiceFeeTypeToCollectionIfMissing<Type extends Pick<ICrbProductServiceFeeType, 'id'>>(
    crbProductServiceFeeTypeCollection: Type[],
    ...crbProductServiceFeeTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crbProductServiceFeeTypes: Type[] = crbProductServiceFeeTypesToCheck.filter(isPresent);
    if (crbProductServiceFeeTypes.length > 0) {
      const crbProductServiceFeeTypeCollectionIdentifiers = crbProductServiceFeeTypeCollection.map(
        crbProductServiceFeeTypeItem => this.getCrbProductServiceFeeTypeIdentifier(crbProductServiceFeeTypeItem)!
      );
      const crbProductServiceFeeTypesToAdd = crbProductServiceFeeTypes.filter(crbProductServiceFeeTypeItem => {
        const crbProductServiceFeeTypeIdentifier = this.getCrbProductServiceFeeTypeIdentifier(crbProductServiceFeeTypeItem);
        if (crbProductServiceFeeTypeCollectionIdentifiers.includes(crbProductServiceFeeTypeIdentifier)) {
          return false;
        }
        crbProductServiceFeeTypeCollectionIdentifiers.push(crbProductServiceFeeTypeIdentifier);
        return true;
      });
      return [...crbProductServiceFeeTypesToAdd, ...crbProductServiceFeeTypeCollection];
    }
    return crbProductServiceFeeTypeCollection;
  }
}
