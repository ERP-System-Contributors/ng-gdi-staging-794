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
import { IAcquiringIssuingFlag, NewAcquiringIssuingFlag } from '../acquiring-issuing-flag.model';

export type PartialUpdateAcquiringIssuingFlag = Partial<IAcquiringIssuingFlag> & Pick<IAcquiringIssuingFlag, 'id'>;

export type EntityResponseType = HttpResponse<IAcquiringIssuingFlag>;
export type EntityArrayResponseType = HttpResponse<IAcquiringIssuingFlag[]>;

@Injectable({ providedIn: 'root' })
export class AcquiringIssuingFlagService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/acquiring-issuing-flags');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/acquiring-issuing-flags');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(acquiringIssuingFlag: NewAcquiringIssuingFlag): Observable<EntityResponseType> {
    return this.http.post<IAcquiringIssuingFlag>(this.resourceUrl, acquiringIssuingFlag, { observe: 'response' });
  }

  update(acquiringIssuingFlag: IAcquiringIssuingFlag): Observable<EntityResponseType> {
    return this.http.put<IAcquiringIssuingFlag>(
      `${this.resourceUrl}/${this.getAcquiringIssuingFlagIdentifier(acquiringIssuingFlag)}`,
      acquiringIssuingFlag,
      { observe: 'response' }
    );
  }

  partialUpdate(acquiringIssuingFlag: PartialUpdateAcquiringIssuingFlag): Observable<EntityResponseType> {
    return this.http.patch<IAcquiringIssuingFlag>(
      `${this.resourceUrl}/${this.getAcquiringIssuingFlagIdentifier(acquiringIssuingFlag)}`,
      acquiringIssuingFlag,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAcquiringIssuingFlag>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAcquiringIssuingFlag[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAcquiringIssuingFlag[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getAcquiringIssuingFlagIdentifier(acquiringIssuingFlag: Pick<IAcquiringIssuingFlag, 'id'>): number {
    return acquiringIssuingFlag.id;
  }

  compareAcquiringIssuingFlag(o1: Pick<IAcquiringIssuingFlag, 'id'> | null, o2: Pick<IAcquiringIssuingFlag, 'id'> | null): boolean {
    return o1 && o2 ? this.getAcquiringIssuingFlagIdentifier(o1) === this.getAcquiringIssuingFlagIdentifier(o2) : o1 === o2;
  }

  addAcquiringIssuingFlagToCollectionIfMissing<Type extends Pick<IAcquiringIssuingFlag, 'id'>>(
    acquiringIssuingFlagCollection: Type[],
    ...acquiringIssuingFlagsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const acquiringIssuingFlags: Type[] = acquiringIssuingFlagsToCheck.filter(isPresent);
    if (acquiringIssuingFlags.length > 0) {
      const acquiringIssuingFlagCollectionIdentifiers = acquiringIssuingFlagCollection.map(
        acquiringIssuingFlagItem => this.getAcquiringIssuingFlagIdentifier(acquiringIssuingFlagItem)!
      );
      const acquiringIssuingFlagsToAdd = acquiringIssuingFlags.filter(acquiringIssuingFlagItem => {
        const acquiringIssuingFlagIdentifier = this.getAcquiringIssuingFlagIdentifier(acquiringIssuingFlagItem);
        if (acquiringIssuingFlagCollectionIdentifiers.includes(acquiringIssuingFlagIdentifier)) {
          return false;
        }
        acquiringIssuingFlagCollectionIdentifiers.push(acquiringIssuingFlagIdentifier);
        return true;
      });
      return [...acquiringIssuingFlagsToAdd, ...acquiringIssuingFlagCollection];
    }
    return acquiringIssuingFlagCollection;
  }
}
