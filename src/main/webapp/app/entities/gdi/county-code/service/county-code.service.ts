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
import { ICountyCode, NewCountyCode } from '../county-code.model';

export type PartialUpdateCountyCode = Partial<ICountyCode> & Pick<ICountyCode, 'id'>;

export type EntityResponseType = HttpResponse<ICountyCode>;
export type EntityArrayResponseType = HttpResponse<ICountyCode[]>;

@Injectable({ providedIn: 'root' })
export class CountyCodeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/county-codes');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/county-codes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(countyCode: NewCountyCode): Observable<EntityResponseType> {
    return this.http.post<ICountyCode>(this.resourceUrl, countyCode, { observe: 'response' });
  }

  update(countyCode: ICountyCode): Observable<EntityResponseType> {
    return this.http.put<ICountyCode>(`${this.resourceUrl}/${this.getCountyCodeIdentifier(countyCode)}`, countyCode, {
      observe: 'response',
    });
  }

  partialUpdate(countyCode: PartialUpdateCountyCode): Observable<EntityResponseType> {
    return this.http.patch<ICountyCode>(`${this.resourceUrl}/${this.getCountyCodeIdentifier(countyCode)}`, countyCode, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICountyCode>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICountyCode[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICountyCode[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCountyCodeIdentifier(countyCode: Pick<ICountyCode, 'id'>): number {
    return countyCode.id;
  }

  compareCountyCode(o1: Pick<ICountyCode, 'id'> | null, o2: Pick<ICountyCode, 'id'> | null): boolean {
    return o1 && o2 ? this.getCountyCodeIdentifier(o1) === this.getCountyCodeIdentifier(o2) : o1 === o2;
  }

  addCountyCodeToCollectionIfMissing<Type extends Pick<ICountyCode, 'id'>>(
    countyCodeCollection: Type[],
    ...countyCodesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const countyCodes: Type[] = countyCodesToCheck.filter(isPresent);
    if (countyCodes.length > 0) {
      const countyCodeCollectionIdentifiers = countyCodeCollection.map(countyCodeItem => this.getCountyCodeIdentifier(countyCodeItem)!);
      const countyCodesToAdd = countyCodes.filter(countyCodeItem => {
        const countyCodeIdentifier = this.getCountyCodeIdentifier(countyCodeItem);
        if (countyCodeCollectionIdentifiers.includes(countyCodeIdentifier)) {
          return false;
        }
        countyCodeCollectionIdentifiers.push(countyCodeIdentifier);
        return true;
      });
      return [...countyCodesToAdd, ...countyCodeCollection];
    }
    return countyCodeCollection;
  }
}
