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
import { IExchangeRate, NewExchangeRate } from '../exchange-rate.model';

export type PartialUpdateExchangeRate = Partial<IExchangeRate> & Pick<IExchangeRate, 'id'>;

type RestOf<T extends IExchangeRate | NewExchangeRate> = Omit<T, 'businessReportingDay'> & {
  businessReportingDay?: string | null;
};

export type RestExchangeRate = RestOf<IExchangeRate>;

export type NewRestExchangeRate = RestOf<NewExchangeRate>;

export type PartialUpdateRestExchangeRate = RestOf<PartialUpdateExchangeRate>;

export type EntityResponseType = HttpResponse<IExchangeRate>;
export type EntityArrayResponseType = HttpResponse<IExchangeRate[]>;

@Injectable({ providedIn: 'root' })
export class ExchangeRateService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/exchange-rates');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/exchange-rates');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(exchangeRate: NewExchangeRate): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(exchangeRate);
    return this.http
      .post<RestExchangeRate>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(exchangeRate: IExchangeRate): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(exchangeRate);
    return this.http
      .put<RestExchangeRate>(`${this.resourceUrl}/${this.getExchangeRateIdentifier(exchangeRate)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(exchangeRate: PartialUpdateExchangeRate): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(exchangeRate);
    return this.http
      .patch<RestExchangeRate>(`${this.resourceUrl}/${this.getExchangeRateIdentifier(exchangeRate)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestExchangeRate>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestExchangeRate[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestExchangeRate[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getExchangeRateIdentifier(exchangeRate: Pick<IExchangeRate, 'id'>): number {
    return exchangeRate.id;
  }

  compareExchangeRate(o1: Pick<IExchangeRate, 'id'> | null, o2: Pick<IExchangeRate, 'id'> | null): boolean {
    return o1 && o2 ? this.getExchangeRateIdentifier(o1) === this.getExchangeRateIdentifier(o2) : o1 === o2;
  }

  addExchangeRateToCollectionIfMissing<Type extends Pick<IExchangeRate, 'id'>>(
    exchangeRateCollection: Type[],
    ...exchangeRatesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const exchangeRates: Type[] = exchangeRatesToCheck.filter(isPresent);
    if (exchangeRates.length > 0) {
      const exchangeRateCollectionIdentifiers = exchangeRateCollection.map(
        exchangeRateItem => this.getExchangeRateIdentifier(exchangeRateItem)!
      );
      const exchangeRatesToAdd = exchangeRates.filter(exchangeRateItem => {
        const exchangeRateIdentifier = this.getExchangeRateIdentifier(exchangeRateItem);
        if (exchangeRateCollectionIdentifiers.includes(exchangeRateIdentifier)) {
          return false;
        }
        exchangeRateCollectionIdentifiers.push(exchangeRateIdentifier);
        return true;
      });
      return [...exchangeRatesToAdd, ...exchangeRateCollection];
    }
    return exchangeRateCollection;
  }

  protected convertDateFromClient<T extends IExchangeRate | NewExchangeRate | PartialUpdateExchangeRate>(exchangeRate: T): RestOf<T> {
    return {
      ...exchangeRate,
      businessReportingDay: exchangeRate.businessReportingDay?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restExchangeRate: RestExchangeRate): IExchangeRate {
    return {
      ...restExchangeRate,
      businessReportingDay: restExchangeRate.businessReportingDay ? dayjs(restExchangeRate.businessReportingDay) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestExchangeRate>): HttpResponse<IExchangeRate> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestExchangeRate[]>): HttpResponse<IExchangeRate[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
