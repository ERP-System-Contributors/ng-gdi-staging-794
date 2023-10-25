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
import { ICrbAccountStatus, NewCrbAccountStatus } from '../crb-account-status.model';

export type PartialUpdateCrbAccountStatus = Partial<ICrbAccountStatus> & Pick<ICrbAccountStatus, 'id'>;

export type EntityResponseType = HttpResponse<ICrbAccountStatus>;
export type EntityArrayResponseType = HttpResponse<ICrbAccountStatus[]>;

@Injectable({ providedIn: 'root' })
export class CrbAccountStatusService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crb-account-statuses');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/crb-account-statuses');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crbAccountStatus: NewCrbAccountStatus): Observable<EntityResponseType> {
    return this.http.post<ICrbAccountStatus>(this.resourceUrl, crbAccountStatus, { observe: 'response' });
  }

  update(crbAccountStatus: ICrbAccountStatus): Observable<EntityResponseType> {
    return this.http.put<ICrbAccountStatus>(
      `${this.resourceUrl}/${this.getCrbAccountStatusIdentifier(crbAccountStatus)}`,
      crbAccountStatus,
      { observe: 'response' }
    );
  }

  partialUpdate(crbAccountStatus: PartialUpdateCrbAccountStatus): Observable<EntityResponseType> {
    return this.http.patch<ICrbAccountStatus>(
      `${this.resourceUrl}/${this.getCrbAccountStatusIdentifier(crbAccountStatus)}`,
      crbAccountStatus,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrbAccountStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbAccountStatus[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbAccountStatus[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCrbAccountStatusIdentifier(crbAccountStatus: Pick<ICrbAccountStatus, 'id'>): number {
    return crbAccountStatus.id;
  }

  compareCrbAccountStatus(o1: Pick<ICrbAccountStatus, 'id'> | null, o2: Pick<ICrbAccountStatus, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrbAccountStatusIdentifier(o1) === this.getCrbAccountStatusIdentifier(o2) : o1 === o2;
  }

  addCrbAccountStatusToCollectionIfMissing<Type extends Pick<ICrbAccountStatus, 'id'>>(
    crbAccountStatusCollection: Type[],
    ...crbAccountStatusesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crbAccountStatuses: Type[] = crbAccountStatusesToCheck.filter(isPresent);
    if (crbAccountStatuses.length > 0) {
      const crbAccountStatusCollectionIdentifiers = crbAccountStatusCollection.map(
        crbAccountStatusItem => this.getCrbAccountStatusIdentifier(crbAccountStatusItem)!
      );
      const crbAccountStatusesToAdd = crbAccountStatuses.filter(crbAccountStatusItem => {
        const crbAccountStatusIdentifier = this.getCrbAccountStatusIdentifier(crbAccountStatusItem);
        if (crbAccountStatusCollectionIdentifiers.includes(crbAccountStatusIdentifier)) {
          return false;
        }
        crbAccountStatusCollectionIdentifiers.push(crbAccountStatusIdentifier);
        return true;
      });
      return [...crbAccountStatusesToAdd, ...crbAccountStatusCollection];
    }
    return crbAccountStatusCollection;
  }
}
