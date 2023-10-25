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
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ICardAcquiringTransaction, NewCardAcquiringTransaction } from '../card-acquiring-transaction.model';

export type PartialUpdateCardAcquiringTransaction = Partial<ICardAcquiringTransaction> & Pick<ICardAcquiringTransaction, 'id'>;

type RestOf<T extends ICardAcquiringTransaction | NewCardAcquiringTransaction> = Omit<T, 'reportingDate'> & {
  reportingDate?: string | null;
};

export type RestCardAcquiringTransaction = RestOf<ICardAcquiringTransaction>;

export type NewRestCardAcquiringTransaction = RestOf<NewCardAcquiringTransaction>;

export type PartialUpdateRestCardAcquiringTransaction = RestOf<PartialUpdateCardAcquiringTransaction>;

export type EntityResponseType = HttpResponse<ICardAcquiringTransaction>;
export type EntityArrayResponseType = HttpResponse<ICardAcquiringTransaction[]>;

@Injectable({ providedIn: 'root' })
export class CardAcquiringTransactionService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/card-acquiring-transactions');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/card-acquiring-transactions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cardAcquiringTransaction: NewCardAcquiringTransaction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cardAcquiringTransaction);
    return this.http
      .post<RestCardAcquiringTransaction>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(cardAcquiringTransaction: ICardAcquiringTransaction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cardAcquiringTransaction);
    return this.http
      .put<RestCardAcquiringTransaction>(
        `${this.resourceUrl}/${this.getCardAcquiringTransactionIdentifier(cardAcquiringTransaction)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(cardAcquiringTransaction: PartialUpdateCardAcquiringTransaction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cardAcquiringTransaction);
    return this.http
      .patch<RestCardAcquiringTransaction>(
        `${this.resourceUrl}/${this.getCardAcquiringTransactionIdentifier(cardAcquiringTransaction)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCardAcquiringTransaction>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCardAcquiringTransaction[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCardAcquiringTransaction[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getCardAcquiringTransactionIdentifier(cardAcquiringTransaction: Pick<ICardAcquiringTransaction, 'id'>): number {
    return cardAcquiringTransaction.id;
  }

  compareCardAcquiringTransaction(
    o1: Pick<ICardAcquiringTransaction, 'id'> | null,
    o2: Pick<ICardAcquiringTransaction, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getCardAcquiringTransactionIdentifier(o1) === this.getCardAcquiringTransactionIdentifier(o2) : o1 === o2;
  }

  addCardAcquiringTransactionToCollectionIfMissing<Type extends Pick<ICardAcquiringTransaction, 'id'>>(
    cardAcquiringTransactionCollection: Type[],
    ...cardAcquiringTransactionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cardAcquiringTransactions: Type[] = cardAcquiringTransactionsToCheck.filter(isPresent);
    if (cardAcquiringTransactions.length > 0) {
      const cardAcquiringTransactionCollectionIdentifiers = cardAcquiringTransactionCollection.map(
        cardAcquiringTransactionItem => this.getCardAcquiringTransactionIdentifier(cardAcquiringTransactionItem)!
      );
      const cardAcquiringTransactionsToAdd = cardAcquiringTransactions.filter(cardAcquiringTransactionItem => {
        const cardAcquiringTransactionIdentifier = this.getCardAcquiringTransactionIdentifier(cardAcquiringTransactionItem);
        if (cardAcquiringTransactionCollectionIdentifiers.includes(cardAcquiringTransactionIdentifier)) {
          return false;
        }
        cardAcquiringTransactionCollectionIdentifiers.push(cardAcquiringTransactionIdentifier);
        return true;
      });
      return [...cardAcquiringTransactionsToAdd, ...cardAcquiringTransactionCollection];
    }
    return cardAcquiringTransactionCollection;
  }

  protected convertDateFromClient<
    T extends ICardAcquiringTransaction | NewCardAcquiringTransaction | PartialUpdateCardAcquiringTransaction
  >(cardAcquiringTransaction: T): RestOf<T> {
    return {
      ...cardAcquiringTransaction,
      reportingDate: cardAcquiringTransaction.reportingDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restCardAcquiringTransaction: RestCardAcquiringTransaction): ICardAcquiringTransaction {
    return {
      ...restCardAcquiringTransaction,
      reportingDate: restCardAcquiringTransaction.reportingDate ? dayjs(restCardAcquiringTransaction.reportingDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCardAcquiringTransaction>): HttpResponse<ICardAcquiringTransaction> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCardAcquiringTransaction[]>): HttpResponse<ICardAcquiringTransaction[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
