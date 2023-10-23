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
import { IShareholderType, NewShareholderType } from '../shareholder-type.model';

export type PartialUpdateShareholderType = Partial<IShareholderType> & Pick<IShareholderType, 'id'>;

export type EntityResponseType = HttpResponse<IShareholderType>;
export type EntityArrayResponseType = HttpResponse<IShareholderType[]>;

@Injectable({ providedIn: 'root' })
export class ShareholderTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/shareholder-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/shareholder-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(shareholderType: NewShareholderType): Observable<EntityResponseType> {
    return this.http.post<IShareholderType>(this.resourceUrl, shareholderType, { observe: 'response' });
  }

  update(shareholderType: IShareholderType): Observable<EntityResponseType> {
    return this.http.put<IShareholderType>(`${this.resourceUrl}/${this.getShareholderTypeIdentifier(shareholderType)}`, shareholderType, {
      observe: 'response',
    });
  }

  partialUpdate(shareholderType: PartialUpdateShareholderType): Observable<EntityResponseType> {
    return this.http.patch<IShareholderType>(`${this.resourceUrl}/${this.getShareholderTypeIdentifier(shareholderType)}`, shareholderType, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IShareholderType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IShareholderType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IShareholderType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getShareholderTypeIdentifier(shareholderType: Pick<IShareholderType, 'id'>): number {
    return shareholderType.id;
  }

  compareShareholderType(o1: Pick<IShareholderType, 'id'> | null, o2: Pick<IShareholderType, 'id'> | null): boolean {
    return o1 && o2 ? this.getShareholderTypeIdentifier(o1) === this.getShareholderTypeIdentifier(o2) : o1 === o2;
  }

  addShareholderTypeToCollectionIfMissing<Type extends Pick<IShareholderType, 'id'>>(
    shareholderTypeCollection: Type[],
    ...shareholderTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const shareholderTypes: Type[] = shareholderTypesToCheck.filter(isPresent);
    if (shareholderTypes.length > 0) {
      const shareholderTypeCollectionIdentifiers = shareholderTypeCollection.map(
        shareholderTypeItem => this.getShareholderTypeIdentifier(shareholderTypeItem)!
      );
      const shareholderTypesToAdd = shareholderTypes.filter(shareholderTypeItem => {
        const shareholderTypeIdentifier = this.getShareholderTypeIdentifier(shareholderTypeItem);
        if (shareholderTypeCollectionIdentifiers.includes(shareholderTypeIdentifier)) {
          return false;
        }
        shareholderTypeCollectionIdentifiers.push(shareholderTypeIdentifier);
        return true;
      });
      return [...shareholderTypesToAdd, ...shareholderTypeCollection];
    }
    return shareholderTypeCollection;
  }
}
