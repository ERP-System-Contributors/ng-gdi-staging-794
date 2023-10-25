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
import { IIsoCurrencyCode, NewIsoCurrencyCode } from '../iso-currency-code.model';

export type PartialUpdateIsoCurrencyCode = Partial<IIsoCurrencyCode> & Pick<IIsoCurrencyCode, 'id'>;

export type EntityResponseType = HttpResponse<IIsoCurrencyCode>;
export type EntityArrayResponseType = HttpResponse<IIsoCurrencyCode[]>;

@Injectable({ providedIn: 'root' })
export class IsoCurrencyCodeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/iso-currency-codes');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/iso-currency-codes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(isoCurrencyCode: NewIsoCurrencyCode): Observable<EntityResponseType> {
    return this.http.post<IIsoCurrencyCode>(this.resourceUrl, isoCurrencyCode, { observe: 'response' });
  }

  update(isoCurrencyCode: IIsoCurrencyCode): Observable<EntityResponseType> {
    return this.http.put<IIsoCurrencyCode>(`${this.resourceUrl}/${this.getIsoCurrencyCodeIdentifier(isoCurrencyCode)}`, isoCurrencyCode, {
      observe: 'response',
    });
  }

  partialUpdate(isoCurrencyCode: PartialUpdateIsoCurrencyCode): Observable<EntityResponseType> {
    return this.http.patch<IIsoCurrencyCode>(`${this.resourceUrl}/${this.getIsoCurrencyCodeIdentifier(isoCurrencyCode)}`, isoCurrencyCode, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IIsoCurrencyCode>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IIsoCurrencyCode[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IIsoCurrencyCode[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getIsoCurrencyCodeIdentifier(isoCurrencyCode: Pick<IIsoCurrencyCode, 'id'>): number {
    return isoCurrencyCode.id;
  }

  compareIsoCurrencyCode(o1: Pick<IIsoCurrencyCode, 'id'> | null, o2: Pick<IIsoCurrencyCode, 'id'> | null): boolean {
    return o1 && o2 ? this.getIsoCurrencyCodeIdentifier(o1) === this.getIsoCurrencyCodeIdentifier(o2) : o1 === o2;
  }

  addIsoCurrencyCodeToCollectionIfMissing<Type extends Pick<IIsoCurrencyCode, 'id'>>(
    isoCurrencyCodeCollection: Type[],
    ...isoCurrencyCodesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const isoCurrencyCodes: Type[] = isoCurrencyCodesToCheck.filter(isPresent);
    if (isoCurrencyCodes.length > 0) {
      const isoCurrencyCodeCollectionIdentifiers = isoCurrencyCodeCollection.map(
        isoCurrencyCodeItem => this.getIsoCurrencyCodeIdentifier(isoCurrencyCodeItem)!
      );
      const isoCurrencyCodesToAdd = isoCurrencyCodes.filter(isoCurrencyCodeItem => {
        const isoCurrencyCodeIdentifier = this.getIsoCurrencyCodeIdentifier(isoCurrencyCodeItem);
        if (isoCurrencyCodeCollectionIdentifiers.includes(isoCurrencyCodeIdentifier)) {
          return false;
        }
        isoCurrencyCodeCollectionIdentifiers.push(isoCurrencyCodeIdentifier);
        return true;
      });
      return [...isoCurrencyCodesToAdd, ...isoCurrencyCodeCollection];
    }
    return isoCurrencyCodeCollection;
  }
}
