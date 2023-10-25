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
import { IAccountAttributeMetadata, NewAccountAttributeMetadata } from '../account-attribute-metadata.model';

export type PartialUpdateAccountAttributeMetadata = Partial<IAccountAttributeMetadata> & Pick<IAccountAttributeMetadata, 'id'>;

export type EntityResponseType = HttpResponse<IAccountAttributeMetadata>;
export type EntityArrayResponseType = HttpResponse<IAccountAttributeMetadata[]>;

@Injectable({ providedIn: 'root' })
export class AccountAttributeMetadataService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/account-attribute-metadata');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/account-attribute-metadata');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(accountAttributeMetadata: NewAccountAttributeMetadata): Observable<EntityResponseType> {
    return this.http.post<IAccountAttributeMetadata>(this.resourceUrl, accountAttributeMetadata, { observe: 'response' });
  }

  update(accountAttributeMetadata: IAccountAttributeMetadata): Observable<EntityResponseType> {
    return this.http.put<IAccountAttributeMetadata>(
      `${this.resourceUrl}/${this.getAccountAttributeMetadataIdentifier(accountAttributeMetadata)}`,
      accountAttributeMetadata,
      { observe: 'response' }
    );
  }

  partialUpdate(accountAttributeMetadata: PartialUpdateAccountAttributeMetadata): Observable<EntityResponseType> {
    return this.http.patch<IAccountAttributeMetadata>(
      `${this.resourceUrl}/${this.getAccountAttributeMetadataIdentifier(accountAttributeMetadata)}`,
      accountAttributeMetadata,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAccountAttributeMetadata>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAccountAttributeMetadata[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAccountAttributeMetadata[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getAccountAttributeMetadataIdentifier(accountAttributeMetadata: Pick<IAccountAttributeMetadata, 'id'>): number {
    return accountAttributeMetadata.id;
  }

  compareAccountAttributeMetadata(
    o1: Pick<IAccountAttributeMetadata, 'id'> | null,
    o2: Pick<IAccountAttributeMetadata, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getAccountAttributeMetadataIdentifier(o1) === this.getAccountAttributeMetadataIdentifier(o2) : o1 === o2;
  }

  addAccountAttributeMetadataToCollectionIfMissing<Type extends Pick<IAccountAttributeMetadata, 'id'>>(
    accountAttributeMetadataCollection: Type[],
    ...accountAttributeMetadataToCheck: (Type | null | undefined)[]
  ): Type[] {
    const accountAttributeMetadata: Type[] = accountAttributeMetadataToCheck.filter(isPresent);
    if (accountAttributeMetadata.length > 0) {
      const accountAttributeMetadataCollectionIdentifiers = accountAttributeMetadataCollection.map(
        accountAttributeMetadataItem => this.getAccountAttributeMetadataIdentifier(accountAttributeMetadataItem)!
      );
      const accountAttributeMetadataToAdd = accountAttributeMetadata.filter(accountAttributeMetadataItem => {
        const accountAttributeMetadataIdentifier = this.getAccountAttributeMetadataIdentifier(accountAttributeMetadataItem);
        if (accountAttributeMetadataCollectionIdentifiers.includes(accountAttributeMetadataIdentifier)) {
          return false;
        }
        accountAttributeMetadataCollectionIdentifiers.push(accountAttributeMetadataIdentifier);
        return true;
      });
      return [...accountAttributeMetadataToAdd, ...accountAttributeMetadataCollection];
    }
    return accountAttributeMetadataCollection;
  }
}
