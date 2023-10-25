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
import { ICrbComplaintStatusType, NewCrbComplaintStatusType } from '../crb-complaint-status-type.model';

export type PartialUpdateCrbComplaintStatusType = Partial<ICrbComplaintStatusType> & Pick<ICrbComplaintStatusType, 'id'>;

export type EntityResponseType = HttpResponse<ICrbComplaintStatusType>;
export type EntityArrayResponseType = HttpResponse<ICrbComplaintStatusType[]>;

@Injectable({ providedIn: 'root' })
export class CrbComplaintStatusTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crb-complaint-status-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/crb-complaint-status-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crbComplaintStatusType: NewCrbComplaintStatusType): Observable<EntityResponseType> {
    return this.http.post<ICrbComplaintStatusType>(this.resourceUrl, crbComplaintStatusType, { observe: 'response' });
  }

  update(crbComplaintStatusType: ICrbComplaintStatusType): Observable<EntityResponseType> {
    return this.http.put<ICrbComplaintStatusType>(
      `${this.resourceUrl}/${this.getCrbComplaintStatusTypeIdentifier(crbComplaintStatusType)}`,
      crbComplaintStatusType,
      { observe: 'response' }
    );
  }

  partialUpdate(crbComplaintStatusType: PartialUpdateCrbComplaintStatusType): Observable<EntityResponseType> {
    return this.http.patch<ICrbComplaintStatusType>(
      `${this.resourceUrl}/${this.getCrbComplaintStatusTypeIdentifier(crbComplaintStatusType)}`,
      crbComplaintStatusType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrbComplaintStatusType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbComplaintStatusType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbComplaintStatusType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCrbComplaintStatusTypeIdentifier(crbComplaintStatusType: Pick<ICrbComplaintStatusType, 'id'>): number {
    return crbComplaintStatusType.id;
  }

  compareCrbComplaintStatusType(o1: Pick<ICrbComplaintStatusType, 'id'> | null, o2: Pick<ICrbComplaintStatusType, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrbComplaintStatusTypeIdentifier(o1) === this.getCrbComplaintStatusTypeIdentifier(o2) : o1 === o2;
  }

  addCrbComplaintStatusTypeToCollectionIfMissing<Type extends Pick<ICrbComplaintStatusType, 'id'>>(
    crbComplaintStatusTypeCollection: Type[],
    ...crbComplaintStatusTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crbComplaintStatusTypes: Type[] = crbComplaintStatusTypesToCheck.filter(isPresent);
    if (crbComplaintStatusTypes.length > 0) {
      const crbComplaintStatusTypeCollectionIdentifiers = crbComplaintStatusTypeCollection.map(
        crbComplaintStatusTypeItem => this.getCrbComplaintStatusTypeIdentifier(crbComplaintStatusTypeItem)!
      );
      const crbComplaintStatusTypesToAdd = crbComplaintStatusTypes.filter(crbComplaintStatusTypeItem => {
        const crbComplaintStatusTypeIdentifier = this.getCrbComplaintStatusTypeIdentifier(crbComplaintStatusTypeItem);
        if (crbComplaintStatusTypeCollectionIdentifiers.includes(crbComplaintStatusTypeIdentifier)) {
          return false;
        }
        crbComplaintStatusTypeCollectionIdentifiers.push(crbComplaintStatusTypeIdentifier);
        return true;
      });
      return [...crbComplaintStatusTypesToAdd, ...crbComplaintStatusTypeCollection];
    }
    return crbComplaintStatusTypeCollection;
  }
}
