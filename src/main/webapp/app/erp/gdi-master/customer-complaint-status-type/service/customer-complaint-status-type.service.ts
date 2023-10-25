///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

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
