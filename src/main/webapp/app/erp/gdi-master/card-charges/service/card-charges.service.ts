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
import { ICardCharges, NewCardCharges } from '../card-charges.model';

export type PartialUpdateCardCharges = Partial<ICardCharges> & Pick<ICardCharges, 'id'>;

export type EntityResponseType = HttpResponse<ICardCharges>;
export type EntityArrayResponseType = HttpResponse<ICardCharges[]>;

@Injectable({ providedIn: 'root' })
export class CardChargesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/card-charges');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/card-charges');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cardCharges: NewCardCharges): Observable<EntityResponseType> {
    return this.http.post<ICardCharges>(this.resourceUrl, cardCharges, { observe: 'response' });
  }

  update(cardCharges: ICardCharges): Observable<EntityResponseType> {
    return this.http.put<ICardCharges>(`${this.resourceUrl}/${this.getCardChargesIdentifier(cardCharges)}`, cardCharges, {
      observe: 'response',
    });
  }

  partialUpdate(cardCharges: PartialUpdateCardCharges): Observable<EntityResponseType> {
    return this.http.patch<ICardCharges>(`${this.resourceUrl}/${this.getCardChargesIdentifier(cardCharges)}`, cardCharges, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICardCharges>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICardCharges[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICardCharges[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCardChargesIdentifier(cardCharges: Pick<ICardCharges, 'id'>): number {
    return cardCharges.id;
  }

  compareCardCharges(o1: Pick<ICardCharges, 'id'> | null, o2: Pick<ICardCharges, 'id'> | null): boolean {
    return o1 && o2 ? this.getCardChargesIdentifier(o1) === this.getCardChargesIdentifier(o2) : o1 === o2;
  }

  addCardChargesToCollectionIfMissing<Type extends Pick<ICardCharges, 'id'>>(
    cardChargesCollection: Type[],
    ...cardChargesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cardCharges: Type[] = cardChargesToCheck.filter(isPresent);
    if (cardCharges.length > 0) {
      const cardChargesCollectionIdentifiers = cardChargesCollection.map(
        cardChargesItem => this.getCardChargesIdentifier(cardChargesItem)!
      );
      const cardChargesToAdd = cardCharges.filter(cardChargesItem => {
        const cardChargesIdentifier = this.getCardChargesIdentifier(cardChargesItem);
        if (cardChargesCollectionIdentifiers.includes(cardChargesIdentifier)) {
          return false;
        }
        cardChargesCollectionIdentifiers.push(cardChargesIdentifier);
        return true;
      });
      return [...cardChargesToAdd, ...cardChargesCollection];
    }
    return cardChargesCollection;
  }
}
