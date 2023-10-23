import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICrbCustomerType, NewCrbCustomerType } from '../crb-customer-type.model';

export type PartialUpdateCrbCustomerType = Partial<ICrbCustomerType> & Pick<ICrbCustomerType, 'id'>;

export type EntityResponseType = HttpResponse<ICrbCustomerType>;
export type EntityArrayResponseType = HttpResponse<ICrbCustomerType[]>;

@Injectable({ providedIn: 'root' })
export class CrbCustomerTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crb-customer-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/crb-customer-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crbCustomerType: NewCrbCustomerType): Observable<EntityResponseType> {
    return this.http.post<ICrbCustomerType>(this.resourceUrl, crbCustomerType, { observe: 'response' });
  }

  update(crbCustomerType: ICrbCustomerType): Observable<EntityResponseType> {
    return this.http.put<ICrbCustomerType>(`${this.resourceUrl}/${this.getCrbCustomerTypeIdentifier(crbCustomerType)}`, crbCustomerType, {
      observe: 'response',
    });
  }

  partialUpdate(crbCustomerType: PartialUpdateCrbCustomerType): Observable<EntityResponseType> {
    return this.http.patch<ICrbCustomerType>(`${this.resourceUrl}/${this.getCrbCustomerTypeIdentifier(crbCustomerType)}`, crbCustomerType, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrbCustomerType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbCustomerType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbCustomerType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCrbCustomerTypeIdentifier(crbCustomerType: Pick<ICrbCustomerType, 'id'>): number {
    return crbCustomerType.id;
  }

  compareCrbCustomerType(o1: Pick<ICrbCustomerType, 'id'> | null, o2: Pick<ICrbCustomerType, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrbCustomerTypeIdentifier(o1) === this.getCrbCustomerTypeIdentifier(o2) : o1 === o2;
  }

  addCrbCustomerTypeToCollectionIfMissing<Type extends Pick<ICrbCustomerType, 'id'>>(
    crbCustomerTypeCollection: Type[],
    ...crbCustomerTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crbCustomerTypes: Type[] = crbCustomerTypesToCheck.filter(isPresent);
    if (crbCustomerTypes.length > 0) {
      const crbCustomerTypeCollectionIdentifiers = crbCustomerTypeCollection.map(
        crbCustomerTypeItem => this.getCrbCustomerTypeIdentifier(crbCustomerTypeItem)!
      );
      const crbCustomerTypesToAdd = crbCustomerTypes.filter(crbCustomerTypeItem => {
        const crbCustomerTypeIdentifier = this.getCrbCustomerTypeIdentifier(crbCustomerTypeItem);
        if (crbCustomerTypeCollectionIdentifiers.includes(crbCustomerTypeIdentifier)) {
          return false;
        }
        crbCustomerTypeCollectionIdentifiers.push(crbCustomerTypeIdentifier);
        return true;
      });
      return [...crbCustomerTypesToAdd, ...crbCustomerTypeCollection];
    }
    return crbCustomerTypeCollection;
  }
}
