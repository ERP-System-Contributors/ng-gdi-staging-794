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
import { IOutletType, NewOutletType } from '../outlet-type.model';

export type PartialUpdateOutletType = Partial<IOutletType> & Pick<IOutletType, 'id'>;

export type EntityResponseType = HttpResponse<IOutletType>;
export type EntityArrayResponseType = HttpResponse<IOutletType[]>;

@Injectable({ providedIn: 'root' })
export class OutletTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/outlet-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/outlet-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(outletType: NewOutletType): Observable<EntityResponseType> {
    return this.http.post<IOutletType>(this.resourceUrl, outletType, { observe: 'response' });
  }

  update(outletType: IOutletType): Observable<EntityResponseType> {
    return this.http.put<IOutletType>(`${this.resourceUrl}/${this.getOutletTypeIdentifier(outletType)}`, outletType, {
      observe: 'response',
    });
  }

  partialUpdate(outletType: PartialUpdateOutletType): Observable<EntityResponseType> {
    return this.http.patch<IOutletType>(`${this.resourceUrl}/${this.getOutletTypeIdentifier(outletType)}`, outletType, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOutletType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOutletType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOutletType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getOutletTypeIdentifier(outletType: Pick<IOutletType, 'id'>): number {
    return outletType.id;
  }

  compareOutletType(o1: Pick<IOutletType, 'id'> | null, o2: Pick<IOutletType, 'id'> | null): boolean {
    return o1 && o2 ? this.getOutletTypeIdentifier(o1) === this.getOutletTypeIdentifier(o2) : o1 === o2;
  }

  addOutletTypeToCollectionIfMissing<Type extends Pick<IOutletType, 'id'>>(
    outletTypeCollection: Type[],
    ...outletTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const outletTypes: Type[] = outletTypesToCheck.filter(isPresent);
    if (outletTypes.length > 0) {
      const outletTypeCollectionIdentifiers = outletTypeCollection.map(outletTypeItem => this.getOutletTypeIdentifier(outletTypeItem)!);
      const outletTypesToAdd = outletTypes.filter(outletTypeItem => {
        const outletTypeIdentifier = this.getOutletTypeIdentifier(outletTypeItem);
        if (outletTypeCollectionIdentifiers.includes(outletTypeIdentifier)) {
          return false;
        }
        outletTypeCollectionIdentifiers.push(outletTypeIdentifier);
        return true;
      });
      return [...outletTypesToAdd, ...outletTypeCollection];
    }
    return outletTypeCollection;
  }
}
