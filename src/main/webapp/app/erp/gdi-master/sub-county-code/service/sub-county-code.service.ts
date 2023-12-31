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
import { ISubCountyCode, NewSubCountyCode } from '../sub-county-code.model';

export type PartialUpdateSubCountyCode = Partial<ISubCountyCode> & Pick<ISubCountyCode, 'id'>;

export type EntityResponseType = HttpResponse<ISubCountyCode>;
export type EntityArrayResponseType = HttpResponse<ISubCountyCode[]>;

@Injectable({ providedIn: 'root' })
export class SubCountyCodeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/sub-county-codes');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/sub-county-codes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(subCountyCode: NewSubCountyCode): Observable<EntityResponseType> {
    return this.http.post<ISubCountyCode>(this.resourceUrl, subCountyCode, { observe: 'response' });
  }

  update(subCountyCode: ISubCountyCode): Observable<EntityResponseType> {
    return this.http.put<ISubCountyCode>(`${this.resourceUrl}/${this.getSubCountyCodeIdentifier(subCountyCode)}`, subCountyCode, {
      observe: 'response',
    });
  }

  partialUpdate(subCountyCode: PartialUpdateSubCountyCode): Observable<EntityResponseType> {
    return this.http.patch<ISubCountyCode>(`${this.resourceUrl}/${this.getSubCountyCodeIdentifier(subCountyCode)}`, subCountyCode, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISubCountyCode>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISubCountyCode[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISubCountyCode[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getSubCountyCodeIdentifier(subCountyCode: Pick<ISubCountyCode, 'id'>): number {
    return subCountyCode.id;
  }

  compareSubCountyCode(o1: Pick<ISubCountyCode, 'id'> | null, o2: Pick<ISubCountyCode, 'id'> | null): boolean {
    return o1 && o2 ? this.getSubCountyCodeIdentifier(o1) === this.getSubCountyCodeIdentifier(o2) : o1 === o2;
  }

  addSubCountyCodeToCollectionIfMissing<Type extends Pick<ISubCountyCode, 'id'>>(
    subCountyCodeCollection: Type[],
    ...subCountyCodesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const subCountyCodes: Type[] = subCountyCodesToCheck.filter(isPresent);
    if (subCountyCodes.length > 0) {
      const subCountyCodeCollectionIdentifiers = subCountyCodeCollection.map(
        subCountyCodeItem => this.getSubCountyCodeIdentifier(subCountyCodeItem)!
      );
      const subCountyCodesToAdd = subCountyCodes.filter(subCountyCodeItem => {
        const subCountyCodeIdentifier = this.getSubCountyCodeIdentifier(subCountyCodeItem);
        if (subCountyCodeCollectionIdentifiers.includes(subCountyCodeIdentifier)) {
          return false;
        }
        subCountyCodeCollectionIdentifiers.push(subCountyCodeIdentifier);
        return true;
      });
      return [...subCountyCodesToAdd, ...subCountyCodeCollection];
    }
    return subCountyCodeCollection;
  }
}
