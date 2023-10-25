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
import { IDerivativeSubType, NewDerivativeSubType } from '../derivative-sub-type.model';

export type PartialUpdateDerivativeSubType = Partial<IDerivativeSubType> & Pick<IDerivativeSubType, 'id'>;

export type EntityResponseType = HttpResponse<IDerivativeSubType>;
export type EntityArrayResponseType = HttpResponse<IDerivativeSubType[]>;

@Injectable({ providedIn: 'root' })
export class DerivativeSubTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/derivative-sub-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/derivative-sub-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(derivativeSubType: NewDerivativeSubType): Observable<EntityResponseType> {
    return this.http.post<IDerivativeSubType>(this.resourceUrl, derivativeSubType, { observe: 'response' });
  }

  update(derivativeSubType: IDerivativeSubType): Observable<EntityResponseType> {
    return this.http.put<IDerivativeSubType>(
      `${this.resourceUrl}/${this.getDerivativeSubTypeIdentifier(derivativeSubType)}`,
      derivativeSubType,
      { observe: 'response' }
    );
  }

  partialUpdate(derivativeSubType: PartialUpdateDerivativeSubType): Observable<EntityResponseType> {
    return this.http.patch<IDerivativeSubType>(
      `${this.resourceUrl}/${this.getDerivativeSubTypeIdentifier(derivativeSubType)}`,
      derivativeSubType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDerivativeSubType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDerivativeSubType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDerivativeSubType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getDerivativeSubTypeIdentifier(derivativeSubType: Pick<IDerivativeSubType, 'id'>): number {
    return derivativeSubType.id;
  }

  compareDerivativeSubType(o1: Pick<IDerivativeSubType, 'id'> | null, o2: Pick<IDerivativeSubType, 'id'> | null): boolean {
    return o1 && o2 ? this.getDerivativeSubTypeIdentifier(o1) === this.getDerivativeSubTypeIdentifier(o2) : o1 === o2;
  }

  addDerivativeSubTypeToCollectionIfMissing<Type extends Pick<IDerivativeSubType, 'id'>>(
    derivativeSubTypeCollection: Type[],
    ...derivativeSubTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const derivativeSubTypes: Type[] = derivativeSubTypesToCheck.filter(isPresent);
    if (derivativeSubTypes.length > 0) {
      const derivativeSubTypeCollectionIdentifiers = derivativeSubTypeCollection.map(
        derivativeSubTypeItem => this.getDerivativeSubTypeIdentifier(derivativeSubTypeItem)!
      );
      const derivativeSubTypesToAdd = derivativeSubTypes.filter(derivativeSubTypeItem => {
        const derivativeSubTypeIdentifier = this.getDerivativeSubTypeIdentifier(derivativeSubTypeItem);
        if (derivativeSubTypeCollectionIdentifiers.includes(derivativeSubTypeIdentifier)) {
          return false;
        }
        derivativeSubTypeCollectionIdentifiers.push(derivativeSubTypeIdentifier);
        return true;
      });
      return [...derivativeSubTypesToAdd, ...derivativeSubTypeCollection];
    }
    return derivativeSubTypeCollection;
  }
}
