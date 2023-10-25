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
import { IWeeklyCounterfeitHolding, NewWeeklyCounterfeitHolding } from '../weekly-counterfeit-holding.model';

export type PartialUpdateWeeklyCounterfeitHolding = Partial<IWeeklyCounterfeitHolding> & Pick<IWeeklyCounterfeitHolding, 'id'>;

type RestOf<T extends IWeeklyCounterfeitHolding | NewWeeklyCounterfeitHolding> = Omit<
  T,
  'reportingDate' | 'dateConfiscated' | 'dateSubmittedToCBK'
> & {
  reportingDate?: string | null;
  dateConfiscated?: string | null;
  dateSubmittedToCBK?: string | null;
};

export type RestWeeklyCounterfeitHolding = RestOf<IWeeklyCounterfeitHolding>;

export type NewRestWeeklyCounterfeitHolding = RestOf<NewWeeklyCounterfeitHolding>;

export type PartialUpdateRestWeeklyCounterfeitHolding = RestOf<PartialUpdateWeeklyCounterfeitHolding>;

export type EntityResponseType = HttpResponse<IWeeklyCounterfeitHolding>;
export type EntityArrayResponseType = HttpResponse<IWeeklyCounterfeitHolding[]>;

@Injectable({ providedIn: 'root' })
export class WeeklyCounterfeitHoldingService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/weekly-counterfeit-holdings');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/weekly-counterfeit-holdings');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(weeklyCounterfeitHolding: NewWeeklyCounterfeitHolding): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(weeklyCounterfeitHolding);
    return this.http
      .post<RestWeeklyCounterfeitHolding>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(weeklyCounterfeitHolding: IWeeklyCounterfeitHolding): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(weeklyCounterfeitHolding);
    return this.http
      .put<RestWeeklyCounterfeitHolding>(
        `${this.resourceUrl}/${this.getWeeklyCounterfeitHoldingIdentifier(weeklyCounterfeitHolding)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(weeklyCounterfeitHolding: PartialUpdateWeeklyCounterfeitHolding): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(weeklyCounterfeitHolding);
    return this.http
      .patch<RestWeeklyCounterfeitHolding>(
        `${this.resourceUrl}/${this.getWeeklyCounterfeitHoldingIdentifier(weeklyCounterfeitHolding)}`,
        copy,
        { observe: 'response' }
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestWeeklyCounterfeitHolding>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestWeeklyCounterfeitHolding[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestWeeklyCounterfeitHolding[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getWeeklyCounterfeitHoldingIdentifier(weeklyCounterfeitHolding: Pick<IWeeklyCounterfeitHolding, 'id'>): number {
    return weeklyCounterfeitHolding.id;
  }

  compareWeeklyCounterfeitHolding(
    o1: Pick<IWeeklyCounterfeitHolding, 'id'> | null,
    o2: Pick<IWeeklyCounterfeitHolding, 'id'> | null
  ): boolean {
    return o1 && o2 ? this.getWeeklyCounterfeitHoldingIdentifier(o1) === this.getWeeklyCounterfeitHoldingIdentifier(o2) : o1 === o2;
  }

  addWeeklyCounterfeitHoldingToCollectionIfMissing<Type extends Pick<IWeeklyCounterfeitHolding, 'id'>>(
    weeklyCounterfeitHoldingCollection: Type[],
    ...weeklyCounterfeitHoldingsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const weeklyCounterfeitHoldings: Type[] = weeklyCounterfeitHoldingsToCheck.filter(isPresent);
    if (weeklyCounterfeitHoldings.length > 0) {
      const weeklyCounterfeitHoldingCollectionIdentifiers = weeklyCounterfeitHoldingCollection.map(
        weeklyCounterfeitHoldingItem => this.getWeeklyCounterfeitHoldingIdentifier(weeklyCounterfeitHoldingItem)!
      );
      const weeklyCounterfeitHoldingsToAdd = weeklyCounterfeitHoldings.filter(weeklyCounterfeitHoldingItem => {
        const weeklyCounterfeitHoldingIdentifier = this.getWeeklyCounterfeitHoldingIdentifier(weeklyCounterfeitHoldingItem);
        if (weeklyCounterfeitHoldingCollectionIdentifiers.includes(weeklyCounterfeitHoldingIdentifier)) {
          return false;
        }
        weeklyCounterfeitHoldingCollectionIdentifiers.push(weeklyCounterfeitHoldingIdentifier);
        return true;
      });
      return [...weeklyCounterfeitHoldingsToAdd, ...weeklyCounterfeitHoldingCollection];
    }
    return weeklyCounterfeitHoldingCollection;
  }

  protected convertDateFromClient<
    T extends IWeeklyCounterfeitHolding | NewWeeklyCounterfeitHolding | PartialUpdateWeeklyCounterfeitHolding
  >(weeklyCounterfeitHolding: T): RestOf<T> {
    return {
      ...weeklyCounterfeitHolding,
      reportingDate: weeklyCounterfeitHolding.reportingDate?.format(DATE_FORMAT) ?? null,
      dateConfiscated: weeklyCounterfeitHolding.dateConfiscated?.format(DATE_FORMAT) ?? null,
      dateSubmittedToCBK: weeklyCounterfeitHolding.dateSubmittedToCBK?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restWeeklyCounterfeitHolding: RestWeeklyCounterfeitHolding): IWeeklyCounterfeitHolding {
    return {
      ...restWeeklyCounterfeitHolding,
      reportingDate: restWeeklyCounterfeitHolding.reportingDate ? dayjs(restWeeklyCounterfeitHolding.reportingDate) : undefined,
      dateConfiscated: restWeeklyCounterfeitHolding.dateConfiscated ? dayjs(restWeeklyCounterfeitHolding.dateConfiscated) : undefined,
      dateSubmittedToCBK: restWeeklyCounterfeitHolding.dateSubmittedToCBK
        ? dayjs(restWeeklyCounterfeitHolding.dateSubmittedToCBK)
        : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestWeeklyCounterfeitHolding>): HttpResponse<IWeeklyCounterfeitHolding> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestWeeklyCounterfeitHolding[]>): HttpResponse<IWeeklyCounterfeitHolding[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
