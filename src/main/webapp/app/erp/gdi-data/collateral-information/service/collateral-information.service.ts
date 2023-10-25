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
import { ICollateralInformation, NewCollateralInformation } from '../collateral-information.model';

export type PartialUpdateCollateralInformation = Partial<ICollateralInformation> & Pick<ICollateralInformation, 'id'>;

type RestOf<T extends ICollateralInformation | NewCollateralInformation> = Omit<
  T,
  'reportingDate' | 'collateralLastValuationDate' | 'insuranceExpiryDate'
> & {
  reportingDate?: string | null;
  collateralLastValuationDate?: string | null;
  insuranceExpiryDate?: string | null;
};

export type RestCollateralInformation = RestOf<ICollateralInformation>;

export type NewRestCollateralInformation = RestOf<NewCollateralInformation>;

export type PartialUpdateRestCollateralInformation = RestOf<PartialUpdateCollateralInformation>;

export type EntityResponseType = HttpResponse<ICollateralInformation>;
export type EntityArrayResponseType = HttpResponse<ICollateralInformation[]>;

@Injectable({ providedIn: 'root' })
export class CollateralInformationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/collateral-informations');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/collateral-informations');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(collateralInformation: NewCollateralInformation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(collateralInformation);
    return this.http
      .post<RestCollateralInformation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(collateralInformation: ICollateralInformation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(collateralInformation);
    return this.http
      .put<RestCollateralInformation>(`${this.resourceUrl}/${this.getCollateralInformationIdentifier(collateralInformation)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(collateralInformation: PartialUpdateCollateralInformation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(collateralInformation);
    return this.http
      .patch<RestCollateralInformation>(`${this.resourceUrl}/${this.getCollateralInformationIdentifier(collateralInformation)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCollateralInformation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCollateralInformation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCollateralInformation[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getCollateralInformationIdentifier(collateralInformation: Pick<ICollateralInformation, 'id'>): number {
    return collateralInformation.id;
  }

  compareCollateralInformation(o1: Pick<ICollateralInformation, 'id'> | null, o2: Pick<ICollateralInformation, 'id'> | null): boolean {
    return o1 && o2 ? this.getCollateralInformationIdentifier(o1) === this.getCollateralInformationIdentifier(o2) : o1 === o2;
  }

  addCollateralInformationToCollectionIfMissing<Type extends Pick<ICollateralInformation, 'id'>>(
    collateralInformationCollection: Type[],
    ...collateralInformationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const collateralInformations: Type[] = collateralInformationsToCheck.filter(isPresent);
    if (collateralInformations.length > 0) {
      const collateralInformationCollectionIdentifiers = collateralInformationCollection.map(
        collateralInformationItem => this.getCollateralInformationIdentifier(collateralInformationItem)!
      );
      const collateralInformationsToAdd = collateralInformations.filter(collateralInformationItem => {
        const collateralInformationIdentifier = this.getCollateralInformationIdentifier(collateralInformationItem);
        if (collateralInformationCollectionIdentifiers.includes(collateralInformationIdentifier)) {
          return false;
        }
        collateralInformationCollectionIdentifiers.push(collateralInformationIdentifier);
        return true;
      });
      return [...collateralInformationsToAdd, ...collateralInformationCollection];
    }
    return collateralInformationCollection;
  }

  protected convertDateFromClient<T extends ICollateralInformation | NewCollateralInformation | PartialUpdateCollateralInformation>(
    collateralInformation: T
  ): RestOf<T> {
    return {
      ...collateralInformation,
      reportingDate: collateralInformation.reportingDate?.format(DATE_FORMAT) ?? null,
      collateralLastValuationDate: collateralInformation.collateralLastValuationDate?.format(DATE_FORMAT) ?? null,
      insuranceExpiryDate: collateralInformation.insuranceExpiryDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restCollateralInformation: RestCollateralInformation): ICollateralInformation {
    return {
      ...restCollateralInformation,
      reportingDate: restCollateralInformation.reportingDate ? dayjs(restCollateralInformation.reportingDate) : undefined,
      collateralLastValuationDate: restCollateralInformation.collateralLastValuationDate
        ? dayjs(restCollateralInformation.collateralLastValuationDate)
        : undefined,
      insuranceExpiryDate: restCollateralInformation.insuranceExpiryDate ? dayjs(restCollateralInformation.insuranceExpiryDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCollateralInformation>): HttpResponse<ICollateralInformation> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCollateralInformation[]>): HttpResponse<ICollateralInformation[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
