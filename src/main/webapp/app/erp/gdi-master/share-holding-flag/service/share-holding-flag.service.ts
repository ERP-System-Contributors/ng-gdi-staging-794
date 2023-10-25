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
import { IShareHoldingFlag, NewShareHoldingFlag } from '../share-holding-flag.model';

export type PartialUpdateShareHoldingFlag = Partial<IShareHoldingFlag> & Pick<IShareHoldingFlag, 'id'>;

export type EntityResponseType = HttpResponse<IShareHoldingFlag>;
export type EntityArrayResponseType = HttpResponse<IShareHoldingFlag[]>;

@Injectable({ providedIn: 'root' })
export class ShareHoldingFlagService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/share-holding-flags');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/share-holding-flags');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(shareHoldingFlag: NewShareHoldingFlag): Observable<EntityResponseType> {
    return this.http.post<IShareHoldingFlag>(this.resourceUrl, shareHoldingFlag, { observe: 'response' });
  }

  update(shareHoldingFlag: IShareHoldingFlag): Observable<EntityResponseType> {
    return this.http.put<IShareHoldingFlag>(
      `${this.resourceUrl}/${this.getShareHoldingFlagIdentifier(shareHoldingFlag)}`,
      shareHoldingFlag,
      { observe: 'response' }
    );
  }

  partialUpdate(shareHoldingFlag: PartialUpdateShareHoldingFlag): Observable<EntityResponseType> {
    return this.http.patch<IShareHoldingFlag>(
      `${this.resourceUrl}/${this.getShareHoldingFlagIdentifier(shareHoldingFlag)}`,
      shareHoldingFlag,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IShareHoldingFlag>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IShareHoldingFlag[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IShareHoldingFlag[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getShareHoldingFlagIdentifier(shareHoldingFlag: Pick<IShareHoldingFlag, 'id'>): number {
    return shareHoldingFlag.id;
  }

  compareShareHoldingFlag(o1: Pick<IShareHoldingFlag, 'id'> | null, o2: Pick<IShareHoldingFlag, 'id'> | null): boolean {
    return o1 && o2 ? this.getShareHoldingFlagIdentifier(o1) === this.getShareHoldingFlagIdentifier(o2) : o1 === o2;
  }

  addShareHoldingFlagToCollectionIfMissing<Type extends Pick<IShareHoldingFlag, 'id'>>(
    shareHoldingFlagCollection: Type[],
    ...shareHoldingFlagsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const shareHoldingFlags: Type[] = shareHoldingFlagsToCheck.filter(isPresent);
    if (shareHoldingFlags.length > 0) {
      const shareHoldingFlagCollectionIdentifiers = shareHoldingFlagCollection.map(
        shareHoldingFlagItem => this.getShareHoldingFlagIdentifier(shareHoldingFlagItem)!
      );
      const shareHoldingFlagsToAdd = shareHoldingFlags.filter(shareHoldingFlagItem => {
        const shareHoldingFlagIdentifier = this.getShareHoldingFlagIdentifier(shareHoldingFlagItem);
        if (shareHoldingFlagCollectionIdentifiers.includes(shareHoldingFlagIdentifier)) {
          return false;
        }
        shareHoldingFlagCollectionIdentifiers.push(shareHoldingFlagIdentifier);
        return true;
      });
      return [...shareHoldingFlagsToAdd, ...shareHoldingFlagCollection];
    }
    return shareHoldingFlagCollection;
  }
}
