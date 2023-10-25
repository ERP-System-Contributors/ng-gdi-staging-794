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
import { ICardUsageInformation, NewCardUsageInformation } from '../card-usage-information.model';

export type PartialUpdateCardUsageInformation = Partial<ICardUsageInformation> & Pick<ICardUsageInformation, 'id'>;

type RestOf<T extends ICardUsageInformation | NewCardUsageInformation> = Omit<T, 'reportingDate'> & {
  reportingDate?: string | null;
};

export type RestCardUsageInformation = RestOf<ICardUsageInformation>;

export type NewRestCardUsageInformation = RestOf<NewCardUsageInformation>;

export type PartialUpdateRestCardUsageInformation = RestOf<PartialUpdateCardUsageInformation>;

export type EntityResponseType = HttpResponse<ICardUsageInformation>;
export type EntityArrayResponseType = HttpResponse<ICardUsageInformation[]>;

@Injectable({ providedIn: 'root' })
export class CardUsageInformationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/card-usage-informations');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/card-usage-informations');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cardUsageInformation: NewCardUsageInformation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cardUsageInformation);
    return this.http
      .post<RestCardUsageInformation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(cardUsageInformation: ICardUsageInformation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cardUsageInformation);
    return this.http
      .put<RestCardUsageInformation>(`${this.resourceUrl}/${this.getCardUsageInformationIdentifier(cardUsageInformation)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(cardUsageInformation: PartialUpdateCardUsageInformation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cardUsageInformation);
    return this.http
      .patch<RestCardUsageInformation>(`${this.resourceUrl}/${this.getCardUsageInformationIdentifier(cardUsageInformation)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCardUsageInformation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCardUsageInformation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCardUsageInformation[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getCardUsageInformationIdentifier(cardUsageInformation: Pick<ICardUsageInformation, 'id'>): number {
    return cardUsageInformation.id;
  }

  compareCardUsageInformation(o1: Pick<ICardUsageInformation, 'id'> | null, o2: Pick<ICardUsageInformation, 'id'> | null): boolean {
    return o1 && o2 ? this.getCardUsageInformationIdentifier(o1) === this.getCardUsageInformationIdentifier(o2) : o1 === o2;
  }

  addCardUsageInformationToCollectionIfMissing<Type extends Pick<ICardUsageInformation, 'id'>>(
    cardUsageInformationCollection: Type[],
    ...cardUsageInformationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const cardUsageInformations: Type[] = cardUsageInformationsToCheck.filter(isPresent);
    if (cardUsageInformations.length > 0) {
      const cardUsageInformationCollectionIdentifiers = cardUsageInformationCollection.map(
        cardUsageInformationItem => this.getCardUsageInformationIdentifier(cardUsageInformationItem)!
      );
      const cardUsageInformationsToAdd = cardUsageInformations.filter(cardUsageInformationItem => {
        const cardUsageInformationIdentifier = this.getCardUsageInformationIdentifier(cardUsageInformationItem);
        if (cardUsageInformationCollectionIdentifiers.includes(cardUsageInformationIdentifier)) {
          return false;
        }
        cardUsageInformationCollectionIdentifiers.push(cardUsageInformationIdentifier);
        return true;
      });
      return [...cardUsageInformationsToAdd, ...cardUsageInformationCollection];
    }
    return cardUsageInformationCollection;
  }

  protected convertDateFromClient<T extends ICardUsageInformation | NewCardUsageInformation | PartialUpdateCardUsageInformation>(
    cardUsageInformation: T
  ): RestOf<T> {
    return {
      ...cardUsageInformation,
      reportingDate: cardUsageInformation.reportingDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restCardUsageInformation: RestCardUsageInformation): ICardUsageInformation {
    return {
      ...restCardUsageInformation,
      reportingDate: restCardUsageInformation.reportingDate ? dayjs(restCardUsageInformation.reportingDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCardUsageInformation>): HttpResponse<ICardUsageInformation> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCardUsageInformation[]>): HttpResponse<ICardUsageInformation[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
