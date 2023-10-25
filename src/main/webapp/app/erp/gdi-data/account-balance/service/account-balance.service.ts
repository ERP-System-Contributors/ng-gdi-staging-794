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
import { IAccountBalance, NewAccountBalance } from '../account-balance.model';

export type PartialUpdateAccountBalance = Partial<IAccountBalance> & Pick<IAccountBalance, 'id'>;

type RestOf<T extends IAccountBalance | NewAccountBalance> = Omit<T, 'reportingDate'> & {
  reportingDate?: string | null;
};

export type RestAccountBalance = RestOf<IAccountBalance>;

export type NewRestAccountBalance = RestOf<NewAccountBalance>;

export type PartialUpdateRestAccountBalance = RestOf<PartialUpdateAccountBalance>;

export type EntityResponseType = HttpResponse<IAccountBalance>;
export type EntityArrayResponseType = HttpResponse<IAccountBalance[]>;

@Injectable({ providedIn: 'root' })
export class AccountBalanceService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/account-balances');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/account-balances');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(accountBalance: NewAccountBalance): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(accountBalance);
    return this.http
      .post<RestAccountBalance>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(accountBalance: IAccountBalance): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(accountBalance);
    return this.http
      .put<RestAccountBalance>(`${this.resourceUrl}/${this.getAccountBalanceIdentifier(accountBalance)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(accountBalance: PartialUpdateAccountBalance): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(accountBalance);
    return this.http
      .patch<RestAccountBalance>(`${this.resourceUrl}/${this.getAccountBalanceIdentifier(accountBalance)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestAccountBalance>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAccountBalance[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestAccountBalance[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getAccountBalanceIdentifier(accountBalance: Pick<IAccountBalance, 'id'>): number {
    return accountBalance.id;
  }

  compareAccountBalance(o1: Pick<IAccountBalance, 'id'> | null, o2: Pick<IAccountBalance, 'id'> | null): boolean {
    return o1 && o2 ? this.getAccountBalanceIdentifier(o1) === this.getAccountBalanceIdentifier(o2) : o1 === o2;
  }

  addAccountBalanceToCollectionIfMissing<Type extends Pick<IAccountBalance, 'id'>>(
    accountBalanceCollection: Type[],
    ...accountBalancesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const accountBalances: Type[] = accountBalancesToCheck.filter(isPresent);
    if (accountBalances.length > 0) {
      const accountBalanceCollectionIdentifiers = accountBalanceCollection.map(
        accountBalanceItem => this.getAccountBalanceIdentifier(accountBalanceItem)!
      );
      const accountBalancesToAdd = accountBalances.filter(accountBalanceItem => {
        const accountBalanceIdentifier = this.getAccountBalanceIdentifier(accountBalanceItem);
        if (accountBalanceCollectionIdentifiers.includes(accountBalanceIdentifier)) {
          return false;
        }
        accountBalanceCollectionIdentifiers.push(accountBalanceIdentifier);
        return true;
      });
      return [...accountBalancesToAdd, ...accountBalanceCollection];
    }
    return accountBalanceCollection;
  }

  protected convertDateFromClient<T extends IAccountBalance | NewAccountBalance | PartialUpdateAccountBalance>(
    accountBalance: T
  ): RestOf<T> {
    return {
      ...accountBalance,
      reportingDate: accountBalance.reportingDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restAccountBalance: RestAccountBalance): IAccountBalance {
    return {
      ...restAccountBalance,
      reportingDate: restAccountBalance.reportingDate ? dayjs(restAccountBalance.reportingDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestAccountBalance>): HttpResponse<IAccountBalance> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestAccountBalance[]>): HttpResponse<IAccountBalance[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
