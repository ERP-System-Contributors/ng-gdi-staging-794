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
import { ICrbAgingBands, NewCrbAgingBands } from '../crb-aging-bands.model';

export type PartialUpdateCrbAgingBands = Partial<ICrbAgingBands> & Pick<ICrbAgingBands, 'id'>;

export type EntityResponseType = HttpResponse<ICrbAgingBands>;
export type EntityArrayResponseType = HttpResponse<ICrbAgingBands[]>;

@Injectable({ providedIn: 'root' })
export class CrbAgingBandsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crb-aging-bands');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/crb-aging-bands');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crbAgingBands: NewCrbAgingBands): Observable<EntityResponseType> {
    return this.http.post<ICrbAgingBands>(this.resourceUrl, crbAgingBands, { observe: 'response' });
  }

  update(crbAgingBands: ICrbAgingBands): Observable<EntityResponseType> {
    return this.http.put<ICrbAgingBands>(`${this.resourceUrl}/${this.getCrbAgingBandsIdentifier(crbAgingBands)}`, crbAgingBands, {
      observe: 'response',
    });
  }

  partialUpdate(crbAgingBands: PartialUpdateCrbAgingBands): Observable<EntityResponseType> {
    return this.http.patch<ICrbAgingBands>(`${this.resourceUrl}/${this.getCrbAgingBandsIdentifier(crbAgingBands)}`, crbAgingBands, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrbAgingBands>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbAgingBands[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbAgingBands[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCrbAgingBandsIdentifier(crbAgingBands: Pick<ICrbAgingBands, 'id'>): number {
    return crbAgingBands.id;
  }

  compareCrbAgingBands(o1: Pick<ICrbAgingBands, 'id'> | null, o2: Pick<ICrbAgingBands, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrbAgingBandsIdentifier(o1) === this.getCrbAgingBandsIdentifier(o2) : o1 === o2;
  }

  addCrbAgingBandsToCollectionIfMissing<Type extends Pick<ICrbAgingBands, 'id'>>(
    crbAgingBandsCollection: Type[],
    ...crbAgingBandsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crbAgingBands: Type[] = crbAgingBandsToCheck.filter(isPresent);
    if (crbAgingBands.length > 0) {
      const crbAgingBandsCollectionIdentifiers = crbAgingBandsCollection.map(
        crbAgingBandsItem => this.getCrbAgingBandsIdentifier(crbAgingBandsItem)!
      );
      const crbAgingBandsToAdd = crbAgingBands.filter(crbAgingBandsItem => {
        const crbAgingBandsIdentifier = this.getCrbAgingBandsIdentifier(crbAgingBandsItem);
        if (crbAgingBandsCollectionIdentifiers.includes(crbAgingBandsIdentifier)) {
          return false;
        }
        crbAgingBandsCollectionIdentifiers.push(crbAgingBandsIdentifier);
        return true;
      });
      return [...crbAgingBandsToAdd, ...crbAgingBandsCollection];
    }
    return crbAgingBandsCollection;
  }
}
