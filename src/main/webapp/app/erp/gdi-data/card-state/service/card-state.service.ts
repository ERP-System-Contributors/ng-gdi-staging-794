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
import { ICardState, NewCardState } from '../card-state.model';

export type PartialUpdateCardState = Partial<ICardState> & Pick<ICardState, 'id'>;

export type EntityResponseType = HttpResponse<ICardState>;
export type EntityArrayResponseType = HttpResponse<ICardState[]>;

@Injectable({ providedIn: 'root' })
export class CardStateService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/card-states');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/card-states');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cardState: NewCardState): Observable<EntityResponseType> {
    return this.http.post<ICardState>(this.resourceUrl, cardState, { observe: 'response' });
  }

  update(cardState: ICardState): Observable<EntityResponseType> {
    return this.http.put<ICardState>(`${this.resourceUrl}/${this.getCardStateIdentifier(cardState)}`, cardState, { observe: 'response' });
  }

  partialUpdate(cardState: PartialUpdateCardState): Observable<EntityResponseType> {
    return this.http.patch<ICardState>(`${this.resourceUrl}/${this.getCardStateIdentifier(cardState)}`, cardState, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICardState>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICardState[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICardState[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCardStateIdentifier(cardState: Pick<ICardState, 'id'>): number {
    return cardState.id;
  }

  compareCardState(o1: Pick<ICardState, 'id'> | null, o2: Pick<ICardState, 'id'> | null): boolean {
    return o1 && o2 ? this.getCardStateIdentifier(o1) === this.getCardStateIdentifier(o2) : o1 === o2;
  }

  addCardStateToCollectionIfMissing<Type extends Pick<ICardState, 'id'>>(
    cardStateCollection: Type[],
    ...cardStatesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cardStates: Type[] = cardStatesToCheck.filter(isPresent);
    if (cardStates.length > 0) {
      const cardStateCollectionIdentifiers = cardStateCollection.map(cardStateItem => this.getCardStateIdentifier(cardStateItem)!);
      const cardStatesToAdd = cardStates.filter(cardStateItem => {
        const cardStateIdentifier = this.getCardStateIdentifier(cardStateItem);
        if (cardStateCollectionIdentifiers.includes(cardStateIdentifier)) {
          return false;
        }
        cardStateCollectionIdentifiers.push(cardStateIdentifier);
        return true;
      });
      return [...cardStatesToAdd, ...cardStateCollection];
    }
    return cardStateCollection;
  }
}
