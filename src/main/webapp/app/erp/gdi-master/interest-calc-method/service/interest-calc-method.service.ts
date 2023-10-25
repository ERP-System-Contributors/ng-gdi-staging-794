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
import { IInterestCalcMethod, NewInterestCalcMethod } from '../interest-calc-method.model';

export type PartialUpdateInterestCalcMethod = Partial<IInterestCalcMethod> & Pick<IInterestCalcMethod, 'id'>;

export type EntityResponseType = HttpResponse<IInterestCalcMethod>;
export type EntityArrayResponseType = HttpResponse<IInterestCalcMethod[]>;

@Injectable({ providedIn: 'root' })
export class InterestCalcMethodService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/interest-calc-methods');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/interest-calc-methods');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(interestCalcMethod: NewInterestCalcMethod): Observable<EntityResponseType> {
    return this.http.post<IInterestCalcMethod>(this.resourceUrl, interestCalcMethod, { observe: 'response' });
  }

  update(interestCalcMethod: IInterestCalcMethod): Observable<EntityResponseType> {
    return this.http.put<IInterestCalcMethod>(
      `${this.resourceUrl}/${this.getInterestCalcMethodIdentifier(interestCalcMethod)}`,
      interestCalcMethod,
      { observe: 'response' }
    );
  }

  partialUpdate(interestCalcMethod: PartialUpdateInterestCalcMethod): Observable<EntityResponseType> {
    return this.http.patch<IInterestCalcMethod>(
      `${this.resourceUrl}/${this.getInterestCalcMethodIdentifier(interestCalcMethod)}`,
      interestCalcMethod,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInterestCalcMethod>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInterestCalcMethod[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInterestCalcMethod[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getInterestCalcMethodIdentifier(interestCalcMethod: Pick<IInterestCalcMethod, 'id'>): number {
    return interestCalcMethod.id;
  }

  compareInterestCalcMethod(o1: Pick<IInterestCalcMethod, 'id'> | null, o2: Pick<IInterestCalcMethod, 'id'> | null): boolean {
    return o1 && o2 ? this.getInterestCalcMethodIdentifier(o1) === this.getInterestCalcMethodIdentifier(o2) : o1 === o2;
  }

  addInterestCalcMethodToCollectionIfMissing<Type extends Pick<IInterestCalcMethod, 'id'>>(
    interestCalcMethodCollection: Type[],
    ...interestCalcMethodsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const interestCalcMethods: Type[] = interestCalcMethodsToCheck.filter(isPresent);
    if (interestCalcMethods.length > 0) {
      const interestCalcMethodCollectionIdentifiers = interestCalcMethodCollection.map(
        interestCalcMethodItem => this.getInterestCalcMethodIdentifier(interestCalcMethodItem)!
      );
      const interestCalcMethodsToAdd = interestCalcMethods.filter(interestCalcMethodItem => {
        const interestCalcMethodIdentifier = this.getInterestCalcMethodIdentifier(interestCalcMethodItem);
        if (interestCalcMethodCollectionIdentifiers.includes(interestCalcMethodIdentifier)) {
          return false;
        }
        interestCalcMethodCollectionIdentifiers.push(interestCalcMethodIdentifier);
        return true;
      });
      return [...interestCalcMethodsToAdd, ...interestCalcMethodCollection];
    }
    return interestCalcMethodCollection;
  }
}
