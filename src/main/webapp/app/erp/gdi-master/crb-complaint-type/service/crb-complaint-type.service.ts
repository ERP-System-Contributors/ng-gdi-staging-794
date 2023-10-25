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
import { ICrbComplaintType, NewCrbComplaintType } from '../crb-complaint-type.model';

export type PartialUpdateCrbComplaintType = Partial<ICrbComplaintType> & Pick<ICrbComplaintType, 'id'>;

export type EntityResponseType = HttpResponse<ICrbComplaintType>;
export type EntityArrayResponseType = HttpResponse<ICrbComplaintType[]>;

@Injectable({ providedIn: 'root' })
export class CrbComplaintTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crb-complaint-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/crb-complaint-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crbComplaintType: NewCrbComplaintType): Observable<EntityResponseType> {
    return this.http.post<ICrbComplaintType>(this.resourceUrl, crbComplaintType, { observe: 'response' });
  }

  update(crbComplaintType: ICrbComplaintType): Observable<EntityResponseType> {
    return this.http.put<ICrbComplaintType>(
      `${this.resourceUrl}/${this.getCrbComplaintTypeIdentifier(crbComplaintType)}`,
      crbComplaintType,
      { observe: 'response' }
    );
  }

  partialUpdate(crbComplaintType: PartialUpdateCrbComplaintType): Observable<EntityResponseType> {
    return this.http.patch<ICrbComplaintType>(
      `${this.resourceUrl}/${this.getCrbComplaintTypeIdentifier(crbComplaintType)}`,
      crbComplaintType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrbComplaintType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbComplaintType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbComplaintType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCrbComplaintTypeIdentifier(crbComplaintType: Pick<ICrbComplaintType, 'id'>): number {
    return crbComplaintType.id;
  }

  compareCrbComplaintType(o1: Pick<ICrbComplaintType, 'id'> | null, o2: Pick<ICrbComplaintType, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrbComplaintTypeIdentifier(o1) === this.getCrbComplaintTypeIdentifier(o2) : o1 === o2;
  }

  addCrbComplaintTypeToCollectionIfMissing<Type extends Pick<ICrbComplaintType, 'id'>>(
    crbComplaintTypeCollection: Type[],
    ...crbComplaintTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crbComplaintTypes: Type[] = crbComplaintTypesToCheck.filter(isPresent);
    if (crbComplaintTypes.length > 0) {
      const crbComplaintTypeCollectionIdentifiers = crbComplaintTypeCollection.map(
        crbComplaintTypeItem => this.getCrbComplaintTypeIdentifier(crbComplaintTypeItem)!
      );
      const crbComplaintTypesToAdd = crbComplaintTypes.filter(crbComplaintTypeItem => {
        const crbComplaintTypeIdentifier = this.getCrbComplaintTypeIdentifier(crbComplaintTypeItem);
        if (crbComplaintTypeCollectionIdentifiers.includes(crbComplaintTypeIdentifier)) {
          return false;
        }
        crbComplaintTypeCollectionIdentifiers.push(crbComplaintTypeIdentifier);
        return true;
      });
      return [...crbComplaintTypesToAdd, ...crbComplaintTypeCollection];
    }
    return crbComplaintTypeCollection;
  }
}
