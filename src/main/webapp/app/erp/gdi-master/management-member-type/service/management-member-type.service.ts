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
import { IManagementMemberType, NewManagementMemberType } from '../management-member-type.model';

export type PartialUpdateManagementMemberType = Partial<IManagementMemberType> & Pick<IManagementMemberType, 'id'>;

export type EntityResponseType = HttpResponse<IManagementMemberType>;
export type EntityArrayResponseType = HttpResponse<IManagementMemberType[]>;

@Injectable({ providedIn: 'root' })
export class ManagementMemberTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/management-member-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/management-member-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(managementMemberType: NewManagementMemberType): Observable<EntityResponseType> {
    return this.http.post<IManagementMemberType>(this.resourceUrl, managementMemberType, { observe: 'response' });
  }

  update(managementMemberType: IManagementMemberType): Observable<EntityResponseType> {
    return this.http.put<IManagementMemberType>(
      `${this.resourceUrl}/${this.getManagementMemberTypeIdentifier(managementMemberType)}`,
      managementMemberType,
      { observe: 'response' }
    );
  }

  partialUpdate(managementMemberType: PartialUpdateManagementMemberType): Observable<EntityResponseType> {
    return this.http.patch<IManagementMemberType>(
      `${this.resourceUrl}/${this.getManagementMemberTypeIdentifier(managementMemberType)}`,
      managementMemberType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IManagementMemberType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IManagementMemberType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IManagementMemberType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getManagementMemberTypeIdentifier(managementMemberType: Pick<IManagementMemberType, 'id'>): number {
    return managementMemberType.id;
  }

  compareManagementMemberType(o1: Pick<IManagementMemberType, 'id'> | null, o2: Pick<IManagementMemberType, 'id'> | null): boolean {
    return o1 && o2 ? this.getManagementMemberTypeIdentifier(o1) === this.getManagementMemberTypeIdentifier(o2) : o1 === o2;
  }

  addManagementMemberTypeToCollectionIfMissing<Type extends Pick<IManagementMemberType, 'id'>>(
    managementMemberTypeCollection: Type[],
    ...managementMemberTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const managementMemberTypes: Type[] = managementMemberTypesToCheck.filter(isPresent);
    if (managementMemberTypes.length > 0) {
      const managementMemberTypeCollectionIdentifiers = managementMemberTypeCollection.map(
        managementMemberTypeItem => this.getManagementMemberTypeIdentifier(managementMemberTypeItem)!
      );
      const managementMemberTypesToAdd = managementMemberTypes.filter(managementMemberTypeItem => {
        const managementMemberTypeIdentifier = this.getManagementMemberTypeIdentifier(managementMemberTypeItem);
        if (managementMemberTypeCollectionIdentifiers.includes(managementMemberTypeIdentifier)) {
          return false;
        }
        managementMemberTypeCollectionIdentifiers.push(managementMemberTypeIdentifier);
        return true;
      });
      return [...managementMemberTypesToAdd, ...managementMemberTypeCollection];
    }
    return managementMemberTypeCollection;
  }
}
