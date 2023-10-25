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
import { IWeeklyCashHolding, NewWeeklyCashHolding } from '../weekly-cash-holding.model';

export type PartialUpdateWeeklyCashHolding = Partial<IWeeklyCashHolding> & Pick<IWeeklyCashHolding, 'id'>;

type RestOf<T extends IWeeklyCashHolding | NewWeeklyCashHolding> = Omit<T, 'reportingDate'> & {
  reportingDate?: string | null;
};

export type RestWeeklyCashHolding = RestOf<IWeeklyCashHolding>;

export type NewRestWeeklyCashHolding = RestOf<NewWeeklyCashHolding>;

export type PartialUpdateRestWeeklyCashHolding = RestOf<PartialUpdateWeeklyCashHolding>;

export type EntityResponseType = HttpResponse<IWeeklyCashHolding>;
export type EntityArrayResponseType = HttpResponse<IWeeklyCashHolding[]>;

@Injectable({ providedIn: 'root' })
export class WeeklyCashHoldingService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/weekly-cash-holdings');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/weekly-cash-holdings');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(weeklyCashHolding: NewWeeklyCashHolding): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(weeklyCashHolding);
    return this.http
      .post<RestWeeklyCashHolding>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(weeklyCashHolding: IWeeklyCashHolding): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(weeklyCashHolding);
    return this.http
      .put<RestWeeklyCashHolding>(`${this.resourceUrl}/${this.getWeeklyCashHoldingIdentifier(weeklyCashHolding)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(weeklyCashHolding: PartialUpdateWeeklyCashHolding): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(weeklyCashHolding);
    return this.http
      .patch<RestWeeklyCashHolding>(`${this.resourceUrl}/${this.getWeeklyCashHoldingIdentifier(weeklyCashHolding)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestWeeklyCashHolding>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestWeeklyCashHolding[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestWeeklyCashHolding[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getWeeklyCashHoldingIdentifier(weeklyCashHolding: Pick<IWeeklyCashHolding, 'id'>): number {
    return weeklyCashHolding.id;
  }

  compareWeeklyCashHolding(o1: Pick<IWeeklyCashHolding, 'id'> | null, o2: Pick<IWeeklyCashHolding, 'id'> | null): boolean {
    return o1 && o2 ? this.getWeeklyCashHoldingIdentifier(o1) === this.getWeeklyCashHoldingIdentifier(o2) : o1 === o2;
  }

  addWeeklyCashHoldingToCollectionIfMissing<Type extends Pick<IWeeklyCashHolding, 'id'>>(
    weeklyCashHoldingCollection: Type[],
    ...weeklyCashHoldingsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const weeklyCashHoldings: Type[] = weeklyCashHoldingsToCheck.filter(isPresent);
    if (weeklyCashHoldings.length > 0) {
      const weeklyCashHoldingCollectionIdentifiers = weeklyCashHoldingCollection.map(
        weeklyCashHoldingItem => this.getWeeklyCashHoldingIdentifier(weeklyCashHoldingItem)!
      );
      const weeklyCashHoldingsToAdd = weeklyCashHoldings.filter(weeklyCashHoldingItem => {
        const weeklyCashHoldingIdentifier = this.getWeeklyCashHoldingIdentifier(weeklyCashHoldingItem);
        if (weeklyCashHoldingCollectionIdentifiers.includes(weeklyCashHoldingIdentifier)) {
          return false;
        }
        weeklyCashHoldingCollectionIdentifiers.push(weeklyCashHoldingIdentifier);
        return true;
      });
      return [...weeklyCashHoldingsToAdd, ...weeklyCashHoldingCollection];
    }
    return weeklyCashHoldingCollection;
  }

  protected convertDateFromClient<T extends IWeeklyCashHolding | NewWeeklyCashHolding | PartialUpdateWeeklyCashHolding>(
    weeklyCashHolding: T
  ): RestOf<T> {
    return {
      ...weeklyCashHolding,
      reportingDate: weeklyCashHolding.reportingDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restWeeklyCashHolding: RestWeeklyCashHolding): IWeeklyCashHolding {
    return {
      ...restWeeklyCashHolding,
      reportingDate: restWeeklyCashHolding.reportingDate ? dayjs(restWeeklyCashHolding.reportingDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestWeeklyCashHolding>): HttpResponse<IWeeklyCashHolding> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestWeeklyCashHolding[]>): HttpResponse<IWeeklyCashHolding[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
