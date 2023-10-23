import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ILoanRepaymentFrequency, NewLoanRepaymentFrequency } from '../loan-repayment-frequency.model';

export type PartialUpdateLoanRepaymentFrequency = Partial<ILoanRepaymentFrequency> & Pick<ILoanRepaymentFrequency, 'id'>;

export type EntityResponseType = HttpResponse<ILoanRepaymentFrequency>;
export type EntityArrayResponseType = HttpResponse<ILoanRepaymentFrequency[]>;

@Injectable({ providedIn: 'root' })
export class LoanRepaymentFrequencyService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/loan-repayment-frequencies');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/loan-repayment-frequencies');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(loanRepaymentFrequency: NewLoanRepaymentFrequency): Observable<EntityResponseType> {
    return this.http.post<ILoanRepaymentFrequency>(this.resourceUrl, loanRepaymentFrequency, { observe: 'response' });
  }

  update(loanRepaymentFrequency: ILoanRepaymentFrequency): Observable<EntityResponseType> {
    return this.http.put<ILoanRepaymentFrequency>(
      `${this.resourceUrl}/${this.getLoanRepaymentFrequencyIdentifier(loanRepaymentFrequency)}`,
      loanRepaymentFrequency,
      { observe: 'response' }
    );
  }

  partialUpdate(loanRepaymentFrequency: PartialUpdateLoanRepaymentFrequency): Observable<EntityResponseType> {
    return this.http.patch<ILoanRepaymentFrequency>(
      `${this.resourceUrl}/${this.getLoanRepaymentFrequencyIdentifier(loanRepaymentFrequency)}`,
      loanRepaymentFrequency,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILoanRepaymentFrequency>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILoanRepaymentFrequency[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILoanRepaymentFrequency[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getLoanRepaymentFrequencyIdentifier(loanRepaymentFrequency: Pick<ILoanRepaymentFrequency, 'id'>): number {
    return loanRepaymentFrequency.id;
  }

  compareLoanRepaymentFrequency(o1: Pick<ILoanRepaymentFrequency, 'id'> | null, o2: Pick<ILoanRepaymentFrequency, 'id'> | null): boolean {
    return o1 && o2 ? this.getLoanRepaymentFrequencyIdentifier(o1) === this.getLoanRepaymentFrequencyIdentifier(o2) : o1 === o2;
  }

  addLoanRepaymentFrequencyToCollectionIfMissing<Type extends Pick<ILoanRepaymentFrequency, 'id'>>(
    loanRepaymentFrequencyCollection: Type[],
    ...loanRepaymentFrequenciesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const loanRepaymentFrequencies: Type[] = loanRepaymentFrequenciesToCheck.filter(isPresent);
    if (loanRepaymentFrequencies.length > 0) {
      const loanRepaymentFrequencyCollectionIdentifiers = loanRepaymentFrequencyCollection.map(
        loanRepaymentFrequencyItem => this.getLoanRepaymentFrequencyIdentifier(loanRepaymentFrequencyItem)!
      );
      const loanRepaymentFrequenciesToAdd = loanRepaymentFrequencies.filter(loanRepaymentFrequencyItem => {
        const loanRepaymentFrequencyIdentifier = this.getLoanRepaymentFrequencyIdentifier(loanRepaymentFrequencyItem);
        if (loanRepaymentFrequencyCollectionIdentifiers.includes(loanRepaymentFrequencyIdentifier)) {
          return false;
        }
        loanRepaymentFrequencyCollectionIdentifiers.push(loanRepaymentFrequencyIdentifier);
        return true;
      });
      return [...loanRepaymentFrequenciesToAdd, ...loanRepaymentFrequencyCollection];
    }
    return loanRepaymentFrequencyCollection;
  }
}
