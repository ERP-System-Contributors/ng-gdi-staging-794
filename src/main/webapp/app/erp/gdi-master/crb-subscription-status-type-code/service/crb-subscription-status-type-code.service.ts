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
import { ICrbSubscriptionStatusTypeCode, NewCrbSubscriptionStatusTypeCode } from '../crb-subscription-status-type-code.model';

export type PartialUpdateCrbSubscriptionStatusTypeCode = Partial<ICrbSubscriptionStatusTypeCode> &
  Pick<ICrbSubscriptionStatusTypeCode, 'id'>;

export type EntityResponseType = HttpResponse<ICrbSubscriptionStatusTypeCode>;
export type EntityArrayResponseType = HttpResponse<ICrbSubscriptionStatusTypeCode[]>;

@Injectable({ providedIn: 'root' })
export class CrbSubscriptionStatusTypeCodeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crb-subscription-status-type-codes');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/crb-subscription-status-type-codes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crbSubscriptionStatusTypeCode: NewCrbSubscriptionStatusTypeCode): Observable<EntityResponseType> {
    return this.http.post<ICrbSubscriptionStatusTypeCode>(this.resourceUrl, crbSubscriptionStatusTypeCode, { observe: 'response' });
  }

  update(crbSubscriptionStatusTypeCode: ICrbSubscriptionStatusTypeCode): Observable<EntityResponseType> {
    return this.http.put<ICrbSubscriptionStatusTypeCode>(
      `${this.resourceUrl}/${this.getCrbSubscriptionStatusTypeCodeIdentifier(crbSubscriptionStatusTypeCode)}`,
      crbSubscriptionStatusTypeCode,
      { observe: 'response' }
    );
  }

  partialUpdate(crbSubscriptionStatusTypeCode: PartialUpdateCrbSubscriptionStatusTypeCode): Observable<EntityResponseType> {
    return this.http.patch<ICrbSubscriptionStatusTypeCode>(
      `${this.resourceUrl}/${this.getCrbSubscriptionStatusTypeCodeIdentifier(crbSubscriptionStatusTypeCode)}`,
      crbSubscriptionStatusTypeCode,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrbSubscriptionStatusTypeCode>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbSubscriptionStatusTypeCode[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbSubscriptionStatusTypeCode[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCrbSubscriptionStatusTypeCodeIdentifier(crbSubscriptionStatusTypeCode: Pick<ICrbSubscriptionStatusTypeCode, 'id'>): number {
    return crbSubscriptionStatusTypeCode.id;
  }

  compareCrbSubscriptionStatusTypeCode(
    o1: Pick<ICrbSubscriptionStatusTypeCode, 'id'> | null,
    o2: Pick<ICrbSubscriptionStatusTypeCode, 'id'> | null
  ): boolean {
    return o1 && o2
      ? this.getCrbSubscriptionStatusTypeCodeIdentifier(o1) === this.getCrbSubscriptionStatusTypeCodeIdentifier(o2)
      : o1 === o2;
  }

  addCrbSubscriptionStatusTypeCodeToCollectionIfMissing<Type extends Pick<ICrbSubscriptionStatusTypeCode, 'id'>>(
    crbSubscriptionStatusTypeCodeCollection: Type[],
    ...crbSubscriptionStatusTypeCodesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crbSubscriptionStatusTypeCodes: Type[] = crbSubscriptionStatusTypeCodesToCheck.filter(isPresent);
    if (crbSubscriptionStatusTypeCodes.length > 0) {
      const crbSubscriptionStatusTypeCodeCollectionIdentifiers = crbSubscriptionStatusTypeCodeCollection.map(
        crbSubscriptionStatusTypeCodeItem => this.getCrbSubscriptionStatusTypeCodeIdentifier(crbSubscriptionStatusTypeCodeItem)!
      );
      const crbSubscriptionStatusTypeCodesToAdd = crbSubscriptionStatusTypeCodes.filter(crbSubscriptionStatusTypeCodeItem => {
        const crbSubscriptionStatusTypeCodeIdentifier = this.getCrbSubscriptionStatusTypeCodeIdentifier(crbSubscriptionStatusTypeCodeItem);
        if (crbSubscriptionStatusTypeCodeCollectionIdentifiers.includes(crbSubscriptionStatusTypeCodeIdentifier)) {
          return false;
        }
        crbSubscriptionStatusTypeCodeCollectionIdentifiers.push(crbSubscriptionStatusTypeCodeIdentifier);
        return true;
      });
      return [...crbSubscriptionStatusTypeCodesToAdd, ...crbSubscriptionStatusTypeCodeCollection];
    }
    return crbSubscriptionStatusTypeCodeCollection;
  }
}
