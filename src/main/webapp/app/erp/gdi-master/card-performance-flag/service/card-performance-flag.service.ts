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
import { ICardPerformanceFlag, NewCardPerformanceFlag } from '../card-performance-flag.model';

export type PartialUpdateCardPerformanceFlag = Partial<ICardPerformanceFlag> & Pick<ICardPerformanceFlag, 'id'>;

export type EntityResponseType = HttpResponse<ICardPerformanceFlag>;
export type EntityArrayResponseType = HttpResponse<ICardPerformanceFlag[]>;

@Injectable({ providedIn: 'root' })
export class CardPerformanceFlagService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/card-performance-flags');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/card-performance-flags');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cardPerformanceFlag: NewCardPerformanceFlag): Observable<EntityResponseType> {
    return this.http.post<ICardPerformanceFlag>(this.resourceUrl, cardPerformanceFlag, { observe: 'response' });
  }

  update(cardPerformanceFlag: ICardPerformanceFlag): Observable<EntityResponseType> {
    return this.http.put<ICardPerformanceFlag>(
      `${this.resourceUrl}/${this.getCardPerformanceFlagIdentifier(cardPerformanceFlag)}`,
      cardPerformanceFlag,
      { observe: 'response' }
    );
  }

  partialUpdate(cardPerformanceFlag: PartialUpdateCardPerformanceFlag): Observable<EntityResponseType> {
    return this.http.patch<ICardPerformanceFlag>(
      `${this.resourceUrl}/${this.getCardPerformanceFlagIdentifier(cardPerformanceFlag)}`,
      cardPerformanceFlag,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICardPerformanceFlag>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICardPerformanceFlag[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICardPerformanceFlag[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCardPerformanceFlagIdentifier(cardPerformanceFlag: Pick<ICardPerformanceFlag, 'id'>): number {
    return cardPerformanceFlag.id;
  }

  compareCardPerformanceFlag(o1: Pick<ICardPerformanceFlag, 'id'> | null, o2: Pick<ICardPerformanceFlag, 'id'> | null): boolean {
    return o1 && o2 ? this.getCardPerformanceFlagIdentifier(o1) === this.getCardPerformanceFlagIdentifier(o2) : o1 === o2;
  }

  addCardPerformanceFlagToCollectionIfMissing<Type extends Pick<ICardPerformanceFlag, 'id'>>(
    cardPerformanceFlagCollection: Type[],
    ...cardPerformanceFlagsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cardPerformanceFlags: Type[] = cardPerformanceFlagsToCheck.filter(isPresent);
    if (cardPerformanceFlags.length > 0) {
      const cardPerformanceFlagCollectionIdentifiers = cardPerformanceFlagCollection.map(
        cardPerformanceFlagItem => this.getCardPerformanceFlagIdentifier(cardPerformanceFlagItem)!
      );
      const cardPerformanceFlagsToAdd = cardPerformanceFlags.filter(cardPerformanceFlagItem => {
        const cardPerformanceFlagIdentifier = this.getCardPerformanceFlagIdentifier(cardPerformanceFlagItem);
        if (cardPerformanceFlagCollectionIdentifiers.includes(cardPerformanceFlagIdentifier)) {
          return false;
        }
        cardPerformanceFlagCollectionIdentifiers.push(cardPerformanceFlagIdentifier);
        return true;
      });
      return [...cardPerformanceFlagsToAdd, ...cardPerformanceFlagCollection];
    }
    return cardPerformanceFlagCollection;
  }
}
