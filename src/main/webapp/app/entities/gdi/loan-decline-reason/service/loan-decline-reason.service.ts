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
import { ILoanDeclineReason, NewLoanDeclineReason } from '../loan-decline-reason.model';

export type PartialUpdateLoanDeclineReason = Partial<ILoanDeclineReason> & Pick<ILoanDeclineReason, 'id'>;

export type EntityResponseType = HttpResponse<ILoanDeclineReason>;
export type EntityArrayResponseType = HttpResponse<ILoanDeclineReason[]>;

@Injectable({ providedIn: 'root' })
export class LoanDeclineReasonService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/loan-decline-reasons');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/loan-decline-reasons');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(loanDeclineReason: NewLoanDeclineReason): Observable<EntityResponseType> {
    return this.http.post<ILoanDeclineReason>(this.resourceUrl, loanDeclineReason, { observe: 'response' });
  }

  update(loanDeclineReason: ILoanDeclineReason): Observable<EntityResponseType> {
    return this.http.put<ILoanDeclineReason>(
      `${this.resourceUrl}/${this.getLoanDeclineReasonIdentifier(loanDeclineReason)}`,
      loanDeclineReason,
      { observe: 'response' }
    );
  }

  partialUpdate(loanDeclineReason: PartialUpdateLoanDeclineReason): Observable<EntityResponseType> {
    return this.http.patch<ILoanDeclineReason>(
      `${this.resourceUrl}/${this.getLoanDeclineReasonIdentifier(loanDeclineReason)}`,
      loanDeclineReason,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILoanDeclineReason>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILoanDeclineReason[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILoanDeclineReason[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getLoanDeclineReasonIdentifier(loanDeclineReason: Pick<ILoanDeclineReason, 'id'>): number {
    return loanDeclineReason.id;
  }

  compareLoanDeclineReason(o1: Pick<ILoanDeclineReason, 'id'> | null, o2: Pick<ILoanDeclineReason, 'id'> | null): boolean {
    return o1 && o2 ? this.getLoanDeclineReasonIdentifier(o1) === this.getLoanDeclineReasonIdentifier(o2) : o1 === o2;
  }

  addLoanDeclineReasonToCollectionIfMissing<Type extends Pick<ILoanDeclineReason, 'id'>>(
    loanDeclineReasonCollection: Type[],
    ...loanDeclineReasonsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const loanDeclineReasons: Type[] = loanDeclineReasonsToCheck.filter(isPresent);
    if (loanDeclineReasons.length > 0) {
      const loanDeclineReasonCollectionIdentifiers = loanDeclineReasonCollection.map(
        loanDeclineReasonItem => this.getLoanDeclineReasonIdentifier(loanDeclineReasonItem)!
      );
      const loanDeclineReasonsToAdd = loanDeclineReasons.filter(loanDeclineReasonItem => {
        const loanDeclineReasonIdentifier = this.getLoanDeclineReasonIdentifier(loanDeclineReasonItem);
        if (loanDeclineReasonCollectionIdentifiers.includes(loanDeclineReasonIdentifier)) {
          return false;
        }
        loanDeclineReasonCollectionIdentifiers.push(loanDeclineReasonIdentifier);
        return true;
      });
      return [...loanDeclineReasonsToAdd, ...loanDeclineReasonCollection];
    }
    return loanDeclineReasonCollection;
  }
}
