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
import { ICrbAmountCategoryBand, NewCrbAmountCategoryBand } from '../crb-amount-category-band.model';

export type PartialUpdateCrbAmountCategoryBand = Partial<ICrbAmountCategoryBand> & Pick<ICrbAmountCategoryBand, 'id'>;

export type EntityResponseType = HttpResponse<ICrbAmountCategoryBand>;
export type EntityArrayResponseType = HttpResponse<ICrbAmountCategoryBand[]>;

@Injectable({ providedIn: 'root' })
export class CrbAmountCategoryBandService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crb-amount-category-bands');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/crb-amount-category-bands');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crbAmountCategoryBand: NewCrbAmountCategoryBand): Observable<EntityResponseType> {
    return this.http.post<ICrbAmountCategoryBand>(this.resourceUrl, crbAmountCategoryBand, { observe: 'response' });
  }

  update(crbAmountCategoryBand: ICrbAmountCategoryBand): Observable<EntityResponseType> {
    return this.http.put<ICrbAmountCategoryBand>(
      `${this.resourceUrl}/${this.getCrbAmountCategoryBandIdentifier(crbAmountCategoryBand)}`,
      crbAmountCategoryBand,
      { observe: 'response' }
    );
  }

  partialUpdate(crbAmountCategoryBand: PartialUpdateCrbAmountCategoryBand): Observable<EntityResponseType> {
    return this.http.patch<ICrbAmountCategoryBand>(
      `${this.resourceUrl}/${this.getCrbAmountCategoryBandIdentifier(crbAmountCategoryBand)}`,
      crbAmountCategoryBand,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrbAmountCategoryBand>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbAmountCategoryBand[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbAmountCategoryBand[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCrbAmountCategoryBandIdentifier(crbAmountCategoryBand: Pick<ICrbAmountCategoryBand, 'id'>): number {
    return crbAmountCategoryBand.id;
  }

  compareCrbAmountCategoryBand(o1: Pick<ICrbAmountCategoryBand, 'id'> | null, o2: Pick<ICrbAmountCategoryBand, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrbAmountCategoryBandIdentifier(o1) === this.getCrbAmountCategoryBandIdentifier(o2) : o1 === o2;
  }

  addCrbAmountCategoryBandToCollectionIfMissing<Type extends Pick<ICrbAmountCategoryBand, 'id'>>(
    crbAmountCategoryBandCollection: Type[],
    ...crbAmountCategoryBandsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crbAmountCategoryBands: Type[] = crbAmountCategoryBandsToCheck.filter(isPresent);
    if (crbAmountCategoryBands.length > 0) {
      const crbAmountCategoryBandCollectionIdentifiers = crbAmountCategoryBandCollection.map(
        crbAmountCategoryBandItem => this.getCrbAmountCategoryBandIdentifier(crbAmountCategoryBandItem)!
      );
      const crbAmountCategoryBandsToAdd = crbAmountCategoryBands.filter(crbAmountCategoryBandItem => {
        const crbAmountCategoryBandIdentifier = this.getCrbAmountCategoryBandIdentifier(crbAmountCategoryBandItem);
        if (crbAmountCategoryBandCollectionIdentifiers.includes(crbAmountCategoryBandIdentifier)) {
          return false;
        }
        crbAmountCategoryBandCollectionIdentifiers.push(crbAmountCategoryBandIdentifier);
        return true;
      });
      return [...crbAmountCategoryBandsToAdd, ...crbAmountCategoryBandCollection];
    }
    return crbAmountCategoryBandCollection;
  }
}
