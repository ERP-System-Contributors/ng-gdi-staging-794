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
import { ICrbAccountHolderType, NewCrbAccountHolderType } from '../crb-account-holder-type.model';

export type PartialUpdateCrbAccountHolderType = Partial<ICrbAccountHolderType> & Pick<ICrbAccountHolderType, 'id'>;

export type EntityResponseType = HttpResponse<ICrbAccountHolderType>;
export type EntityArrayResponseType = HttpResponse<ICrbAccountHolderType[]>;

@Injectable({ providedIn: 'root' })
export class CrbAccountHolderTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crb-account-holder-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/crb-account-holder-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crbAccountHolderType: NewCrbAccountHolderType): Observable<EntityResponseType> {
    return this.http.post<ICrbAccountHolderType>(this.resourceUrl, crbAccountHolderType, { observe: 'response' });
  }

  update(crbAccountHolderType: ICrbAccountHolderType): Observable<EntityResponseType> {
    return this.http.put<ICrbAccountHolderType>(
      `${this.resourceUrl}/${this.getCrbAccountHolderTypeIdentifier(crbAccountHolderType)}`,
      crbAccountHolderType,
      { observe: 'response' }
    );
  }

  partialUpdate(crbAccountHolderType: PartialUpdateCrbAccountHolderType): Observable<EntityResponseType> {
    return this.http.patch<ICrbAccountHolderType>(
      `${this.resourceUrl}/${this.getCrbAccountHolderTypeIdentifier(crbAccountHolderType)}`,
      crbAccountHolderType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrbAccountHolderType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbAccountHolderType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbAccountHolderType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCrbAccountHolderTypeIdentifier(crbAccountHolderType: Pick<ICrbAccountHolderType, 'id'>): number {
    return crbAccountHolderType.id;
  }

  compareCrbAccountHolderType(o1: Pick<ICrbAccountHolderType, 'id'> | null, o2: Pick<ICrbAccountHolderType, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrbAccountHolderTypeIdentifier(o1) === this.getCrbAccountHolderTypeIdentifier(o2) : o1 === o2;
  }

  addCrbAccountHolderTypeToCollectionIfMissing<Type extends Pick<ICrbAccountHolderType, 'id'>>(
    crbAccountHolderTypeCollection: Type[],
    ...crbAccountHolderTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crbAccountHolderTypes: Type[] = crbAccountHolderTypesToCheck.filter(isPresent);
    if (crbAccountHolderTypes.length > 0) {
      const crbAccountHolderTypeCollectionIdentifiers = crbAccountHolderTypeCollection.map(
        crbAccountHolderTypeItem => this.getCrbAccountHolderTypeIdentifier(crbAccountHolderTypeItem)!
      );
      const crbAccountHolderTypesToAdd = crbAccountHolderTypes.filter(crbAccountHolderTypeItem => {
        const crbAccountHolderTypeIdentifier = this.getCrbAccountHolderTypeIdentifier(crbAccountHolderTypeItem);
        if (crbAccountHolderTypeCollectionIdentifiers.includes(crbAccountHolderTypeIdentifier)) {
          return false;
        }
        crbAccountHolderTypeCollectionIdentifiers.push(crbAccountHolderTypeIdentifier);
        return true;
      });
      return [...crbAccountHolderTypesToAdd, ...crbAccountHolderTypeCollection];
    }
    return crbAccountHolderTypeCollection;
  }
}
