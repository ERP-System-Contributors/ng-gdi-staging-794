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
import { ICollateralType, NewCollateralType } from '../collateral-type.model';

export type PartialUpdateCollateralType = Partial<ICollateralType> & Pick<ICollateralType, 'id'>;

export type EntityResponseType = HttpResponse<ICollateralType>;
export type EntityArrayResponseType = HttpResponse<ICollateralType[]>;

@Injectable({ providedIn: 'root' })
export class CollateralTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/collateral-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/collateral-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(collateralType: NewCollateralType): Observable<EntityResponseType> {
    return this.http.post<ICollateralType>(this.resourceUrl, collateralType, { observe: 'response' });
  }

  update(collateralType: ICollateralType): Observable<EntityResponseType> {
    return this.http.put<ICollateralType>(`${this.resourceUrl}/${this.getCollateralTypeIdentifier(collateralType)}`, collateralType, {
      observe: 'response',
    });
  }

  partialUpdate(collateralType: PartialUpdateCollateralType): Observable<EntityResponseType> {
    return this.http.patch<ICollateralType>(`${this.resourceUrl}/${this.getCollateralTypeIdentifier(collateralType)}`, collateralType, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICollateralType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICollateralType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICollateralType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCollateralTypeIdentifier(collateralType: Pick<ICollateralType, 'id'>): number {
    return collateralType.id;
  }

  compareCollateralType(o1: Pick<ICollateralType, 'id'> | null, o2: Pick<ICollateralType, 'id'> | null): boolean {
    return o1 && o2 ? this.getCollateralTypeIdentifier(o1) === this.getCollateralTypeIdentifier(o2) : o1 === o2;
  }

  addCollateralTypeToCollectionIfMissing<Type extends Pick<ICollateralType, 'id'>>(
    collateralTypeCollection: Type[],
    ...collateralTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const collateralTypes: Type[] = collateralTypesToCheck.filter(isPresent);
    if (collateralTypes.length > 0) {
      const collateralTypeCollectionIdentifiers = collateralTypeCollection.map(
        collateralTypeItem => this.getCollateralTypeIdentifier(collateralTypeItem)!
      );
      const collateralTypesToAdd = collateralTypes.filter(collateralTypeItem => {
        const collateralTypeIdentifier = this.getCollateralTypeIdentifier(collateralTypeItem);
        if (collateralTypeCollectionIdentifiers.includes(collateralTypeIdentifier)) {
          return false;
        }
        collateralTypeCollectionIdentifiers.push(collateralTypeIdentifier);
        return true;
      });
      return [...collateralTypesToAdd, ...collateralTypeCollection];
    }
    return collateralTypeCollection;
  }
}
