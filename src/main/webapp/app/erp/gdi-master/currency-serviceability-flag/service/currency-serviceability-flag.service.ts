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
import { ICurrencyServiceabilityFlag, NewCurrencyServiceabilityFlag } from '../currency-serviceability-flag.model';

export type PartialUpdateCurrencyServiceabilityFlag = Partial<ICurrencyServiceabilityFlag> & Pick<ICurrencyServiceabilityFlag, 'id'>;

export type EntityResponseType = HttpResponse<ICurrencyServiceabilityFlag>;
export type EntityArrayResponseType = HttpResponse<ICurrencyServiceabilityFlag[]>;

@Injectable({ providedIn: 'root' })
export class CurrencyServiceabilityFlagService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/currency-serviceability-flags');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/currency-serviceability-flags');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(currencyServiceabilityFlag: NewCurrencyServiceabilityFlag): Observable<EntityResponseType> {
    return this.http.post<ICurrencyServiceabilityFlag>(this.resourceUrl, currencyServiceabilityFlag, { observe: 'response' });
  }

  update(currencyServiceabilityFlag: ICurrencyServiceabilityFlag): Observable<EntityResponseType> {
    return this.http.put<ICurrencyServiceabilityFlag>(
      `${this.resourceUrl}/${this.getCurrencyServiceabilityFlagIdentifier(currencyServiceabilityFlag)}`,
      currencyServiceabilityFlag,
      { observe: 'response' }
    );
  }

  partialUpdate(currencyServiceabilityFlag: PartialUpdateCurrencyServiceabilityFlag): Observable<EntityResponseType> {
    return this.http.patch<ICurrencyServiceabilityFlag>(
      `${this.resourceUrl}/${this.getCurrencyServiceabilityFlagIdentifier(currencyServiceabilityFlag)}`,
      currencyServiceabilityFlag,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICurrencyServiceabilityFlag>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICurrencyServiceabilityFlag[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICurrencyServiceabilityFlag[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCurrencyServiceabilityFlagIdentifier(currencyServiceabilityFlag: Pick<ICurrencyServiceabilityFlag, 'id'>): number {
    return currencyServiceabilityFlag.id;
  }

  compareCurrencyServiceabilityFlag(
    o1: Pick<ICurrencyServiceabilityFlag, 'id'> | null,
    o2: Pick<ICurrencyServiceabilityFlag, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getCurrencyServiceabilityFlagIdentifier(o1) === this.getCurrencyServiceabilityFlagIdentifier(o2) : o1 === o2;
  }

  addCurrencyServiceabilityFlagToCollectionIfMissing<Type extends Pick<ICurrencyServiceabilityFlag, 'id'>>(
    currencyServiceabilityFlagCollection: Type[],
    ...currencyServiceabilityFlagsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const currencyServiceabilityFlags: Type[] = currencyServiceabilityFlagsToCheck.filter(isPresent);
    if (currencyServiceabilityFlags.length > 0) {
      const currencyServiceabilityFlagCollectionIdentifiers = currencyServiceabilityFlagCollection.map(
        currencyServiceabilityFlagItem => this.getCurrencyServiceabilityFlagIdentifier(currencyServiceabilityFlagItem)!
      );
      const currencyServiceabilityFlagsToAdd = currencyServiceabilityFlags.filter(currencyServiceabilityFlagItem => {
        const currencyServiceabilityFlagIdentifier = this.getCurrencyServiceabilityFlagIdentifier(currencyServiceabilityFlagItem);
        if (currencyServiceabilityFlagCollectionIdentifiers.includes(currencyServiceabilityFlagIdentifier)) {
          return false;
        }
        currencyServiceabilityFlagCollectionIdentifiers.push(currencyServiceabilityFlagIdentifier);
        return true;
      });
      return [...currencyServiceabilityFlagsToAdd, ...currencyServiceabilityFlagCollection];
    }
    return currencyServiceabilityFlagCollection;
  }
}
