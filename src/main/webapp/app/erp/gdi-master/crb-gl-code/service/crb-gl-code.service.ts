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
import { ICrbGlCode, NewCrbGlCode } from '../crb-gl-code.model';

export type PartialUpdateCrbGlCode = Partial<ICrbGlCode> & Pick<ICrbGlCode, 'id'>;

export type EntityResponseType = HttpResponse<ICrbGlCode>;
export type EntityArrayResponseType = HttpResponse<ICrbGlCode[]>;

@Injectable({ providedIn: 'root' })
export class CrbGlCodeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/crb-gl-codes');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/crb-gl-codes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(crbGlCode: NewCrbGlCode): Observable<EntityResponseType> {
    return this.http.post<ICrbGlCode>(this.resourceUrl, crbGlCode, { observe: 'response' });
  }

  update(crbGlCode: ICrbGlCode): Observable<EntityResponseType> {
    return this.http.put<ICrbGlCode>(`${this.resourceUrl}/${this.getCrbGlCodeIdentifier(crbGlCode)}`, crbGlCode, { observe: 'response' });
  }

  partialUpdate(crbGlCode: PartialUpdateCrbGlCode): Observable<EntityResponseType> {
    return this.http.patch<ICrbGlCode>(`${this.resourceUrl}/${this.getCrbGlCodeIdentifier(crbGlCode)}`, crbGlCode, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICrbGlCode>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbGlCode[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICrbGlCode[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCrbGlCodeIdentifier(crbGlCode: Pick<ICrbGlCode, 'id'>): number {
    return crbGlCode.id;
  }

  compareCrbGlCode(o1: Pick<ICrbGlCode, 'id'> | null, o2: Pick<ICrbGlCode, 'id'> | null): boolean {
    return o1 && o2 ? this.getCrbGlCodeIdentifier(o1) === this.getCrbGlCodeIdentifier(o2) : o1 === o2;
  }

  addCrbGlCodeToCollectionIfMissing<Type extends Pick<ICrbGlCode, 'id'>>(
    crbGlCodeCollection: Type[],
    ...crbGlCodesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const crbGlCodes: Type[] = crbGlCodesToCheck.filter(isPresent);
    if (crbGlCodes.length > 0) {
      const crbGlCodeCollectionIdentifiers = crbGlCodeCollection.map(crbGlCodeItem => this.getCrbGlCodeIdentifier(crbGlCodeItem)!);
      const crbGlCodesToAdd = crbGlCodes.filter(crbGlCodeItem => {
        const crbGlCodeIdentifier = this.getCrbGlCodeIdentifier(crbGlCodeItem);
        if (crbGlCodeCollectionIdentifiers.includes(crbGlCodeIdentifier)) {
          return false;
        }
        crbGlCodeCollectionIdentifiers.push(crbGlCodeIdentifier);
        return true;
      });
      return [...crbGlCodesToAdd, ...crbGlCodeCollection];
    }
    return crbGlCodeCollection;
  }
}
