import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICustomerComplaintStatusType, NewCustomerComplaintStatusType } from '../customer-complaint-status-type.model';

export type PartialUpdateCustomerComplaintStatusType = Partial<ICustomerComplaintStatusType> & Pick<ICustomerComplaintStatusType, 'id'>;

export type EntityResponseType = HttpResponse<ICustomerComplaintStatusType>;
export type EntityArrayResponseType = HttpResponse<ICustomerComplaintStatusType[]>;

@Injectable({ providedIn: 'root' })
export class CustomerComplaintStatusTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/customer-complaint-status-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/customer-complaint-status-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(customerComplaintStatusType: NewCustomerComplaintStatusType): Observable<EntityResponseType> {
    return this.http.post<ICustomerComplaintStatusType>(this.resourceUrl, customerComplaintStatusType, { observe: 'response' });
  }

  update(customerComplaintStatusType: ICustomerComplaintStatusType): Observable<EntityResponseType> {
    return this.http.put<ICustomerComplaintStatusType>(
      `${this.resourceUrl}/${this.getCustomerComplaintStatusTypeIdentifier(customerComplaintStatusType)}`,
      customerComplaintStatusType,
      { observe: 'response' }
    );
  }

  partialUpdate(customerComplaintStatusType: PartialUpdateCustomerComplaintStatusType): Observable<EntityResponseType> {
    return this.http.patch<ICustomerComplaintStatusType>(
      `${this.resourceUrl}/${this.getCustomerComplaintStatusTypeIdentifier(customerComplaintStatusType)}`,
      customerComplaintStatusType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICustomerComplaintStatusType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICustomerComplaintStatusType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICustomerComplaintStatusType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCustomerComplaintStatusTypeIdentifier(customerComplaintStatusType: Pick<ICustomerComplaintStatusType, 'id'>): number {
    return customerComplaintStatusType.id;
  }

  compareCustomerComplaintStatusType(
    o1: Pick<ICustomerComplaintStatusType, 'id'> | null,
    o2: Pick<ICustomerComplaintStatusType, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getCustomerComplaintStatusTypeIdentifier(o1) === this.getCustomerComplaintStatusTypeIdentifier(o2) : o1 === o2;
  }

  addCustomerComplaintStatusTypeToCollectionIfMissing<Type extends Pick<ICustomerComplaintStatusType, 'id'>>(
    customerComplaintStatusTypeCollection: Type[],
    ...customerComplaintStatusTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const customerComplaintStatusTypes: Type[] = customerComplaintStatusTypesToCheck.filter(isPresent);
    if (customerComplaintStatusTypes.length > 0) {
      const customerComplaintStatusTypeCollectionIdentifiers = customerComplaintStatusTypeCollection.map(
        customerComplaintStatusTypeItem => this.getCustomerComplaintStatusTypeIdentifier(customerComplaintStatusTypeItem)!
      );
      const customerComplaintStatusTypesToAdd = customerComplaintStatusTypes.filter(customerComplaintStatusTypeItem => {
        const customerComplaintStatusTypeIdentifier = this.getCustomerComplaintStatusTypeIdentifier(customerComplaintStatusTypeItem);
        if (customerComplaintStatusTypeCollectionIdentifiers.includes(customerComplaintStatusTypeIdentifier)) {
          return false;
        }
        customerComplaintStatusTypeCollectionIdentifiers.push(customerComplaintStatusTypeIdentifier);
        return true;
      });
      return [...customerComplaintStatusTypesToAdd, ...customerComplaintStatusTypeCollection];
    }
    return customerComplaintStatusTypeCollection;
  }
}
