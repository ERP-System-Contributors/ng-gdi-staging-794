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
import { ILoanApplicationType, NewLoanApplicationType } from '../loan-application-type.model';

export type PartialUpdateLoanApplicationType = Partial<ILoanApplicationType> & Pick<ILoanApplicationType, 'id'>;

export type EntityResponseType = HttpResponse<ILoanApplicationType>;
export type EntityArrayResponseType = HttpResponse<ILoanApplicationType[]>;

@Injectable({ providedIn: 'root' })
export class LoanApplicationTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/loan-application-types');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/loan-application-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(loanApplicationType: NewLoanApplicationType): Observable<EntityResponseType> {
    return this.http.post<ILoanApplicationType>(this.resourceUrl, loanApplicationType, { observe: 'response' });
  }

  update(loanApplicationType: ILoanApplicationType): Observable<EntityResponseType> {
    return this.http.put<ILoanApplicationType>(
      `${this.resourceUrl}/${this.getLoanApplicationTypeIdentifier(loanApplicationType)}`,
      loanApplicationType,
      { observe: 'response' }
    );
  }

  partialUpdate(loanApplicationType: PartialUpdateLoanApplicationType): Observable<EntityResponseType> {
    return this.http.patch<ILoanApplicationType>(
      `${this.resourceUrl}/${this.getLoanApplicationTypeIdentifier(loanApplicationType)}`,
      loanApplicationType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILoanApplicationType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILoanApplicationType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILoanApplicationType[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getLoanApplicationTypeIdentifier(loanApplicationType: Pick<ILoanApplicationType, 'id'>): number {
    return loanApplicationType.id;
  }

  compareLoanApplicationType(o1: Pick<ILoanApplicationType, 'id'> | null, o2: Pick<ILoanApplicationType, 'id'> | null): boolean {
    return o1 && o2 ? this.getLoanApplicationTypeIdentifier(o1) === this.getLoanApplicationTypeIdentifier(o2) : o1 === o2;
  }

  addLoanApplicationTypeToCollectionIfMissing<Type extends Pick<ILoanApplicationType, 'id'>>(
    loanApplicationTypeCollection: Type[],
    ...loanApplicationTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const loanApplicationTypes: Type[] = loanApplicationTypesToCheck.filter(isPresent);
    if (loanApplicationTypes.length > 0) {
      const loanApplicationTypeCollectionIdentifiers = loanApplicationTypeCollection.map(
        loanApplicationTypeItem => this.getLoanApplicationTypeIdentifier(loanApplicationTypeItem)!
      );
      const loanApplicationTypesToAdd = loanApplicationTypes.filter(loanApplicationTypeItem => {
        const loanApplicationTypeIdentifier = this.getLoanApplicationTypeIdentifier(loanApplicationTypeItem);
        if (loanApplicationTypeCollectionIdentifiers.includes(loanApplicationTypeIdentifier)) {
          return false;
        }
        loanApplicationTypeCollectionIdentifiers.push(loanApplicationTypeIdentifier);
        return true;
      });
      return [...loanApplicationTypesToAdd, ...loanApplicationTypeCollection];
    }
    return loanApplicationTypeCollection;
  }
}
