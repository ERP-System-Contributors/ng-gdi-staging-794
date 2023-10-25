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
import { ILoanApplicationStatus, NewLoanApplicationStatus } from '../loan-application-status.model';

export type PartialUpdateLoanApplicationStatus = Partial<ILoanApplicationStatus> & Pick<ILoanApplicationStatus, 'id'>;

export type EntityResponseType = HttpResponse<ILoanApplicationStatus>;
export type EntityArrayResponseType = HttpResponse<ILoanApplicationStatus[]>;

@Injectable({ providedIn: 'root' })
export class LoanApplicationStatusService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/loan-application-statuses');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/loan-application-statuses');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(loanApplicationStatus: NewLoanApplicationStatus): Observable<EntityResponseType> {
    return this.http.post<ILoanApplicationStatus>(this.resourceUrl, loanApplicationStatus, { observe: 'response' });
  }

  update(loanApplicationStatus: ILoanApplicationStatus): Observable<EntityResponseType> {
    return this.http.put<ILoanApplicationStatus>(
      `${this.resourceUrl}/${this.getLoanApplicationStatusIdentifier(loanApplicationStatus)}`,
      loanApplicationStatus,
      { observe: 'response' }
    );
  }

  partialUpdate(loanApplicationStatus: PartialUpdateLoanApplicationStatus): Observable<EntityResponseType> {
    return this.http.patch<ILoanApplicationStatus>(
      `${this.resourceUrl}/${this.getLoanApplicationStatusIdentifier(loanApplicationStatus)}`,
      loanApplicationStatus,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILoanApplicationStatus>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILoanApplicationStatus[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILoanApplicationStatus[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getLoanApplicationStatusIdentifier(loanApplicationStatus: Pick<ILoanApplicationStatus, 'id'>): number {
    return loanApplicationStatus.id;
  }

  compareLoanApplicationStatus(o1: Pick<ILoanApplicationStatus, 'id'> | null, o2: Pick<ILoanApplicationStatus, 'id'> | null): boolean {
    return o1 && o2 ? this.getLoanApplicationStatusIdentifier(o1) === this.getLoanApplicationStatusIdentifier(o2) : o1 === o2;
  }

  addLoanApplicationStatusToCollectionIfMissing<Type extends Pick<ILoanApplicationStatus, 'id'>>(
    loanApplicationStatusCollection: Type[],
    ...loanApplicationStatusesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const loanApplicationStatuses: Type[] = loanApplicationStatusesToCheck.filter(isPresent);
    if (loanApplicationStatuses.length > 0) {
      const loanApplicationStatusCollectionIdentifiers = loanApplicationStatusCollection.map(
        loanApplicationStatusItem => this.getLoanApplicationStatusIdentifier(loanApplicationStatusItem)!
      );
      const loanApplicationStatusesToAdd = loanApplicationStatuses.filter(loanApplicationStatusItem => {
        const loanApplicationStatusIdentifier = this.getLoanApplicationStatusIdentifier(loanApplicationStatusItem);
        if (loanApplicationStatusCollectionIdentifiers.includes(loanApplicationStatusIdentifier)) {
          return false;
        }
        loanApplicationStatusCollectionIdentifiers.push(loanApplicationStatusIdentifier);
        return true;
      });
      return [...loanApplicationStatusesToAdd, ...loanApplicationStatusCollection];
    }
    return loanApplicationStatusCollection;
  }
}
