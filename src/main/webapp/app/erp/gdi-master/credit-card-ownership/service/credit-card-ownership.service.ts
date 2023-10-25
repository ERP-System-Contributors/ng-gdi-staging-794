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
import { ICreditCardOwnership, NewCreditCardOwnership } from '../credit-card-ownership.model';

export type PartialUpdateCreditCardOwnership = Partial<ICreditCardOwnership> & Pick<ICreditCardOwnership, 'id'>;

export type EntityResponseType = HttpResponse<ICreditCardOwnership>;
export type EntityArrayResponseType = HttpResponse<ICreditCardOwnership[]>;

@Injectable({ providedIn: 'root' })
export class CreditCardOwnershipService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/credit-card-ownerships');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/credit-card-ownerships');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(creditCardOwnership: NewCreditCardOwnership): Observable<EntityResponseType> {
    return this.http.post<ICreditCardOwnership>(this.resourceUrl, creditCardOwnership, { observe: 'response' });
  }

  update(creditCardOwnership: ICreditCardOwnership): Observable<EntityResponseType> {
    return this.http.put<ICreditCardOwnership>(
      `${this.resourceUrl}/${this.getCreditCardOwnershipIdentifier(creditCardOwnership)}`,
      creditCardOwnership,
      { observe: 'response' }
    );
  }

  partialUpdate(creditCardOwnership: PartialUpdateCreditCardOwnership): Observable<EntityResponseType> {
    return this.http.patch<ICreditCardOwnership>(
      `${this.resourceUrl}/${this.getCreditCardOwnershipIdentifier(creditCardOwnership)}`,
      creditCardOwnership,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICreditCardOwnership>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICreditCardOwnership[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICreditCardOwnership[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getCreditCardOwnershipIdentifier(creditCardOwnership: Pick<ICreditCardOwnership, 'id'>): number {
    return creditCardOwnership.id;
  }

  compareCreditCardOwnership(o1: Pick<ICreditCardOwnership, 'id'> | null, o2: Pick<ICreditCardOwnership, 'id'> | null): boolean {
    return o1 && o2 ? this.getCreditCardOwnershipIdentifier(o1) === this.getCreditCardOwnershipIdentifier(o2) : o1 === o2;
  }

  addCreditCardOwnershipToCollectionIfMissing<Type extends Pick<ICreditCardOwnership, 'id'>>(
    creditCardOwnershipCollection: Type[],
    ...creditCardOwnershipsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const creditCardOwnerships: Type[] = creditCardOwnershipsToCheck.filter(isPresent);
    if (creditCardOwnerships.length > 0) {
      const creditCardOwnershipCollectionIdentifiers = creditCardOwnershipCollection.map(
        creditCardOwnershipItem => this.getCreditCardOwnershipIdentifier(creditCardOwnershipItem)!
      );
      const creditCardOwnershipsToAdd = creditCardOwnerships.filter(creditCardOwnershipItem => {
        const creditCardOwnershipIdentifier = this.getCreditCardOwnershipIdentifier(creditCardOwnershipItem);
        if (creditCardOwnershipCollectionIdentifiers.includes(creditCardOwnershipIdentifier)) {
          return false;
        }
        creditCardOwnershipCollectionIdentifiers.push(creditCardOwnershipIdentifier);
        return true;
      });
      return [...creditCardOwnershipsToAdd, ...creditCardOwnershipCollection];
    }
    return creditCardOwnershipCollection;
  }
}
