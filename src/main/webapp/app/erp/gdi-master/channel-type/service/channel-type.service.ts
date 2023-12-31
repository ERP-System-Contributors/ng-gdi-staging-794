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
import { IChannelType, NewChannelType } from '../channel-type.model';

export type PartialUpdateChannelType = Partial<IChannelType> & Pick<IChannelType, 'id'>;

export type EntityResponseType = HttpResponse<IChannelType>;
export type EntityArrayResponseType = HttpResponse<IChannelType[]>;

@Injectable({ providedIn: 'root' })
export class ChannelTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/channel-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/channel-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(channelType: NewChannelType): Observable<EntityResponseType> {
    return this.http.post<IChannelType>(this.resourceUrl, channelType, { observe: 'response' });
  }

  update(channelType: IChannelType): Observable<EntityResponseType> {
    return this.http.put<IChannelType>(`${this.resourceUrl}/${this.getChannelTypeIdentifier(channelType)}`, channelType, {
      observe: 'response',
    });
  }

  partialUpdate(channelType: PartialUpdateChannelType): Observable<EntityResponseType> {
    return this.http.patch<IChannelType>(`${this.resourceUrl}/${this.getChannelTypeIdentifier(channelType)}`, channelType, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IChannelType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IChannelType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IChannelType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getChannelTypeIdentifier(channelType: Pick<IChannelType, 'id'>): number {
    return channelType.id;
  }

  compareChannelType(o1: Pick<IChannelType, 'id'> | null, o2: Pick<IChannelType, 'id'> | null): boolean {
    return o1 && o2 ? this.getChannelTypeIdentifier(o1) === this.getChannelTypeIdentifier(o2) : o1 === o2;
  }

  addChannelTypeToCollectionIfMissing<Type extends Pick<IChannelType, 'id'>>(
    channelTypeCollection: Type[],
    ...channelTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const channelTypes: Type[] = channelTypesToCheck.filter(isPresent);
    if (channelTypes.length > 0) {
      const channelTypeCollectionIdentifiers = channelTypeCollection.map(
        channelTypeItem => this.getChannelTypeIdentifier(channelTypeItem)!
      );
      const channelTypesToAdd = channelTypes.filter(channelTypeItem => {
        const channelTypeIdentifier = this.getChannelTypeIdentifier(channelTypeItem);
        if (channelTypeCollectionIdentifiers.includes(channelTypeIdentifier)) {
          return false;
        }
        channelTypeCollectionIdentifiers.push(channelTypeIdentifier);
        return true;
      });
      return [...channelTypesToAdd, ...channelTypeCollection];
    }
    return channelTypeCollection;
  }
}
