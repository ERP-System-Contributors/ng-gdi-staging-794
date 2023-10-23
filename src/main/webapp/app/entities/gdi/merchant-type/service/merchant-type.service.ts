import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { IMerchantType, NewMerchantType } from '../merchant-type.model';

export type PartialUpdateMerchantType = Partial<IMerchantType> & Pick<IMerchantType, 'id'>;

export type EntityResponseType = HttpResponse<IMerchantType>;
export type EntityArrayResponseType = HttpResponse<IMerchantType[]>;

@Injectable({ providedIn: 'root' })
export class MerchantTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/merchant-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/merchant-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(merchantType: NewMerchantType): Observable<EntityResponseType> {
    return this.http.post<IMerchantType>(this.resourceUrl, merchantType, { observe: 'response' });
  }

  update(merchantType: IMerchantType): Observable<EntityResponseType> {
    return this.http.put<IMerchantType>(`${this.resourceUrl}/${this.getMerchantTypeIdentifier(merchantType)}`, merchantType, {
      observe: 'response',
    });
  }

  partialUpdate(merchantType: PartialUpdateMerchantType): Observable<EntityResponseType> {
    return this.http.patch<IMerchantType>(`${this.resourceUrl}/${this.getMerchantTypeIdentifier(merchantType)}`, merchantType, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMerchantType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMerchantType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMerchantType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getMerchantTypeIdentifier(merchantType: Pick<IMerchantType, 'id'>): number {
    return merchantType.id;
  }

  compareMerchantType(o1: Pick<IMerchantType, 'id'> | null, o2: Pick<IMerchantType, 'id'> | null): boolean {
    return o1 && o2 ? this.getMerchantTypeIdentifier(o1) === this.getMerchantTypeIdentifier(o2) : o1 === o2;
  }

  addMerchantTypeToCollectionIfMissing<Type extends Pick<IMerchantType, 'id'>>(
    merchantTypeCollection: Type[],
    ...merchantTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const merchantTypes: Type[] = merchantTypesToCheck.filter(isPresent);
    if (merchantTypes.length > 0) {
      const merchantTypeCollectionIdentifiers = merchantTypeCollection.map(
        merchantTypeItem => this.getMerchantTypeIdentifier(merchantTypeItem)!
      );
      const merchantTypesToAdd = merchantTypes.filter(merchantTypeItem => {
        const merchantTypeIdentifier = this.getMerchantTypeIdentifier(merchantTypeItem);
        if (merchantTypeCollectionIdentifiers.includes(merchantTypeIdentifier)) {
          return false;
        }
        merchantTypeCollectionIdentifiers.push(merchantTypeIdentifier);
        return true;
      });
      return [...merchantTypesToAdd, ...merchantTypeCollection];
    }
    return merchantTypeCollection;
  }
}
