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
import { ICountySubCountyCode, NewCountySubCountyCode } from '../county-sub-county-code.model';

export type PartialUpdateCountySubCountyCode = Partial<ICountySubCountyCode> & Pick<ICountySubCountyCode, 'id'>;

export type EntityResponseType = HttpResponse<ICountySubCountyCode>;
export type EntityArrayResponseType = HttpResponse<ICountySubCountyCode[]>;

@Injectable({ providedIn: 'root' })
export class CountySubCountyCodeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/county-sub-county-codes');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/county-sub-county-codes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(countySubCountyCode: NewCountySubCountyCode): Observable<EntityResponseType> {
    return this.http.post<ICountySubCountyCode>(this.resourceUrl, countySubCountyCode, { observe: 'response' });
  }

  update(countySubCountyCode: ICountySubCountyCode): Observable<EntityResponseType> {
    return this.http.put<ICountySubCountyCode>(
      `${this.resourceUrl}/${this.getCountySubCountyCodeIdentifier(countySubCountyCode)}`,
      countySubCountyCode,
      { observe: 'response' }
    );
  }

  partialUpdate(countySubCountyCode: PartialUpdateCountySubCountyCode): Observable<EntityResponseType> {
    return this.http.patch<ICountySubCountyCode>(
      `${this.resourceUrl}/${this.getCountySubCountyCodeIdentifier(countySubCountyCode)}`,
      countySubCountyCode,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICountySubCountyCode>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICountySubCountyCode[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICountySubCountyCode[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCountySubCountyCodeIdentifier(countySubCountyCode: Pick<ICountySubCountyCode, 'id'>): number {
    return countySubCountyCode.id;
  }

  compareCountySubCountyCode(o1: Pick<ICountySubCountyCode, 'id'> | null, o2: Pick<ICountySubCountyCode, 'id'> | null): boolean {
    return o1 && o2 ? this.getCountySubCountyCodeIdentifier(o1) === this.getCountySubCountyCodeIdentifier(o2) : o1 === o2;
  }

  addCountySubCountyCodeToCollectionIfMissing<Type extends Pick<ICountySubCountyCode, 'id'>>(
    countySubCountyCodeCollection: Type[],
    ...countySubCountyCodesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const countySubCountyCodes: Type[] = countySubCountyCodesToCheck.filter(isPresent);
    if (countySubCountyCodes.length > 0) {
      const countySubCountyCodeCollectionIdentifiers = countySubCountyCodeCollection.map(
        countySubCountyCodeItem => this.getCountySubCountyCodeIdentifier(countySubCountyCodeItem)!
      );
      const countySubCountyCodesToAdd = countySubCountyCodes.filter(countySubCountyCodeItem => {
        const countySubCountyCodeIdentifier = this.getCountySubCountyCodeIdentifier(countySubCountyCodeItem);
        if (countySubCountyCodeCollectionIdentifiers.includes(countySubCountyCodeIdentifier)) {
          return false;
        }
        countySubCountyCodeCollectionIdentifiers.push(countySubCountyCodeIdentifier);
        return true;
      });
      return [...countySubCountyCodesToAdd, ...countySubCountyCodeCollection];
    }
    return countySubCountyCodeCollection;
  }
}
