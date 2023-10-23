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
import { IPartyRelationType, NewPartyRelationType } from '../party-relation-type.model';

export type PartialUpdatePartyRelationType = Partial<IPartyRelationType> & Pick<IPartyRelationType, 'id'>;

export type EntityResponseType = HttpResponse<IPartyRelationType>;
export type EntityArrayResponseType = HttpResponse<IPartyRelationType[]>;

@Injectable({ providedIn: 'root' })
export class PartyRelationTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/party-relation-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/party-relation-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(partyRelationType: NewPartyRelationType): Observable<EntityResponseType> {
    return this.http.post<IPartyRelationType>(this.resourceUrl, partyRelationType, { observe: 'response' });
  }

  update(partyRelationType: IPartyRelationType): Observable<EntityResponseType> {
    return this.http.put<IPartyRelationType>(
      `${this.resourceUrl}/${this.getPartyRelationTypeIdentifier(partyRelationType)}`,
      partyRelationType,
      { observe: 'response' }
    );
  }

  partialUpdate(partyRelationType: PartialUpdatePartyRelationType): Observable<EntityResponseType> {
    return this.http.patch<IPartyRelationType>(
      `${this.resourceUrl}/${this.getPartyRelationTypeIdentifier(partyRelationType)}`,
      partyRelationType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPartyRelationType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPartyRelationType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPartyRelationType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getPartyRelationTypeIdentifier(partyRelationType: Pick<IPartyRelationType, 'id'>): number {
    return partyRelationType.id;
  }

  comparePartyRelationType(o1: Pick<IPartyRelationType, 'id'> | null, o2: Pick<IPartyRelationType, 'id'> | null): boolean {
    return o1 && o2 ? this.getPartyRelationTypeIdentifier(o1) === this.getPartyRelationTypeIdentifier(o2) : o1 === o2;
  }

  addPartyRelationTypeToCollectionIfMissing<Type extends Pick<IPartyRelationType, 'id'>>(
    partyRelationTypeCollection: Type[],
    ...partyRelationTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const partyRelationTypes: Type[] = partyRelationTypesToCheck.filter(isPresent);
    if (partyRelationTypes.length > 0) {
      const partyRelationTypeCollectionIdentifiers = partyRelationTypeCollection.map(
        partyRelationTypeItem => this.getPartyRelationTypeIdentifier(partyRelationTypeItem)!
      );
      const partyRelationTypesToAdd = partyRelationTypes.filter(partyRelationTypeItem => {
        const partyRelationTypeIdentifier = this.getPartyRelationTypeIdentifier(partyRelationTypeItem);
        if (partyRelationTypeCollectionIdentifiers.includes(partyRelationTypeIdentifier)) {
          return false;
        }
        partyRelationTypeCollectionIdentifiers.push(partyRelationTypeIdentifier);
        return true;
      });
      return [...partyRelationTypesToAdd, ...partyRelationTypeCollection];
    }
    return partyRelationTypeCollection;
  }
}
