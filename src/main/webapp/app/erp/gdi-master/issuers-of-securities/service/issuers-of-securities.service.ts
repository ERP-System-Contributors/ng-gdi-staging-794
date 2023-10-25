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
import { IIssuersOfSecurities, NewIssuersOfSecurities } from '../issuers-of-securities.model';

export type PartialUpdateIssuersOfSecurities = Partial<IIssuersOfSecurities> & Pick<IIssuersOfSecurities, 'id'>;

export type EntityResponseType = HttpResponse<IIssuersOfSecurities>;
export type EntityArrayResponseType = HttpResponse<IIssuersOfSecurities[]>;

@Injectable({ providedIn: 'root' })
export class IssuersOfSecuritiesService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/issuers-of-securities');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/issuers-of-securities');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(issuersOfSecurities: NewIssuersOfSecurities): Observable<EntityResponseType> {
    return this.http.post<IIssuersOfSecurities>(this.resourceUrl, issuersOfSecurities, { observe: 'response' });
  }

  update(issuersOfSecurities: IIssuersOfSecurities): Observable<EntityResponseType> {
    return this.http.put<IIssuersOfSecurities>(
      `${this.resourceUrl}/${this.getIssuersOfSecuritiesIdentifier(issuersOfSecurities)}`,
      issuersOfSecurities,
      { observe: 'response' }
    );
  }

  partialUpdate(issuersOfSecurities: PartialUpdateIssuersOfSecurities): Observable<EntityResponseType> {
    return this.http.patch<IIssuersOfSecurities>(
      `${this.resourceUrl}/${this.getIssuersOfSecuritiesIdentifier(issuersOfSecurities)}`,
      issuersOfSecurities,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IIssuersOfSecurities>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IIssuersOfSecurities[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IIssuersOfSecurities[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getIssuersOfSecuritiesIdentifier(issuersOfSecurities: Pick<IIssuersOfSecurities, 'id'>): number {
    return issuersOfSecurities.id;
  }

  compareIssuersOfSecurities(o1: Pick<IIssuersOfSecurities, 'id'> | null, o2: Pick<IIssuersOfSecurities, 'id'> | null): boolean {
    return o1 && o2 ? this.getIssuersOfSecuritiesIdentifier(o1) === this.getIssuersOfSecuritiesIdentifier(o2) : o1 === o2;
  }

  addIssuersOfSecuritiesToCollectionIfMissing<Type extends Pick<IIssuersOfSecurities, 'id'>>(
    issuersOfSecuritiesCollection: Type[],
    ...issuersOfSecuritiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const issuersOfSecurities: Type[] = issuersOfSecuritiesToCheck.filter(isPresent);
    if (issuersOfSecurities.length > 0) {
      const issuersOfSecuritiesCollectionIdentifiers = issuersOfSecuritiesCollection.map(
        issuersOfSecuritiesItem => this.getIssuersOfSecuritiesIdentifier(issuersOfSecuritiesItem)!
      );
      const issuersOfSecuritiesToAdd = issuersOfSecurities.filter(issuersOfSecuritiesItem => {
        const issuersOfSecuritiesIdentifier = this.getIssuersOfSecuritiesIdentifier(issuersOfSecuritiesItem);
        if (issuersOfSecuritiesCollectionIdentifiers.includes(issuersOfSecuritiesIdentifier)) {
          return false;
        }
        issuersOfSecuritiesCollectionIdentifiers.push(issuersOfSecuritiesIdentifier);
        return true;
      });
      return [...issuersOfSecuritiesToAdd, ...issuersOfSecuritiesCollection];
    }
    return issuersOfSecuritiesCollection;
  }
}
