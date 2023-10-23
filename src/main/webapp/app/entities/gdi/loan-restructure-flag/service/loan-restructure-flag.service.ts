import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { SearchWithPagination } from 'app/core/request/request.model';
import { ILoanRestructureFlag, NewLoanRestructureFlag } from '../loan-restructure-flag.model';

export type PartialUpdateLoanRestructureFlag = Partial<ILoanRestructureFlag> & Pick<ILoanRestructureFlag, 'id'>;

export type EntityResponseType = HttpResponse<ILoanRestructureFlag>;
export type EntityArrayResponseType = HttpResponse<ILoanRestructureFlag[]>;

@Injectable({ providedIn: 'root' })
export class LoanRestructureFlagService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/loan-restructure-flags');
  protected resourceSearchUrl = this.applicationConfigService.getEndpointFor('api/_search/loan-restructure-flags');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(loanRestructureFlag: NewLoanRestructureFlag): Observable<EntityResponseType> {
    return this.http.post<ILoanRestructureFlag>(this.resourceUrl, loanRestructureFlag, { observe: 'response' });
  }

  update(loanRestructureFlag: ILoanRestructureFlag): Observable<EntityResponseType> {
    return this.http.put<ILoanRestructureFlag>(
      `${this.resourceUrl}/${this.getLoanRestructureFlagIdentifier(loanRestructureFlag)}`,
      loanRestructureFlag,
      { observe: 'response' }
    );
  }

  partialUpdate(loanRestructureFlag: PartialUpdateLoanRestructureFlag): Observable<EntityResponseType> {
    return this.http.patch<ILoanRestructureFlag>(
      `${this.resourceUrl}/${this.getLoanRestructureFlagIdentifier(loanRestructureFlag)}`,
      loanRestructureFlag,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILoanRestructureFlag>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILoanRestructureFlag[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: SearchWithPagination): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILoanRestructureFlag[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }

  getLoanRestructureFlagIdentifier(loanRestructureFlag: Pick<ILoanRestructureFlag, 'id'>): number {
    return loanRestructureFlag.id;
  }

  compareLoanRestructureFlag(o1: Pick<ILoanRestructureFlag, 'id'> | null, o2: Pick<ILoanRestructureFlag, 'id'> | null): boolean {
    return o1 && o2 ? this.getLoanRestructureFlagIdentifier(o1) === this.getLoanRestructureFlagIdentifier(o2) : o1 === o2;
  }

  addLoanRestructureFlagToCollectionIfMissing<Type extends Pick<ILoanRestructureFlag, 'id'>>(
    loanRestructureFlagCollection: Type[],
    ...loanRestructureFlagsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const loanRestructureFlags: Type[] = loanRestructureFlagsToCheck.filter(isPresent);
    if (loanRestructureFlags.length > 0) {
      const loanRestructureFlagCollectionIdentifiers = loanRestructureFlagCollection.map(
        loanRestructureFlagItem => this.getLoanRestructureFlagIdentifier(loanRestructureFlagItem)!
      );
      const loanRestructureFlagsToAdd = loanRestructureFlags.filter(loanRestructureFlagItem => {
        const loanRestructureFlagIdentifier = this.getLoanRestructureFlagIdentifier(loanRestructureFlagItem);
        if (loanRestructureFlagCollectionIdentifiers.includes(loanRestructureFlagIdentifier)) {
          return false;
        }
        loanRestructureFlagCollectionIdentifiers.push(loanRestructureFlagIdentifier);
        return true;
      });
      return [...loanRestructureFlagsToAdd, ...loanRestructureFlagCollection];
    }
    return loanRestructureFlagCollection;
  }
}
